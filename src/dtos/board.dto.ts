import { Expose, Transform, Type } from 'class-transformer';
import { UserDto } from '/@/dtos/index.dto';
import { stringToDate, slugify } from '../../helpers/index.helpers';
import { ListDto } from '/@/dtos/list.dto';

export class BoardDto {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose({ name: 'Slug' })
  slug!: string;

  @Expose()
  @Transform(stringToDate)
  created_at!: Date;

  @Expose()
  @Transform(stringToDate)
  published_at!: Date;

  @Expose()
  @Transform(stringToDate)
  updated_at!: Date;

  @Expose({ name: 'users_permissions_user' })
  @Type(() => UserDto)
  owner!: UserDto;

  @Expose()
  @Type(() => ListDto)
  lists!: ListDto[];
}

export class CreateBoardDto {
  @Expose()
  name!: string;

  @Expose()
  user!: number;

  @Expose()
  get Slug() {
    return slugify(this.name);
  }

  toObject() {
    return {
      name: this.name,
      Slug: this.Slug,
      user: this.user,
    };
  }
}
