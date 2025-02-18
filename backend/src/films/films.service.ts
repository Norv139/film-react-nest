import { Inject, Injectable } from '@nestjs/common';
import { AppConfig, EDriver } from 'src/app.config.provider';
import { FilmsRepositoryMongo } from 'src/repository/films-mongodb.repository';
import { FilmsRepositoryPostgres } from 'src/repository/films-postgres.repository';
import { TResponseList } from '../types';
import { FilmEntity, ScheduleEntity } from './entities';
import { GetFilmDto, GetScheduleDto } from './dto';

@Injectable()
export class FilmsService {
  driver: EDriver;
  constructor(
    @Inject('CONFIG') private readonly config: AppConfig,
    private readonly filmsRepositoryMongo: FilmsRepositoryMongo,
    private readonly filmsRepositoryPostgres: FilmsRepositoryPostgres,
  ) {
    this.driver = this.config.database.driver;
  }

  async findAll(): Promise<TResponseList<FilmEntity | GetFilmDto>> {
    switch (this.driver) {
      case EDriver.mongodb:
        return await this.filmsRepositoryMongo.findAll();
      case EDriver.postgres:
        return await this.filmsRepositoryPostgres.findAll();
      default:
        return null;
    }
  }

  async findSchedule(
    id: string,
  ): Promise<TResponseList<ScheduleEntity | GetScheduleDto>> {
    switch (this.driver) {
      case EDriver.mongodb:
        return await this.filmsRepositoryMongo.findSchedule(id);
      case EDriver.postgres:
        return await this.filmsRepositoryPostgres.findSchedule(id);
      default:
        return null;
    }
  }
}
