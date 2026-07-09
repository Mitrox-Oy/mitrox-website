/**
 * Image Alt Text Helper
 * 
 * Provides language-aware alt text for images when missing.
 * Used when VITE_SEO_V2 is enabled.
 */

import { getSEOConfig, Language } from './seo';

/**
 * Gets language-aware alt text for common images
 * Returns the provided alt if it exists, otherwise returns a default alt text in the specified language
 */
export function getImageAlt(
  existingAlt: string | undefined,
  imageType?: 'logo' | 'hero' | 'portfolio' | 'team' | 'default',
  language: Language = 'fi'
): string {
  // If alt already exists, use it
  if (existingAlt && existingAlt.trim()) {
    return existingAlt;
  }

  const seoConfig = getSEOConfig(language);

  // Return language-specific defaults based on image type
  if (language === 'fi') {
    const defaults: Record<string, string> = {
      logo: `${seoConfig.brand.nameShort} logo`,
      hero: `${seoConfig.brand.name} - ${seoConfig.brand.description}`,
      portfolio: 'Esimerkki Mitroxin toteuttamasta verkkosivustosta - verkkosivut yritykselle',
      team: 'Mitroxin tiimin jäsen',
      default: `${seoConfig.brand.name} - ${seoConfig.brand.description}`
    };
    return defaults[imageType || 'default'];
  } else {
    // English defaults
    const defaults: Record<string, string> = {
      logo: `${seoConfig.brand.nameShort} logo`,
      hero: `${seoConfig.brand.name} - ${seoConfig.brand.description}`,
      portfolio: 'Example business website created by Mitrox',
      team: 'Mitrox team member',
      default: `${seoConfig.brand.name} - ${seoConfig.brand.description}`
    };
    return defaults[imageType || 'default'];
  }
}

