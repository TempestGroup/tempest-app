import StorageUtil from '../utils/storage.util';
// @ts-ignore
import { process } from 'react-native-dotenv';
import StringUtil from "../utils/string.util.ts";
import blockUiUtil from "../utils/block-ui.util.ts";

const getToken = () => {
  return StorageUtil.getString('user.token.access') == undefined ? null : StorageUtil.getString('user.token.access');
}

const getLanguage = () => {
  return StorageUtil.getString('app.language') == undefined ? 'ru' : StorageUtil.getString('app.language');
}

const getUrl = (url: string, params: any = {}) => {
  let queryParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
  return url + (queryParams ? '?' + queryParams : '');
}

const getContentType = (body: any = {}) => {
  return body instanceof FormData ? 'multipart/form-data' : 'application/json';
}

const getBody = (body: any = {}) => {
  return body instanceof FormData ? body : JSON.stringify(body);
}

const getOptions = (method: string = 'GET', body: any = {}, options: any = {}, withToken: boolean = true) => {
  let headers = {
    'Content-Type': getContentType(body),
    Language: getLanguage(),
    ...options.headers
  };
  if (withToken) {
    headers.Token = getToken();
  }
  return {
    method: method,
    body: getBody(body),
    headers,
    ...options
  }
}

function api(url: string, method: string = 'GET', params: any = {}, body: any = {}, withToken: boolean = true, options: any = {}) {
  console.log("Fetching: ", getUrl(process.env.api_url + url, params), '. Options: ', getOptions(method, body, options, withToken))
  return fetch(getUrl(process.env.api_url + url, params), getOptions(method, body, options, withToken))
    .then(response => response.json()).catch(async error => {
      blockUiUtil.hide();
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        try {
          const response: any = await fetch(process.env.api_url + '/api/v1/auth/refresh');
          StorageUtil.save('user.token.access', response.json().accessToken);
          StorageUtil.save('user.token.refresh', response.json().refreshToken);
        } catch (refreshError) {
          throw refreshError;
        }
      }
      throw error;
    });
}

class Api {
  post = (url: string, withToken: boolean = true, body: any) => {
    return api(url, 'POST', {}, body, withToken, {});
  }

  get = (url: string, withToken: boolean = true, params: any = {}) => {
    return api(url, 'GET', params, {}, withToken, {});
  }

  put = (url: string, withToken: boolean = true, params: any = {}, body: any = {}) => {
    return api(url, 'PUT', params, body, withToken, {});
  }

  delete = (url: string, withToken: boolean = true, params: any = {}) => {
    return api(url, 'DELETE', params, {}, withToken, {});
  }
}

export default new Api();
