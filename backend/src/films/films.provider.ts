import { AppConfig } from 'src/app.config.provider';
import { FilmEntity } from './entities';
import { FilmSchema } from './schemas';

export const filmsProvider = {
  provide: 'FILM_REPOSITORY',
  inject: ['DATA_SOURCE', 'CONFIG'],
  useFactory: (dataSource, config: AppConfig) => {
    if (config.database.driver === 'postgres') {
      return dataSource.getRepository(FilmEntity);
    } else if (config.database.driver === 'mongodb') {
      return dataSource.model('Film', FilmSchema);
    }
  },
};
