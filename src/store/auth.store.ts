import { defineStore } from 'pinia';
import { AuthService } from '/@/api/services/auth.service';
import { UserDto } from '/@/dtos/index.dto';

interface AuthState {
  user: UserDto | null;
  jwt: string | null;
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => {
    return {
      user: null,
      jwt: null,
    };
  },

  getters: {
    isLoggedIn: (state: AuthState) => !!state.user,
    me: (state: AuthState) => state.user,
  },

  actions: {
    async getCurrentUser() {
      const api = AuthService.getInstance();
      if (!api.hasToken()) return;
      const me = await api.me();
      this.user = await api.findUserBydId(me.id);
    },
    async login(email: string, password: string): Promise<any> {
      const api = AuthService.getInstance();
      const { user, jwt } = await api.login({ email, password });
      api.setCookieToken(jwt);
      this.user = user;
    },
    async logout() {
      const api = AuthService.getInstance();
      api.setCookieToken(null);
      this.user = null;
    },
  },
});
