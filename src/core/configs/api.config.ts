import axios, { AxiosResponse } from 'axios';
import authService from '../services/auth.service';
import storageUtil from '../utils/storage.util';

const getToken = () => {
  return storageUtil.getString('user.token.access') == undefined ? null : storageUtil.getString('user.token.access');
}

const getLanguage = () => {
  return storageUtil.getString('app.language') == undefined ? 'ru' : storageUtil.getString('app.language');
}

function onRequestSuccess(config: any) {
  config.headers.Token = getToken();
  config.headers.Language = getLanguage();
  return config;
}

function onRequestError(error: any) {
  return Promise.reject(error);
}

function onResponseSuccess(response: AxiosResponse) {
    return response.data;
}

function onResponseError(error: any) {
  if (error.response && (error.response.status == 401 || error.response.status == 403)) {
    authService.refreshToken().then(response => {
      storageUtil.save('user.token.access', response.data.accessToken);
      storageUtil.save('user.token.refresh', response.data.refreshToken);
    });
  }
  return Promise.reject(error);
}

const api = axios.create({
  baseURL: process.env.api_url,
});

api.interceptors.request.use(onRequestSuccess, onRequestError);
api.interceptors.response.use(onResponseSuccess, onResponseError);

export default api;
