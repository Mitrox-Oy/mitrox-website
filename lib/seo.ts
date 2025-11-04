/**
 * SEO Utilities
 * 
 * Helper functions for building meta tags and JSON-LD structured data.
 * Used when VITE_SEO_V2 is enabled.
 */

import { SEO_CONFIG } from '../config/seo.fi';

export interface MetaProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  locale?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export interface BreadcrumbSegment {
  name: string;
  href: string;
}

export interface ServiceSchemaProps {
  type: 'websites' | 'advisor';
  name: string;
  areaServed?: string;
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
  locale = SEO_CONFIG.defaultLocale,
  keywords,
  noIndex = false
}: MetaProps) {
  const baseUrl = SEO_CONFIG.brand.url;
  const fullUrl = `${baseUrl}${path}`;
  const ogImage = image || SEO_CONFIG.defaultImage;

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
    noIndex
  };
}

/**
 * Generates canonical URL
 */
export function canonical(path: string): string {
  return `${SEO_CONFIG.brand.url}${path}`;
}

/**
 * Generates alternate language URLs
 */
export function alternates(path: string): Array<{ hreflang: string; href: string }> {
  const baseUrl = SEO_CONFIG.brand.url;
  return SEO_CONFIG.alternateLocales.map(locale => ({
    hreflang: locale,
    href: `${baseUrl}${path}`
  }));
}

/**
 * Organization schema (JSON-LD)
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SEO_CONFIG.brand.name,
    "url": SEO_CONFIG.brand.url,
    "logo": SEO_CONFIG.brand.logo,
    "description": SEO_CONFIG.brand.description,
    "foundingDate": SEO_CONFIG.brand.foundingDate,
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
      "addressCountry": SEO_CONFIG.brand.address.country
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": SEO_CONFIG.brand.phone,
      "contactType": "customer service",
      "email": SEO_CONFIG.brand.email,
      "availableLanguage": ["Finnish", "English"]
    },
    "sameAs": [
      SEO_CONFIG.brand.social.instagram,
      SEO_CONFIG.brand.social.youtube
    ]
  };
}

/**
 * Website schema (JSON-LD)
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SEO_CONFIG.brand.name,
    "url": SEO_CONFIG.brand.url,
    "description": SEO_CONFIG.brand.description,
    "inLanguage": "fi",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SEO_CONFIG.brand.url}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Breadcrumb schema (JSON-LD)
 */
export function breadcrumbSchema(segments: BreadcrumbSegment[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": segments.map((segment, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": segment.name,
      "item": `${SEO_CONFIG.brand.url}${segment.href}`
    }))
  };
}

/**
 * Service schema (JSON-LD)
 */
export function serviceSchema({ type, name, areaServed = 'FI' }: ServiceSchemaProps) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type === 'websites' ? "ProfessionalService" : "Service",
    "name": name,
    "provider": {
      "@type": "Organization",
      "name": SEO_CONFIG.brand.name,
      "url": SEO_CONFIG.brand.url
    },
    "areaServed": {
      "@type": "Country",
      "name": areaServed === 'FI' ? "Finland" : areaServed
    }
  };

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

