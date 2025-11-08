import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLanguageFromPath, DEFAULT_LANGUAGE } from "../utils/routing";

export type Language = "fi" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const isBrowser = typeof window !== "undefined";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n, t: i18nT } = useTranslation();
  const [pathname, setPathname] = useState<string>(
    isBrowser ? window.location.pathname : "/"
  );
  
  // Listen to pathname changes via custom event (triggered by LanguageContextRouter)
  useEffect(() => {
    if (!isBrowser) return;
    
    const handlePathnameChange = (event: CustomEvent<string>) => {
      setPathname(event.detail);
    };
    
    window.addEventListener("languagecontext:pathname" as any, handlePathnameChange as EventListener);
    
    return () => {
      window.removeEventListener("languagecontext:pathname" as any, handlePathnameChange as EventListener);
    };
  }, []);
  
  // Get language from URL path or i18n (i18n is already set by our path detector)
  const pathLanguage = getLanguageFromPath(pathname) as Language;
  const i18nLanguage = (i18n.language as Language) || DEFAULT_LANGUAGE;
  const language = pathLanguage || i18nLanguage;

  // Sync i18n language with URL path
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  // Update HTML lang attribute and prevent auto-translation
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      // Prevent browser auto-translation
      document.documentElement.setAttribute("translate", "no");
    }
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    // This will be handled by URL navigation in components
    i18n.changeLanguage(nextLanguage);
  }, [i18n]);

  const toggleLanguage = useCallback(() => {
    const newLang = language === "fi" ? "en" : "fi";
    setLanguage(newLang);
  }, [language, setLanguage]);

  const translate = useCallback(
    (key: string, fallback?: string) => {
      try {
        const translated = i18nT(key);
        return translated || fallback || key;
      } catch {
        return fallback || key;
      }
    },
    [i18nT]
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

