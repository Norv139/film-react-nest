import * as mongoose from 'mongoose';
import { AppConfig } from '../app.config.provider';

export const databaseProvider = {
  provide: 'DB_CONNECT',
  useFactory: (config: AppConfig) => {
    return mongoose.connect(config.database.url);
  },
  inject: ['CONFIG'],
};
