import StorageUtil from '../utils/storage.util';
// @ts-ignore
import { process } from 'react-native-dotenv';
import StringUtil from "../utils/string.util.ts";

const getToken = () => {
  return StorageUtil.getString('user.token.access') == undefined ? null : StorageUtil.getString('user.token.access');
}

const getLanguage = () => {
  return StorageUtil.getString('app.language') == undefined ? 'en' : StorageUtil.getString('app.language');
}

const getUrl = (url: string, params: any = {}) => {
  let queryParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
  return url + (queryParams ? '?' + queryParams : '');
}

function api(url: string, method: string = 'GET', params: any = {}, body: any = {}, withToken: boolean = true, options: any = {}) {
  let headers: any = {
    'Content-Type': 'application/json',
    'Language': getLanguage()
  };
  if (withToken) {
    headers['Token'] = getToken();
  }
  options.headers = { ...headers, ...options.headers };
  options.method = method;
  options.body = JSON.stringify(body);
  const baseUrl = getUrl(process.env.api_url + url, params);
  console.log('Fetching:', baseUrl, options);
  return fetch(baseUrl, options)
    .then(response => {
      return response.json();
    }).catch(async error => {
      console.log(error)
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        try {
          const response: any = await fetch(process.env.api_url + '/api/v1/auth/refresh');
          StorageUtil.save('user.token.access', response.json().accessToken);
          StorageUtil.save('user.token.refresh', response.json().refreshToken);
        } catch (refreshError) {
          console.error('Fetch Error:', refreshError);
          throw refreshError;
        }
      }
      console.error('Fetch Error:', error);
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
