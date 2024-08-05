import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../../assets/messages/en.json';
import ru from '../../../assets/messages/ru.json';
import kk from '../../../assets/messages/kk.json';

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
    lng: 'ru',
    fallbackLng: 'ru',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
