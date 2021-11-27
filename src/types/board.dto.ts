import { Expose, Transform, Type } from 'class-transformer';
import { UserDto } from '/@/types/index.dto';

export const toDate = ({ value }: { value: string }) => new Date(value);

export class BoardDto {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose({ name: 'Slug' })
  slug!: string;

  @Expose()
  @Transform(toDate)
  created_at!: Date;

  @Expose()
  @Transform(toDate)
  published_at!: Date;

  @Expose()
  @Transform(toDate)
  updated_at!: Date;

  @Expose({ name: 'users_permissions_user' })
  @Type(() => UserDto)
  owner!: UserDto;
}
