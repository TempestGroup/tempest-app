import api from '../configs/api.config';


class AuthService {
  register = async (user: any) => {
    return api.post('/api/v1/auth/register', user);
  };

  login = async (user: any) => {
    return api.post('/api/v1/auth/login', user);
  };

  info = async () => {
    return api.get('/api/v1/auth/info');
  };

  refreshToken = async () => {
    return api.get('/api/v1/auth/refresh');
  };
}

const authService = new AuthService();

export default authService;

