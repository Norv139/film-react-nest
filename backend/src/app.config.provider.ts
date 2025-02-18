import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      url: process.env.DATABASE_URL,
      driver: process.env.DATABASE_DRIVER,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      dbName: process.env.DATABASE_DATABASE,
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export enum EDriver {
  postgres = 'postgres',
  mongodb = 'mongodb',
}

export interface AppConfigDatabase {
  driver: EDriver;
  host?: string;
  url?: string;
  port?: string;
  username?: string;
  password?: string;
  dbName?: string;
}
