/**
 * LanguageRedirect component
 * Handles redirecting root paths and paths without language prefix to /fi/ or /en/
 */
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLanguageFromPath, addLanguagePrefix, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../utils/routing';
import { useTranslation } from 'react-i18next';

export const LanguageRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const pathname = location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];

    // If path already has a language prefix, ensure i18n is synced
    if (firstSegment === 'fi' || firstSegment === 'en') {
      const lang = firstSegment as 'fi' | 'en';
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
      return;
    }

    // Path doesn't have language prefix - redirect to default or detected language
    const detectedLang = getLanguageFromPath(pathname);
    const newPath = addLanguagePrefix(pathname, detectedLang);
    
    // Only redirect if path would change
    if (newPath !== pathname) {
      navigate(newPath, { replace: true });
    } else {
      // Ensure i18n is set even if no redirect needed
      i18n.changeLanguage(detectedLang);
    }
  }, [location.pathname, navigate, i18n]);

  return null;
};

