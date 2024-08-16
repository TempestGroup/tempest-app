import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import storageUtil from "../utils/storage.util.ts";
import extractedMessages from "../extractors/messages.extractor.ts";


i18n
  .use(initReactI18next)
  .init({
    resources: extractedMessages,
    lng: storageUtil.getString(storageUtil.APP_LANGUAGE) ?? 'ru',
    fallbackLng: 'ru',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
