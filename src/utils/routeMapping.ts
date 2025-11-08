/**
 * Route mapping for localized SEO-friendly URLs
 */

export type SupportedLanguage = 'fi' | 'en';

export interface RouteMapping {
  fi: string;
  en: string;
}

// Route mappings: Finnish (SEO-friendly) -> English (SEO-friendly)
export const ROUTE_MAPPINGS: Record<string, RouteMapping> = {
  home: {
    fi: '',
    en: '',
  },
  about: {
    fi: 'tiimi',
    en: 'about',
  },
  websites: {
    fi: 'verkkosivut',
    en: 'websites',
  },
  advisor: {
    fi: 'ai-neuvonantaja',
    en: 'ai-advisor',
  },
  affiliate: {
    fi: 'kumppaniohjelma',
    en: 'affiliate',
  },
  'privacy-policy': {
    fi: 'tietosuojaseloste',
    en: 'privacy-policy',
  },
  'live-demo': {
    fi: 'live-demo',
    en: 'live-demo',
  },
};

// Section anchor mappings for product pages
export const SECTION_ANCHORS: Record<string, RouteMapping> = {
  process: {
    fi: 'prosessi',
    en: 'process',
  },
  features: {
    fi: 'ominaisuudet',
    en: 'features',
  },
  pricing: {
    fi: 'hinnasto',
    en: 'pricing',
  },
  references: {
    fi: 'referenssit',
    en: 'references',
  },
  faq: {
    fi: 'ukk',
    en: 'faq',
  },
  contact: {
    fi: 'ota-yhteytta',
    en: 'contact',
  },
};

/**
 * Get localized route path
 */
export function getLocalizedRoutePath(routeKey: string, lang: SupportedLanguage): string {
  const mapping = ROUTE_MAPPINGS[routeKey];
  if (!mapping) {
    // Fallback to routeKey if no mapping exists
    return routeKey;
  }
  return mapping[lang];
}

/**
 * Get localized section anchor
 */
export function getLocalizedSectionAnchor(sectionKey: string, lang: SupportedLanguage): string {
  const mapping = SECTION_ANCHORS[sectionKey];
  if (!mapping) {
    // Fallback to sectionKey if no mapping exists
    return sectionKey;
  }
  return mapping[lang];
}

/**
 * Find route key from localized path
 */
export function findRouteKeyFromPath(path: string, lang: SupportedLanguage): string | null {
  const pathSegment = path.split('/').filter(Boolean)[0] || '';
  
  for (const [key, mapping] of Object.entries(ROUTE_MAPPINGS)) {
    if (mapping[lang] === pathSegment) {
      return key;
    }
  }
  
  return null;
}

/**
 * Get full localized URL with language prefix
 */
export function getFullLocalizedPath(routeKey: string, lang: SupportedLanguage, hash?: string): string {
  const localizedPath = getLocalizedRoutePath(routeKey, lang);
  const fullPath = `/${lang}${localizedPath ? `/${localizedPath}` : ''}`;
  return hash ? `${fullPath}#${hash}` : fullPath;
}

/**
 * Get localized section hash link
 */
export function getLocalizedSectionLink(routeKey: string, sectionKey: string, lang: SupportedLanguage): string {
  const routePath = getLocalizedRoutePath(routeKey, lang);
  const sectionAnchor = getLocalizedSectionAnchor(sectionKey, lang);
  return `/${lang}${routePath ? `/${routePath}` : ''}#${sectionAnchor}`;
}

