import SharedPreferencesUtil from "./shared-preferences.util.ts";
import i18n from '../configs/i18n.config.ts';

class LanguageUtil {

  static RUSSIAN_LANGUAGE = 'ru';
  static KAZAKH_LANGUAGE = 'kk';
  static ENGLISH_LANGUAGE = 'en';

  static getLanguages(): any[] {
    return [
      { label: i18n.t('app.language.russian'), value: 'ru' },
      { label: i18n.t('app.language.kazakh'), value: 'kk' },
      { label: i18n.t('app.language.english'), value: 'en' }
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

  static getMessage(s: string) {
    return i18n.t(`${s}`);
  }
}

export default LanguageUtil;
