import { Expose, Transform } from 'class-transformer';
import { stringToDate, stringToNum } from '../helpers/index.helpers';

export class Card {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  @Transform(stringToNum)
  index!: number;

  @Expose()
  @Transform(stringToDate)
  created_at!: Date;

  @Expose()
  @Transform(stringToDate)
  published_at!: Date;

  @Expose()
  @Transform(stringToDate)
  updated_at!: Date;

  @Expose({ name: 'board' })
  @Transform(({ value }) => value.id)
  boardId!: number;

  @Expose()
  cards!: any[];
}
