import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'cookies-ts';

const NEXT_WEEK = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

export abstract class HttpClient {
  protected readonly cookies: Cookies;
  protected readonly instance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.cookies = new Cookies();
    const token = this.cookies.get('token');
    this.instance = axios.create({
      baseURL,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    this._initializeResponseInterceptor();
  }


  public hasToken = () => {
    return !!this.cookies.get('token');
  };

  public setCookieToken = (token: string | null) => {
    if (!token) {
      this.cookies.remove('token');
    } else {
      this.cookies.set('token', token, {
        expires: NEXT_WEEK,
      });
    }
  };

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => Promise.reject(error);
}
