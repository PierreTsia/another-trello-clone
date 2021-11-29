import { Expose, Transform, Type } from 'class-transformer';
import { stringToDate, stringToNum } from '../helpers/index.helpers';
import { ListDto } from '/@/dtos/list.dto';

export class CardDto {
  @Expose()
  id!: number;

  @Expose()
  archived!: boolean;

  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  @Type(() => ListDto)
  list?: ListDto;

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
  @Transform(({ value }) => value?.id)
  boardId?: number;
}

export class CreateCardDto {
  @Expose()
  name!: string;

  @Expose()
  list!: number;

  @Expose()
  description?: string;

  @Expose()
  @Transform(stringToNum)
  index!: number;
}

export class EditCardDto {

  @Expose()
  name?: string;

  @Expose()
  list?: number;

  @Expose()
  description?: string;

  @Expose()
  index?: number;
}
