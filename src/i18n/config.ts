import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import fiTranslations from '../locales/fi/common.json';
import enTranslations from '../locales/en/common.json';
import { getLanguageFromPath, DEFAULT_LANGUAGE } from '../utils/routing';

const resources = {
  fi: {
    common: fiTranslations,
  },
  en: {
    common: enTranslations,
  },
};

// Custom path detector that checks URL path first
const customPathDetector = {
  name: 'customPath',
  lookup() {
    if (typeof window === 'undefined') return null;
    return getLanguageFromPath(window.location.pathname);
  },
  cacheUserLanguage(lng: string) {
    // Language is stored in URL, no need to cache separately
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: 'common',
    ns: ['common'],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      // Order: custom path (URL) first, then cookie, then localStorage, then navigator
      order: ['customPath', 'cookie', 'localStorage', 'navigator'],
      // Cookie name for language preference
      lookupCookie: 'preferredLang',
      // localStorage key
      lookupLocalStorage: 'appLanguage',
      // Cache user language
      caches: ['cookie', 'localStorage'],
      // Cookie options
      cookieOptions: {
        path: '/',
        sameSite: 'strict',
        maxAge: 365 * 24 * 60 * 60, // 1 year
      },
    },
  });

// Add custom path detector
i18n.services.languageDetector.addDetector(customPathDetector);

export default i18n;

