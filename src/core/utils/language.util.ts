import i18n from '../configs/i18n.config.ts';
import storageUtil from "./storage.util.ts";

class LanguageUtil {

  static RUSSIAN_LANGUAGE = 'ru';
  static KAZAKH_LANGUAGE = 'kk';
  static ENGLISH_LANGUAGE = 'en';

  static getLanguages(): any[] {
    return [
      { label: 'app.language.russian', value: 'ru' },
      { label: 'app.language.kazakh', value: 'kk' },
      { label: 'app.language.english', value: 'en' }
    ];
  }

  static getCurrentLanguage() {
    return storageUtil.getString(storageUtil.APP_LANGUAGE) ?? i18n.language;
  }

  static setCurrentLanguage(language: string = this.RUSSIAN_LANGUAGE) {
    storageUtil.save(storageUtil.APP_LANGUAGE, language);
  }
}

export default LanguageUtil;
