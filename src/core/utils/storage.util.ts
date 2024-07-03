import { MMKV } from 'react-native-mmkv';

class StorageUtil {

  storage: MMKV = new MMKV();
  save (key: string, value: any) {
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
}

export default new StorageUtil();
