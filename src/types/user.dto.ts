import { Expose, Transform, Type } from 'class-transformer';
export const toDate = ({ value }: { value: string }) => new Date(value);

export class UserDto {
  @Expose()
  blocked!: boolean;

  @Expose()
  confirmed!: boolean;

  @Expose()
  @Transform(toDate)
  created_at!: Date;

  @Expose()
  email!: string;

  @Expose()
  id!: number;

  @Expose()
  @Type(() => Role)
  role!: Role;

  @Expose()
  @Transform(toDate)
  updated_at!: Date;

  @Expose()
  username!: string;
}

class Role {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  description!: string;
}
