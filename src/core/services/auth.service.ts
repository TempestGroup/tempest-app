import api from '../configs/api.config';


class AuthService {
  register = async (user: FormData) => {
    return api.post('/api/v1/auth/register', false, user);
  };

  login = async (user: any) => {
    return api.post('/api/v1/auth/login', false, user);
  };

  info = async () => {
    return api.get('/api/v1/auth/info');
  };
}

export default new AuthService();

