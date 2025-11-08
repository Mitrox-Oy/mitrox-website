/**
 * Routing utilities for language-prefixed routes
 */
import { getFullLocalizedPath as getFullLocalizedPathFromMapping, findRouteKeyFromPath } from './routeMapping';

export type SupportedLanguage = 'fi' | 'en';

export const DEFAULT_LANGUAGE: SupportedLanguage = 'fi';
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['fi', 'en'];

/**
 * Get language from pathname
 */
export function getLanguageFromPath(pathname: string): SupportedLanguage {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment === 'fi' || firstSegment === 'en') {
    return firstSegment as SupportedLanguage;
  }
  
  return DEFAULT_LANGUAGE;
}

/**
 * Remove language prefix from pathname
 */
export function removeLanguagePrefix(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'fi' || segments[0] === 'en') {
    segments.shift();
  }
  return '/' + segments.join('/') || '/';
}

/**
 * Add language prefix to pathname
 */
export function addLanguagePrefix(pathname: string, lang: SupportedLanguage): string {
  const cleanPath = removeLanguagePrefix(pathname);
  if (cleanPath === '/') {
    return `/${lang}`;
  }
  return `/${lang}${cleanPath}`;
}

/**
 * Get localized path for a route
 * Now uses SEO-friendly localized paths
 */
export function getLocalizedPath(path: string, lang: SupportedLanguage): string {
  // Handle hash links (e.g., #hero)
  if (path.startsWith('#')) {
    return path;
  }
  
  // Handle absolute paths - convert to localized SEO-friendly paths
  if (path.startsWith('/')) {
    // Remove language prefix if present
    const pathWithoutLang = removeLanguagePrefix(path);
    const routeKey = findRouteKeyFromPath(pathWithoutLang, lang) || pathWithoutLang.slice(1);
    
    // If it's a known route, use the mapping
    if (routeKey && ['about', 'websites', 'advisor', 'affiliate', 'privacy-policy'].includes(routeKey)) {
      return getFullLocalizedPathFromMapping(routeKey, lang);
    }
    
    // Otherwise, just add language prefix
    return addLanguagePrefix(path, lang);
  }
  
  // Relative paths - assume current language context
  return path;
}

/**
 * Switch language in current path
 * Converts between localized SEO-friendly paths
 */
export function switchLanguagePath(currentPath: string, newLang: SupportedLanguage): string {
  const pathWithoutLang = removeLanguagePrefix(currentPath);
  
  // Try to find the route key from the current path
  const currentLang = getLanguageFromPath(currentPath);
  const routeKey = findRouteKeyFromPath(pathWithoutLang, currentLang);
  
  if (routeKey) {
    // Use the mapping to get the new language's path
    return getFullLocalizedPathFromMapping(routeKey, newLang);
  }
  
  // Fallback: just add language prefix
  return addLanguagePrefix(pathWithoutLang, newLang);
}

