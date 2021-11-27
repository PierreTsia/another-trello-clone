import { Expose, Type } from 'class-transformer';
import { UserDto } from '/@/types/index.dto';

export class AuthPayloadDto {
  @Expose()
  jwt!: string;

  @Expose()
  @Type(() => UserDto)
  user!: UserDto;
}
