import { Connection } from 'mongoose';
import { FilmSchema } from './films.schema.ts.js';

export const filmsProvider = {
  provide: 'FILM_DB_CONNECT',
  useFactory: (connection: Connection) => connection.model('Film', FilmSchema),
  inject: ['DB_CONNECT'],
};
