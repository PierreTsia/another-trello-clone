import { Expose, Type } from 'class-transformer';
import { UserDto } from '/@/dtos/index.dto';

export class AuthPayloadDto {
  @Expose()
  jwt!: string;

  @Expose()
  @Type(() => UserDto)
  user!: UserDto;
}
