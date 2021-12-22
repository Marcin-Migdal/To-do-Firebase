import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationPL from './resourse/locales/pl/translation.json';
import translationEN from './resourse/locales/en/translation.json';

const languages = ['en', 'pl'];

const resources = {
  pl: {
    translation: translationPL,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: languages,
    whitelist: languages,
    debug: true,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
