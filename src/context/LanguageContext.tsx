import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import TRANSLATIONS, { Language } from "../translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
};

const LANGUAGE_STORAGE_KEY = "appLanguage";

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const isBrowser = typeof window !== "undefined";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("fi");

  useEffect(() => {
    if (!isBrowser) return;
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (stored === "en" || stored === "fi") {
      setLanguageState(stored);
      return;
    }

    let cancelled = false;

    const detectLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as { country?: string };
        if (cancelled) return;
        const country = data?.country?.toUpperCase();
        setLanguageState(country === "FI" ? "fi" : "en");
      } catch {
        // Fallback to Finnish default on error
      }
    };

    detectLocation();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (isBrowser) {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = language === "fi" ? "fi" : "en";
    }
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === "fi" ? "en" : "fi"));
  }, []);

  const translate = useCallback(
    (key: string, fallback?: string) => {
      const resolve = (lang: Language) => {
        const segments = key.split(".");
        let current: any = TRANSLATIONS[lang];
        for (const segment of segments) {
          if (current && Object.prototype.hasOwnProperty.call(current, segment)) {
            current = current[segment];
          } else {
            return undefined;
          }
        }
        return typeof current === "string" ? current : undefined;
      };

      const active = resolve(language);
      if (active) return active;

      const fallbackFi = resolve("fi");
      if (fallbackFi) return fallbackFi;

      return fallback ?? key;
    },
    [language]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: translate,
    }),
    [language, setLanguage, toggleLanguage, translate]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback to a safe default to prevent runtime crashes if provider isn't mounted yet
    return {
      language: "fi" as Language,
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (key: string, fallback?: string) => fallback ?? key,
    };
  }
  return context;
};

export default LanguageContext;

