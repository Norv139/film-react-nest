import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FilmEntity, ScheduleEntity } from 'src/films/entities';
import { Repository } from 'typeorm';
import { TResponse } from '../types';

@Injectable()
export class FilmsRepositoryPostgres {
  constructor(
    @Inject('FILM_REPOSITORY')
    private filmsRepository: Repository<FilmEntity>,
  ) {}

  async findAll(): Promise<TResponse<FilmEntity[]>> {
    try {
      const [total, items] = await Promise.all([
        this.filmsRepository.count(),
        this.filmsRepository.find({ relations: { schedule: true } }),
      ]);

      return { total, items };
    } catch (error) {
      throw new NotFoundException('Нет доступных фильмов для показа!');
    }
  }

  async findFilmById(id: string): Promise<FilmEntity> {
    try {
      return await this.filmsRepository.findOne({
        where: { id },
        relations: { schedule: true },
      });
    } catch (error) {
      throw new NotFoundException('Фильм не найден!');
    }
  }

  async findSchedule(id: string): Promise<TResponse<ScheduleEntity[]>> {
    const filmSchedule = await this.findFilmById(id);
    return {
      total: filmSchedule.schedule.length,
      items: filmSchedule.schedule,
    };
  }

  async save(film: FilmEntity) {
    await this.filmsRepository.save(film);
  }
}
