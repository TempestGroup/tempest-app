import AsyncStorage from "@react-native-async-storage/async-storage";

class SharedPreferencesUtil {

  static USER_MOBILE_TOKEN = 'user.mobile.token';
  static APP_LANGUAGE = 'app.language';

  static async set(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error("Error saving data", e);
    }
  }

  static async get(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error("Error retrieving data", e);
      return null;
    }
  }

  static async keys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (e) {
      console.error("Error retrieving data", e);
      return null;
    }
  }

  static async contains(key: string) {
    try {
      let keys = await this.keys();
      return keys == null ? false : keys?.includes(key);
    } catch (e) {
      console.error("Error retrieving data", e);
      return false;
    }
  }

  static async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("Error removing data", e);
    }
  }

  static async clear() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error("Error clearing data", e);
    }
  }
}

export default SharedPreferencesUtil;
