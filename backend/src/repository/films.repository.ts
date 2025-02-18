import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { pick } from 'lodash';
import { GetFilmDto, GetScheduleDto } from 'src/films/dto/films.dto';
import { Film, FilmDocument } from 'src/films/films.schema.ts';

const reqFields = [
  'id',
  'about',
  'cover',
  'description',
  'director',
  'image',
  'rating',
  'schedule',
  'tags',
  'title',
];

@Injectable()
export class FilmsRepository {
  constructor(
    @Inject('FILM_DB_CONNECT') private filmModel: Model<FilmDocument>,
  ) {}

  async findAll(): Promise<{ total: number; items: GetFilmDto[] }> {
    const [total, films] = await Promise.all([
      this.filmModel.countDocuments({}),
      this.filmModel.find({}),
    ]);

    if (!films) {
      throw new NotFoundException('Нет доступных фильмов для показа!');
    }

    const fnSeparator = (film: Film): GetFilmDto =>
      <GetFilmDto>pick(film, reqFields);

    return {
      total,
      items: films.map(fnSeparator),
    };
  }

  async findById(
    id: string,
  ): Promise<{ total: number; items: GetScheduleDto[] | null }> {
    const film = await this.filmModel.findOne({ id });

    if (!film) {
      throw new NotFoundException('Фильм не найден!');
    }

    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }

  async findFilm(id: string) {
    return this.filmModel.findOne({ id });
  }
}
