import { HttpService } from './http.service';
import { APP_KEYS } from '../common/consts';

class AuthService extends HttpService {
  constructor() {
    super();
  }

  async signup(email: string, password: string) {
    const data = await this.post(
      {
        url: `${APP_KEYS.BACKEND_KEYS.SIGNUP}`,
        data: { email, password }
      },
      false
    );

    localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, data.token);

    return data;
  }

  async login(email: string, password: string) {
    const data = await this.post(
      {
        url: `${APP_KEYS.BACKEND_KEYS.LOGIN}`,
        data: { email, password }
      },
      false
    );
    localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, data.token);
  }

  async logout() {
    localStorage.removeItem(APP_KEYS.STORAGE_KEYS.TOKEN);
  }

  async changePassword(oldPassword: string, password: string) {
    const data = await this.patch({
      url: `${APP_KEYS.BACKEND_KEYS.CHANGE_PASSWORD}`,
      data: { oldPassword, password }
    });

    return data;
  }

  async requestForgotPassword(email: string) {
    const data = await this.post(
      {
        url: `${APP_KEYS.BACKEND_KEYS.REQUEST_FORGOT_PASSWORD}`,
        data: { email }
      },
      false
    );
    return data;
  }

  async forgotPassword(token: string, password: string) {
    const data = await this.patch(
      {
        url: `${APP_KEYS.BACKEND_KEYS.FORGOT_PASSWORD(token)}`,
        data: { password }
      },
      false
    );
    return data;
  }
}

const authService = new AuthService();
export default authService;
