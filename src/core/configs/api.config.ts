import StorageUtil from '../utils/storage.util';
// @ts-ignore
import { APIURL } from '@env';
import blockUiUtil from "../utils/block-ui.util.ts";
import { CommonActions, createNavigationContainerRef, useNavigation } from "@react-navigation/native";
import toastUtil from "../utils/toast.util.ts";
import enums from "../enums/enums.ts";
import i18n from '../configs/i18n.config.ts';
import navigationRef from "./navigation.config.ts";

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

const HttpStatus = {
  SUCCESS: 200,
  AUTHORIZATION_ERROR: 401,
  FORBIDDEN: 403
}

const ContentType = {
  APPLICATION_JSON: 'application/json',
  MULTIPART_FORM_DATA: 'multipart/form-data'
}

const getToken = () => {
  return StorageUtil.getString(StorageUtil.USER_ACCESS_TOKEN) == undefined ? null : StorageUtil.getString(StorageUtil.USER_ACCESS_TOKEN);
}

const getRefreshToken = () => {
  return StorageUtil.getString(StorageUtil.USER_REFRESH_TOKEN) == undefined ? null : StorageUtil.getString(StorageUtil.USER_REFRESH_TOKEN);
}

const getMobileToken = () => {
  return StorageUtil.getString(StorageUtil.USER_MOBILE_TOKEN) == undefined ? null : StorageUtil.getString(StorageUtil.USER_MOBILE_TOKEN);
}

const getLanguage = () => {
  return StorageUtil.getString(StorageUtil.LANGUAGE) == undefined ? StorageUtil.DEFAULT_LANGUAGE : StorageUtil.getString(StorageUtil.LANGUAGE);
}

const getUrl = (url: string, params: any = {}) => {
  if (params != null) {
    let queryParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
    return url + (queryParams ? '?' + queryParams : '');
  }
  return url;
}

const getContentType = (body: any = {}) => {
  return body instanceof FormData ? ContentType.MULTIPART_FORM_DATA : ContentType.APPLICATION_JSON;
}

const getBody = (body: any = {}) => {
  return body instanceof FormData ? body : JSON.stringify(body);
}

const getOptions = (method: string = HttpMethod.GET, body: any = {}, options: any = {}, withToken: boolean = true) => {
  let headers = {
    'Content-Type': getContentType(body),
    'Device-Type': 'MOBILE',
    Language: getLanguage(),
    ...options.headers
  };
  if (withToken) {
    headers.Token = getToken();
  }
  if (body != null && Object.keys(body).length > 0) {
    options.body = getBody(body);
  }
  return {
    method: method,
    headers,
    ...options
  }
}

const getRefreshOptions = (method: string = HttpMethod.GET, body: any = {}, options: any = {}, withToken: boolean = true, withMobileToken: boolean = false) => {
  let headers = {
    'Content-Type': getContentType(body),
    'Device-Type': 'MOBILE',
    Language: getLanguage(),
    ...options.headers
  };
  if (withToken) {
    headers.Token = withMobileToken ? getMobileToken() : getRefreshToken();
  }
  if (body != null && Object.keys(body).length > 0) {
    options.body = getBody(body);
  }
  return {
    method: method,
    headers,
    ...options
  }
}

function getCurrentRouteName() {
  const { current } = navigationRef;
  if (!current || !current.getRootState) {
    return null;
  }
  const state = current.getRootState();
  const routes = state.routes;
  const currentRoute = routes[state.index] || {};
  return currentRoute.name;
}

function mobileTokenAndRetry(url: string, method: string = HttpMethod.GET, params: any = {}, body: any = {}, withToken: boolean = true, options: any = {}): any {
  return fetch(APIURL + '/api/v1/auth/refresh', getRefreshOptions(HttpMethod.POST, {}, {}, true, true))
    .then(res => {
      return res.json().then(response => {
        StorageUtil.save(StorageUtil.USER_ACCESS_TOKEN, response.token.accessToken);
        StorageUtil.save(StorageUtil.USER_REFRESH_TOKEN, response.token.refreshToken);
        return api(url, method, params, body, withToken, options);
      });
    }).catch(error => {
      handleAuthError(error);
      throw error;
    });
}

function refreshTokenAndRetry(url: string, method: string = HttpMethod.GET, params: any = {}, body: any = {}, withToken: boolean = true, options: any = {}): any {
  return fetch(APIURL + '/api/v1/auth/refresh', getRefreshOptions(HttpMethod.POST, {}, {}, true))
    .then(res => {
      if (!res.ok) {
        if (res.status === HttpStatus.AUTHORIZATION_ERROR) {
          return mobileTokenAndRetry(url, method, params, body, withToken, options);
        }
        return handleAuthError(res);
      }
      return res.json().then(response => {
        StorageUtil.save(StorageUtil.USER_ACCESS_TOKEN, response.token.accessToken);
        StorageUtil.save(StorageUtil.USER_REFRESH_TOKEN, response.token.refreshToken);
        return api(url, method, params, body, withToken, options);
      });
    }).catch(error => {
      handleAuthError(error);
      throw error;
    });
}

function handleAuthError(error: any) {
  if (error.status === HttpStatus.AUTHORIZATION_ERROR) {
    if (getCurrentRouteName() !== 'splash') {
      navigationRef.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'splash' }] }));
    }
  } else if (error instanceof TypeError && error.message === 'Network request failed') {
    toastUtil.showToast({ content: i18n.t('app.network.error'), status: enums.MessageStatus.ERROR }, 5000);
    if (getCurrentRouteName() != 'splash') {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'splash' },
          ],
        })
      );
    }
  }
}

function api(url: string, method: string = HttpMethod.GET, params: any = {}, body: any = {}, withToken: boolean = true, options: any = {}) {
  console.log("Fetching: ", getUrl(APIURL + url, params), '. Options: ', getOptions(method, body, options, withToken))
  return fetch(getUrl(APIURL + url, params), getOptions(method, body, options, withToken))
    .then(response => {
      if (!response.ok) {
        blockUiUtil.hide();
        if (response.status === HttpStatus.AUTHORIZATION_ERROR) {
          return refreshTokenAndRetry(url, method, params, body, withToken, options);
        }
        return response.json().then(message => {
          toastUtil.showToast(message);
          handleAuthError(response);
        });
      }
      return response.json();
    }).catch(error => {
      blockUiUtil.hide();
      handleAuthError(error);
      throw error;
    });
}

class Api {
  post = (url: string, withToken: boolean = true, body: any) => {
    return api(url, HttpMethod.POST, null, body, withToken, {});
  }

  get = (url: string, withToken: boolean = true, params: any = {}) => {
    return api(url, HttpMethod.GET, params, null, withToken, {});
  }

  put = (url: string, withToken: boolean = true, params: any = {}, body: any = {}) => {
    return api(url, HttpMethod.PUT, params, body, withToken, {});
  }

  delete = (url: string, withToken: boolean = true, params: any = {}) => {
    return api(url, HttpMethod.DELETE, params, null, withToken, {});
  }
}

export default new Api();
