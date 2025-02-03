import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsService } from './films/films.service';
import { FilmsRepository } from './repository/films.repository';
import { DBModule } from './db/db.module';
import { filmsProvider } from './films/films.provider';
import * as path from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
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
    FilmsRepository,
    filmsProvider,
  ],
})
export class AppModule {}
