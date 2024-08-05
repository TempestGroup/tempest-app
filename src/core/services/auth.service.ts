import api from '../configs/api.config';


class AuthService {
  register = async (user: FormData) => {
    return api.post('/api/v1/auth/register', false, user);
  };

  login = async (user: any) => {
    return api.post('/api/v1/auth/login', false, user);
  };

  refresh = async () => {
    return api.post('/api/v1/auth/refresh', false, {});
  };

  info = async () => {
    return api.get('/api/v1/auth/info', true);
  };
}

export default new AuthService();

