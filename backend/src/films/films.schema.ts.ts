import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FilmDocument = Film & Document;

@Schema()
export class Schedule {
  @Prop({ require: true })
  id: string;

  @Prop()
  daytime: string;

  @Prop()
  hall: number;

  @Prop()
  rows: number;

  @Prop()
  seats: number;

  @Prop()
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}

const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema()
export class Film {
  @Prop({ require: true })
  id: string;

  @Prop()
  title: string;

  @Prop()
  director: string;

  @Prop()
  rating: number;

  @Prop([String])
  tags: string[];

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop()
  about: string;

  @Prop()
  description: string;

  @Prop({ type: [ScheduleSchema] })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
