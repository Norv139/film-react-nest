import { BadRequestException, Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async makeOrder(order: OrderDto) {
    const { tickets } = order;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;

      const seatIdentifier = `${row}:${seat}`;
      const document = await this.filmsRepository.findFilm(film);
      if (!document) {
        throw new BadRequestException('Фильм не найден!');
      }

      const currentSession = document?.schedule.find(
        (item) => item.id === session,
      );
      if (!currentSession) {
        throw new BadRequestException('Сеанс не найден!');
      }
      if (currentSession.taken.includes(seatIdentifier)) {
        throw new BadRequestException('Выбранное место занято!');
      }

      currentSession.taken.push(seatIdentifier);
      try {
        document.markModified('schedule');
        await document.save();
      } catch (error) {
        throw new BadRequestException(
          `Ошибка обновления расписания: ${error.message}`,
        );
      }
    }

    return {
      total: tickets.length,
      items: order.tickets,
    };
  }
}
