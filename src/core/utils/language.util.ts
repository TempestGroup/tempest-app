import SharedPreferencesUtil from "./shared-preferences.util.ts";
import i18n from '../configs/i18n.config.ts';
import enums from "../enums/enums.ts";

class LanguageUtil {

  static RUSSIAN_LANGUAGE = 'ru';
  static KAZAKH_LANGUAGE = 'kk';
  static ENGLISH_LANGUAGE = 'en';

  static getLanguages(): any[] {
    return [
      { label: i18n.t('russian'), value: 'ru' },
      { label: i18n.t('kazakh'), value: 'kk' },
      { label: i18n.t('english'), value: 'en' }
    ];
  }

  static getCurrentLanguage() {
    let lang = this.RUSSIAN_LANGUAGE;
    SharedPreferencesUtil.get(SharedPreferencesUtil.APP_LANGUAGE).then(language => {
      lang = language ?? i18n.language;
    });
    return lang;
  }

  static setCurrentLanguage(language: string = this.RUSSIAN_LANGUAGE) {
    try {
      SharedPreferencesUtil.set(SharedPreferencesUtil.APP_LANGUAGE, language).then(async ignored => {
        await i18n.changeLanguage(language);
      });
    } catch (error) {
      console.error('Error setting language:', error);
    }
  }
}

export default LanguageUtil;
