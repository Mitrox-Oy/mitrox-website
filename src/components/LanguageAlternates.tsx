/**
 * LanguageAlternates component
 * Adds hreflang tags for SEO and prevents auto-translation
 */
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { removeLanguagePrefix, addLanguagePrefix, SUPPORTED_LANGUAGES } from '../utils/routing';

export const LanguageAlternates: React.FC = () => {
  const location = useLocation();
  const currentPath = removeLanguagePrefix(location.pathname);
  const baseUrl = 'https://mitrox.io';

  return (
    <Helmet>
      {/* Prevent auto-translation */}
      <meta name="google" content="notranslate" />
      <meta name="googlebot" content="notranslate" />
      
      {/* Hreflang tags for SEO */}
      {SUPPORTED_LANGUAGES.map((lang) => {
        const localizedPath = addLanguagePrefix(currentPath, lang);
        const fullUrl = `${baseUrl}${localizedPath}`;
        return (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={fullUrl}
          />
        );
      })}
      
      {/* Default/x-default for search engines */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}${addLanguagePrefix(currentPath, 'fi')}`}
      />
    </Helmet>
  );
};


