import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../../assets/messages/en.json';
import ru from '../../../assets/messages/ru.json';
import kk from '../../../assets/messages/kk.json';
import storageUtil from "../utils/storage.util.ts";
import LanguageUtil from "../utils/language.util.ts";

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  kk: {
    translation: kk,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: storageUtil.getString(storageUtil.APP_LANGUAGE) ?? 'ru',
    fallbackLng: 'ru',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
