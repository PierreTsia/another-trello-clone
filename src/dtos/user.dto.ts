import { Expose, Transform, Type } from 'class-transformer';
import { stringToDate } from '../helpers/index.helpers';

export class UserDto {
  @Expose()
  blocked!: boolean;

  @Expose()
  confirmed!: boolean;

  @Expose()
  @Transform(stringToDate)
  created_at!: Date;

  @Expose()
  email!: string;

  @Expose()
  id!: number;

  @Expose()
  @Type(() => Role)
  role!: Role;

  @Expose()
  @Transform(stringToDate)
  updated_at!: Date;

  @Expose()
  username!: string;

  @Expose()
  @Type(() => AvatarDto)
  avatar!: AvatarDto;
}

export class AvatarDto {
  @Expose()
  id!: number;

  @Expose()
  url!: string;

  @Expose({ name: 'formats' })
  @Transform(({ value }) => value.thumbnail.url)
  thumbnail!: string;
}

class Role {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  description!: string;
}
