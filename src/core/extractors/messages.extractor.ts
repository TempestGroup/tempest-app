import messages from '../../../assets/messages/messages.json';

type Translations = Record<string, Record<string, string>>;
type TransformedTranslations = Record<string, { translation: Record<string, string> }>;

const translationResources = (translations: Translations): TransformedTranslations => {
  const transformed: TransformedTranslations = { kk: { translation: {} }, ru: { translation: {} }, en: { translation: {} } };
  Object.keys(translations).forEach((key) => {
    Object.keys(translations[key]).forEach((code) => {
      if (!transformed[code]) {
        transformed[code] = { translation: {} };
      }
      transformed[code].translation[key] = translations[key][code];
    });
  });
  return transformed;
};

const extractedMessages = translationResources(messages);
export default extractedMessages;
