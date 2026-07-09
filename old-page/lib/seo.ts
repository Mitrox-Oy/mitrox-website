/**
 * SEO Utilities
 * 
 * Helper functions for building meta tags and JSON-LD structured data.
 * Used when VITE_SEO_V2 is enabled.
 */

import { SEO_CONFIG as SEO_CONFIG_FI } from '../config/seo.fi';
import { SEO_CONFIG as SEO_CONFIG_EN } from '../config/seo.en';

export type Language = 'fi' | 'en';

/**
 * Get SEO config based on language
 */
export function getSEOConfig(lang: Language = 'fi') {
  return lang === 'fi' ? SEO_CONFIG_FI : SEO_CONFIG_EN;
}

export interface MetaProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  locale?: string;
  keywords?: string[];
  noIndex?: boolean;
  language?: Language;
}

export interface BreadcrumbSegment {
  name: string;
  href: string;
}

export interface ServiceSchemaProps {
  type: 'websites' | 'advisor';
  name: string;
  areaServed?: string;
  alternateNames?: string[];
  keywords?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Builds meta props for SEOHead component
 */
export function buildMeta({
  title,
  description,
  path,
  image,
  locale,
  keywords,
  noIndex = false,
  language = 'fi'
}: MetaProps) {
  const seoConfig = getSEOConfig(language);
  const baseUrl = seoConfig.brand.url;
  const fullUrl = `${baseUrl}${path}`;
  const ogImage = image || seoConfig.defaultImage;
  const defaultLocale = locale || seoConfig.defaultLocale;

  // Ensure title and description are within limits
  const trimmedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  const trimmedDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;

  return {
    title: trimmedTitle,
    description: trimmedDescription,
    keywords: keywords?.join(', ') || '',
    url: fullUrl,
    image: ogImage,
    type: 'website',
    locale: defaultLocale,
    noIndex
  };
}

/**
 * Generates canonical URL
 */
export function canonical(path: string, language: Language = 'fi'): string {
  const seoConfig = getSEOConfig(language);
  return `${seoConfig.brand.url}${path}`;
}

/**
 * Generates alternate language URLs with proper language paths
 */
export function alternates(path: string, currentLanguage: Language = 'fi'): Array<{ hreflang: string; href: string }> {
  const baseUrl = SEO_CONFIG_FI.brand.url; // Same for both languages
  const currentConfig = getSEOConfig(currentLanguage);
  
  // Get the path without language prefix
  const pathWithoutLang = path.replace(/^\/(fi|en)/, '') || '/';
  
  // Generate alternates for all supported languages
  const alternatesList: Array<{ hreflang: string; href: string }> = [];
  
  // Add current language
  const currentLangPath = currentLanguage === 'fi' ? `/fi${pathWithoutLang === '/' ? '' : pathWithoutLang}` : `/en${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
  alternatesList.push({
    hreflang: currentConfig.defaultLocale,
    href: `${baseUrl}${currentLangPath}`
  });
  
  // Add alternate languages
  currentConfig.alternateLocales.forEach(locale => {
    const altLang: Language = locale.startsWith('fi') ? 'fi' : 'en';
    const altLangPath = altLang === 'fi' ? `/fi${pathWithoutLang === '/' ? '' : pathWithoutLang}` : `/en${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    alternatesList.push({
      hreflang: locale,
      href: `${baseUrl}${altLangPath}`
    });
  });
  
  return alternatesList;
}

/**
 * Organization schema (JSON-LD)
 */
export function organizationSchema(language: Language = 'fi') {
  const seoConfig = getSEOConfig(language);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": seoConfig.brand.name,
    "url": seoConfig.brand.url,
    "logo": seoConfig.brand.logo,
    "description": seoConfig.brand.description,
    "foundingDate": seoConfig.brand.foundingDate,
    "founders": [
      {
        "@type": "Person",
        "name": "Tobias Rockas"
      },
      {
        "@type": "Person",
        "name": "Johannes Hurmerinta"
      },
      {
        "@type": "Person",
        "name": "Felix Miettinen"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": seoConfig.brand.address.country
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": seoConfig.brand.phone,
      "contactType": "customer service",
      "email": seoConfig.brand.email,
      "availableLanguage": ["Finnish", "English"]
    },
    "sameAs": [
      seoConfig.brand.social.instagram,
      seoConfig.brand.social.youtube
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": language === 'fi' ? "Mitroxin palvelut" : "Mitrox Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": language === 'fi' ? "Verkkosivut yrityksille" : "Business Websites"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": language === 'fi' ? "Tekoälyneuvoja" : "AI Advisor"
          }
        }
      ]
    }
  };
}

/**
 * LocalBusiness schema (JSON-LD) - for local SEO
 */
export function localBusinessSchema(language: Language = 'fi') {
  const seoConfig = getSEOConfig(language);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${seoConfig.brand.url}#organization`,
    "name": seoConfig.brand.name,
    "image": seoConfig.brand.logo,
    "url": seoConfig.brand.url,
    "description": seoConfig.brand.description,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": seoConfig.brand.address.country,
      "addressCountryName": seoConfig.brand.address.countryName
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": seoConfig.brand.phone,
      "contactType": "customer service",
      "email": seoConfig.brand.email,
      "availableLanguage": ["Finnish", "English"]
    },
    "areaServed": {
      "@type": "Country",
      "name": seoConfig.brand.address.countryName
    },
    "priceRange": "$$",
    "sameAs": [
      seoConfig.brand.social.instagram,
      seoConfig.brand.social.youtube
    ]
  };
}

/**
 * Website schema (JSON-LD)
 */
export function websiteSchema(language: Language = 'fi') {
  const seoConfig = getSEOConfig(language);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": seoConfig.brand.name,
    "url": seoConfig.brand.url,
    "description": seoConfig.brand.description,
    "inLanguage": language,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${seoConfig.brand.url}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Breadcrumb schema (JSON-LD)
 */
export function breadcrumbSchema(segments: BreadcrumbSegment[], language: Language = 'fi') {
  const seoConfig = getSEOConfig(language);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": segments.map((segment, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": segment.name,
      "item": `${seoConfig.brand.url}${segment.href}`
    }))
  };
}

/**
 * Service schema (JSON-LD)
 */
export function serviceSchema({ type, name, areaServed = 'FI', language = 'fi', alternateNames, keywords }: ServiceSchemaProps & { language?: Language }) {
  const seoConfig = getSEOConfig(language);
  const baseSchema: any = {
    "@context": "https://schema.org",
    "@type": type === 'websites' ? "ProfessionalService" : "SoftwareApplication",
    "name": name,
    "description": language === 'fi' 
      ? (type === 'websites' 
          ? "Räätälöidyt verkkosivut ja nettisivut yritykselle 14 päivässä. Hakukoneoptimointi, moderni design ja ylläpito."
          : "Tekoälyneuvoja, tekoälybotti ja chatbot yrityksille 24/7. Automatisoi asiakaspalvelu ja kasvata myyntiä.")
      : (type === 'websites'
          ? "Custom business websites in 14 days. SEO optimization, modern design, and maintenance."
          : "AI advisor, chatbot and AI agent for businesses 24/7. Automate customer service and grow sales."),
    "provider": {
      "@type": "Organization",
      "name": seoConfig.brand.name,
      "url": seoConfig.brand.url
    },
    "areaServed": {
      "@type": "Country",
      "name": areaServed === 'FI' ? "Finland" : areaServed
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "EUR"
    }
  };

  // Add alternate names if provided
  if (alternateNames && alternateNames.length > 0) {
    baseSchema.alternateName = alternateNames;
  }

  // Add keywords if provided
  if (keywords && keywords.length > 0) {
    baseSchema.keywords = keywords.join(', ');
  }

  return baseSchema;
}

/**
 * FAQ schema (JSON-LD)
 */
export function faqSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

export interface ProductSchemaProps {
  name: string;
  description: string;
  category?: string;
  brand?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
  language?: Language;
}

/**
 * Product schema (JSON-LD)
 */
export function productSchema({ name, description, category, brand, offers, language = 'fi' }: ProductSchemaProps) {
  const seoConfig = getSEOConfig(language);
  const baseSchema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": brand || seoConfig.brand.name
    }
  };

  if (category) {
    baseSchema.category = category;
  }

  if (offers) {
    baseSchema.offers = {
      "@type": "Offer",
      "price": offers.price || "0",
      "priceCurrency": offers.priceCurrency || "EUR",
      "availability": offers.availability || "https://schema.org/InStock"
    };
  }

  return baseSchema;
}

export interface ReviewSchemaProps {
  author: string;
  ratingValue: number;
  reviewBody?: string;
  datePublished?: string;
  language?: Language;
}

/**
 * Review/Rating schema (JSON-LD)
 */
export function reviewSchema({ author, ratingValue, reviewBody, datePublished, language = 'fi' }: ReviewSchemaProps) {
  const review: any = {
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": ratingValue,
      "bestRating": 5
    }
  };

  if (reviewBody) {
    review.reviewBody = reviewBody;
  }

  if (datePublished) {
    review.datePublished = datePublished;
  }

  return review;
}

/**
 * Safely stringifies JSON-LD data with error handling
 */
export function safeJsonLd(data: unknown): string {
  try {
    return JSON.stringify(data, null, 0);
  } catch (error) {
    console.error('Error stringifying JSON-LD:', error);
    return '{}';
  }
}

