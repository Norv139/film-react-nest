import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { FilmEntity } from './film.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  daytime: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  hall: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  rows: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  seats: number;

  @Column({
    type: 'double precision',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  taken: string;

  @ManyToOne(() => FilmEntity, (film) => film.schedule)
  @JoinColumn({ name: 'filmId' })
  film: FilmEntity;
}
