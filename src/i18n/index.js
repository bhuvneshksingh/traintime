import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
// import { I18nextProvider, initReactI18next } from 'react-i18next'
// import XHR from 'i18next-xhr-backend'

import EnLocale from './locales/en.json'
import CsLocale from './locales/cs.json'
import RuLocale from './locales/ru.json'
import PtLocale from './locales/pt.json'
import EsLocale from './locales/es.json'
import IdLocale from './locales/id.json'
import FrLocale from './locales/fr.json'

i18n.use(LanguageDetector).init({
  debug: false,
  fallbackLng: 'en',
  // keySeparator: false,
  interpolation: { escapeValue: false },

  resources: {
    en: { translations: EnLocale },
    cs: { translations: CsLocale },
    id: { translations: IdLocale },
    fr: { translations: FrLocale },
    pt: { translations: PtLocale },
    es: { translations: EsLocale },
    ru: { translations: RuLocale },
  },
  ns: ['translations'],
  defaultNS: 'translations',
  react: {
    wait: true,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default',
  },
  returnObjects: true,
})

export default i18n
