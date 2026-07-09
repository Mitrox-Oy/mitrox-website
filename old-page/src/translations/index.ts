type Language = "fi" | "en";

type TranslationMap = Record<string, string>;

type Translations = Record<Language, TranslationMap>;

const TRANSLATIONS: Translations = {
  fi: {},
  en: {},
};

export type { Language, TranslationMap, Translations };

export default TRANSLATIONS;




