import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OrderDto, SessionDto } from './dto';
import { FilmsRepositoryMongo } from 'src/repository/films-mongodb.repository';
import { FilmsRepositoryPostgres } from 'src/repository/films-postgres.repository';
import { AppConfig, EDriver } from 'src/app.config.provider';
import { TResponse } from '../types';

@Injectable()
export class OrderService {
  driver: EDriver;
  constructor(
    @Inject('CONFIG')
    private readonly config: AppConfig,
    private readonly filmsRepositoryMongo: FilmsRepositoryMongo,
    private readonly filmsRepositoryPostgres: FilmsRepositoryPostgres,
  ) {
    this.driver = this.config.database.driver;
  }

  async makeOrder(order: OrderDto): Promise<TResponse<SessionDto[]>> {
    const { tickets } = order;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;
      let document;
      const place = `${row}:${seat}`;

      switch (this.driver) {
        case EDriver.mongodb:
          document = await this.filmsRepositoryMongo.findFilmById(film);
          break;
        case EDriver.postgres:
          document = await this.filmsRepositoryPostgres.findFilmById(film);
          break;
      }

      const schedule = document.schedule.find((s) => s.id === session);
      if (!schedule) throw new BadRequestException('Сеанс не найден');

      const isTaken = Array.isArray(schedule.taken)
        ? schedule.taken.includes(place)
        : schedule.taken?.split(',').includes(place);

      if (isTaken) throw new BadRequestException('Это место уже занято');

      if (Array.isArray(schedule.taken)) {
        schedule.taken.push(place);
      } else {
        schedule.taken = schedule.taken ? `${schedule.taken},${place}` : place;
      }

      switch (this.driver) {
        case EDriver.postgres:
          await this.filmsRepositoryPostgres.save(document);
          break;
        case EDriver.mongodb:
          await document.save();
          break;
      }
    }

    return {
      total: tickets.length,
      items: order.tickets.map((ticket) => ({ ...ticket })),
    };
  }
}
