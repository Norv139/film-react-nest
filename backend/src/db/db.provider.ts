import * as mongoose from 'mongoose';
import { AppConfig, EDriver } from '../app.config.provider';
import { DataSource } from 'typeorm';
import { FilmEntity, ScheduleEntity } from 'src/films/entities';

export const databaseProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async (
    config: AppConfig,
  ): Promise<typeof mongoose | DataSource> => {
    let dataSource: typeof mongoose | DataSource;

    switch (config.database.driver) {
      case EDriver.mongodb:
        dataSource = await mongoose.connect(config.database.url);
        return dataSource;

      case EDriver.postgres:
        dataSource = new DataSource({
          type: config.database.driver,
          host: config.database.host,
          port: Number(config.database.port),
          username: config.database.username,
          password: config.database.password,
          database: config.database.dbName,
          entities: [FilmEntity, ScheduleEntity],
          synchronize: false,
        });
        await dataSource.initialize();
        return dataSource;

      default:
        throw new Error('Database not initialized');
    }
  },
  inject: ['CONFIG'],
};
