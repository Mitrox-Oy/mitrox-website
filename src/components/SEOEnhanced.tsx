/**
 * SEO Enhanced Component
 * 
 * Adds advanced SEO meta tags and JSON-LD structured data when VITE_SEO_V2 is enabled.
 * Works alongside the existing SEOHead component.
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { safeJsonLd, getSEOConfig, Language } from '../../lib/seo';

interface MetaProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  keywords?: string;
  locale?: string;
  noIndex?: boolean;
}

interface SEOEnhancedProps {
  meta?: MetaProps;
  schemas?: unknown[];
  lang?: string;
}

const SEOEnhanced: React.FC<SEOEnhancedProps> = ({ meta, schemas = [], lang = 'fi' }) => {
  // Only render when VITE_SEO_V2 is enabled
  if (import.meta.env.VITE_SEO_V2 !== 'true') {
    return null;
  }

  const language = lang as Language;
  const seoConfig = getSEOConfig(language);
  const baseUrl = seoConfig.brand.url;
  const fullUrl = meta?.url || baseUrl;
  const ogImage = meta?.image || seoConfig.defaultImage;

  return (
    <Helmet>
      {/* Language attribute */}
      <html lang={lang} />

      {/* Enhanced meta tags if provided */}
      {meta && (
        <>
          {/* Canonical URL */}
          <link rel="canonical" href={fullUrl} />

          {/* Open Graph enhanced */}
          <meta property="og:locale" content={meta.locale || seoConfig.defaultLocale} />
          {seoConfig.alternateLocales.map(locale => (
            <meta
              key={locale}
              property="og:locale:alternate"
              content={locale}
            />
          ))}

          {/* Additional structured data hints */}
          {meta.keywords && <meta name="keywords" content={meta.keywords} />}
        </>
      )}

      {/* JSON-LD Structured Data */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(schema)
          }}
        />
      ))}
    </Helmet>
  );
};

export default SEOEnhanced;

