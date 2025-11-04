/**
 * Finnish SEO Configuration
 * 
 * Centralized constants for Finnish SEO keywords, meta content, and structured data.
 * Used when VITE_SEO_V2 is enabled.
 */

export const SEO_CONFIG = {
  brand: {
    name: "Mitrox Oy",
    nameShort: "Mitrox",
    url: "https://mitrox.io",
    logo: "https://mitrox.io/logo.png",
    description: "Suomalainen teknologiayritys, joka yhdistää premium-designin ja tekoälyn.",
    email: "info@mitrox.io",
    phone: "+358",
    foundingDate: "2024",
    address: {
      country: "FI",
      countryName: "Finland"
    },
    social: {
      instagram: "https://www.instagram.com/mitrox.io/",
      youtube: "https://www.youtube.com/@Mitroxio"
    }
  },

  // Page-specific meta and keywords
  pages: {
    websites: {
      title: "Verkkosivut yrityksille – Mitrox",
      description: "Räätälöidyt ja nopeat verkkosivut suomalaisille PK-yrityksille. Toimitus 7 päivässä, hakukoneoptimointi ja ylläpito.",
      keywords: [
        "verkkosivut yrityksille",
        "kotisivut",
        "verkkosivut suomessa",
        "yrityksen verkkosivut",
        "hakukoneoptimointi",
        "SEO",
        "verkkosivujen ylläpito"
      ],
      breadcrumbs: [
        { name: "Etusivu", href: "/" },
        { name: "Verkkosivut", href: "/websites" }
      ],
      serviceType: "ProfessionalService",
      serviceName: "Verkkosivut yrityksille"
    },
    advisor: {
      title: "Tekoälybotti yrityksille – Mitrox Advisor",
      description: "Automatisoi asiakaspalvelu ja liidien keruu. Suomenkielinen AI-agentti 24/7. Demo saatavilla.",
      keywords: [
        "tekoälybotti yrityksille",
        "chatbot yrityksille",
        "AI asiakaspalvelija",
        "tekoäly neuvoja",
        "automaattinen asiakaspalvelu",
        "AI-agentti",
        "liidien keruu"
      ],
      breadcrumbs: [
        { name: "Etusivu", href: "/" },
        { name: "Tekoälybotti", href: "/advisor" }
      ],
      serviceType: "SoftwareApplication",
      serviceName: "Tekoälybotti yrityksille"
    },
    about: {
      title: "Tietoa meistä – Mitrox | Mitrox Tiimi",
      description: "Suomalainen tiimi, joka yhdistää premium-designin ja tekoälyn. Missiomme: 7 päivän sivustot ja käytännön AI-ratkaisut.",
      keywords: [
        "mitrox",
        "suomalainen teknologiayritys",
        "tekoäly",
        "verkkosivut",
        "premium design"
      ],
      breadcrumbs: [
        { name: "Etusivu", href: "/" },
        { name: "Tietoa meistä", href: "/about" }
      ]
    },
    affiliate: {
      title: "Kumppaniohjelma – Mitrox",
      description: "Ansaitse suosittelemalla Mitroxin verkkosivuja ja tekoälyratkaisuja. Selkeä palkkiomalli ja tuki.",
      keywords: [
        "kumppaniohjelma",
        "affiliate",
        "verkkosivut",
        "tekoälyratkaisut",
        "palkkiomalli"
      ],
      breadcrumbs: [
        { name: "Etusivu", href: "/" },
        { name: "Kumppaniohjelma", href: "/affiliate" }
      ]
    }
  },

  // Default image for OG tags
  defaultImage: "https://mitrox.io/og-image.jpg",
  defaultImageWidth: 1200,
  defaultImageHeight: 630,

  // Locale
  defaultLocale: "fi-FI",
  alternateLocales: ["en-US"],

  // Common Finnish anchor texts for internal linking
  anchorTexts: {
    home: "Etusivu",
    websites: "Verkkosivut",
    advisor: "Tekoälybotti",
    about: "Tietoa meistä",
    affiliate: "Kumppaniohjelma"
  }
} as const;

