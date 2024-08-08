import { MMKV } from 'react-native-mmkv';

class StorageUtil {

  LANGUAGE = 'app.language';
  DEFAULT_LANGUAGE = 'ru';
  USER_ACCESS_TOKEN = 'user.token.access';
  USER_REFRESH_TOKEN = 'user.token.refresh';
  IS_EDITING_MODE_PERSON_INFO = 'app.user.person_information.mode.edit';
  USER_MOBILE_TOKEN = 'user.mobile.token';
  APP_LANGUAGE = 'app.language';

  storage: MMKV = new MMKV();
  save(key: string, value: any) {
    this.storage.set(key, value);
  };

  getString (key: string): string | undefined {
    return this.storage.getString(key);
  };

  getNumber(key: string): number | undefined {
    return this.storage.getNumber(key);
  };

  getBoolean (key: string): boolean | undefined {
    return this.storage.getBoolean(key);
  };

  remove(key: string) {
    this.storage.delete(key);
  };

  clear() {
    this.storage.clearAll();
  };
}

export default new StorageUtil();
