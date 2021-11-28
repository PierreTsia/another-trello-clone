import { HttpClient } from '/@/api/http.client';
import { UserDto } from '/@/dtos/user.dto';
import { plainToClass } from 'class-transformer';
import { AuthPayloadDto } from '/@/dtos/auth-payload.dto';
interface Credentials {
  email: string;
  password: string;
}

interface IAuthService {
  login: (payload: Credentials) => Promise<AuthPayloadDto>;
  me: () => Promise<UserDto>;
  findUserBydId: (id: number) => Promise<UserDto>;
}

const Not_Authenticated_Headers = { headers: { Authorization: '' } };

export class AuthService extends HttpClient implements IAuthService {
  private static classInstance?: AuthService;

  private constructor() {
    super(import.meta.env.VITE_API_URL as string);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AuthService();
    }

    return this.classInstance;
  }

  public login = async ({ email, password }: Credentials) => {
    const res = await this.instance.post<{ jwt: string; user: any }>(
      `/auth/local`,
      {
        identifier: email,
        password,
      },
      Not_Authenticated_Headers,
    );

    return plainToClass(AuthPayloadDto, res, { excludeExtraneousValues: true });
  };

  public me = async () => {
    const res = await this.instance.get<any>(`/users/me`);
    return plainToClass(UserDto, res, { excludeExtraneousValues: true });
  };

  public findUserBydId = async (id: number) => {
    const res = await this.instance.get<any>(`/users/${id}`);
    return plainToClass(UserDto, res, { excludeExtraneousValues: true });
  };
}
