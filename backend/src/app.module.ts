import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsRepositoryMongo } from './repository/films-mongodb.repository';
import { FilmsRepositoryPostgres } from './repository/films-postgres.repository';
import { DBModule } from './db/db.module';
import { filmsProvider } from './films/films.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsService } from './films/films.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      renderPath: '*',
      serveRoot: '/',
    }),
    DBModule,
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    OrderService,
    FilmsService,
    FilmsRepositoryMongo,
    FilmsRepositoryPostgres,
    filmsProvider,
  ],
})
export class AppModule {}
