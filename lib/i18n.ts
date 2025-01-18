import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../public/locales/en/tr.json';
import frTranslation from '../public/locales/fr/tr.json';
import esTranslation from '../public/locales/es/tr.json';
import deTranslation from '../public/locales/de/tr.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      es: { translation: esTranslation },
      de: { translation: deTranslation },
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
