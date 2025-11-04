/**
 * Image Alt Text Helper
 * 
 * Provides Finnish alt text for images when missing.
 * Used when VITE_SEO_V2 is enabled.
 */

import { SEO_CONFIG } from '../config/seo.fi';

/**
 * Gets Finnish alt text for common images
 * Returns the provided alt if it exists, otherwise returns a default Finnish alt
 */
export function getImageAlt(
  existingAlt: string | undefined,
  imageType?: 'logo' | 'hero' | 'portfolio' | 'team' | 'default'
): string {
  // If alt already exists, use it
  if (existingAlt && existingAlt.trim()) {
    return existingAlt;
  }

  // Return Finnish defaults based on image type
  const defaults: Record<string, string> = {
    logo: `${SEO_CONFIG.brand.nameShort} logo`,
    hero: `${SEO_CONFIG.brand.name} - ${SEO_CONFIG.brand.description}`,
    portfolio: 'Esimerkki Mitroxin toteuttamasta verkkosivustosta',
    team: 'Mitroxin tiimin jäsen',
    default: `${SEO_CONFIG.brand.name} - ${SEO_CONFIG.brand.description}`
  };

  return defaults[imageType || 'default'];
}

