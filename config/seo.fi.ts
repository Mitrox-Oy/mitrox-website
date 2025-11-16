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
    home: {
      title: "Mitrox – Teknologia, joka tuntuu luonnolliselta",
      description: "Mitrox – Suomalainen teknologiayritys, joka tarjoaa verkkosivut yritykselle, nettisivut yritykselle, tekoälyneuvojan ja tekoälybotin. Premium-design ja AI-ratkaisut 14 päivässä.",
      keywords: [
        "mitrox",
        "mitrox oy",
        "mitrox suomi",
        "verkkosivut yritykselle",
        "nettisivut yritykselle",
        "tekoälyneuvoja",
        "tekoälybotti",
        "chatbot",
        "suomalainen teknologiayritys",
        "premium design",
        "AI-ratkaisut"
      ],
      breadcrumbs: [
        { name: "Etusivu", href: "/" }
      ]
    },
    websites: {
      title: "Verkkosivut yrityksille 14 päivässä | Kotisivut | Mitrox",
      description: "Räätälöidyt verkkosivut yritykselle ja nettisivut yritykselle 14 päivässä. Hakukoneoptimointi, moderni design ja ylläpito. Aloita tänään!",
      keywords: [
        "verkkosivut",
        "verkkosivut yrityksille",
        "nettisivut yritykselle",
        "verkkosivut yritykselle",
        "nettisivut yritykselle suomessa",
        "verkkosivut yritykselle suomessa",
        "kotisivut",
        "verkkosivut suomessa",
        "verkkosivut suomeksi",
        "verkkosivut yrityksille suomessa",
        "yrityksen verkkosivut",
        "yrityksen kotisivut",
        "hakukoneoptimointi",
        "SEO",
        "verkkosivujen ylläpito",
        "verkkosivut pk-yrityksille",
        "yrityssivut"
      ],
      breadcrumbs: [
        { name: "Etusivu", href: "/" },
        { name: "Verkkosivut", href: "/websites" }
      ],
      serviceType: "ProfessionalService",
      serviceName: "Verkkosivut yrityksille"
    },
    advisor: {
      title: "Tekoälyneuvoja yrityksille 24/7 | Tekoälybotti | Chatbotti | Mitrox",
      description: "Tekoälyneuvoja, tekoälybotti ja chatbot yrityksille 24/7. Automatisoi asiakaspalvelu, kasvata myyntiä ja vapauta tiimisi. Suomenkielinen chatbotti ja tekoälyneuvoja.",
      keywords: [
        "tekoälyneuvoja",
        "tekoälyneuvoja yrityksille",
        "tekoälybotti",
        "tekoälybotti yrityksille",
        "chatbotti",
        "chatbot",
        "chatbotti yrityksille",
        "chatbot yrityksille",
        "chatbotti suomeksi",
        "tekoälybotti suomeksi",
        "AI-neuvoja",
        "AI asiakaspalvelija",
        "tekoäly asiakaspalvelija",
        "tekoäly neuvoja",
        "automaattinen asiakaspalvelu",
        "AI-agentti",
        "AI agent",
        "liidien keruu",
        "tekoäly chatbot",
        "suomenkielinen chatbot"
      ],
      breadcrumbs: [
        { name: "Etusivu", href: "/" },
        { name: "Tekoälyneuvoja", href: "/advisor" }
      ],
      serviceType: "SoftwareApplication",
      serviceName: "Tekoälybotti yrityksille"
    },
    about: {
      title: "Tietoa meistä – Mitrox Tiimi",
      description: "Mitrox – Suomalainen tiimi, joka yhdistää premium-designin ja tekoälyn. Missiomme: 14 päivän sivustot ja käytännön AI-ratkaisut.",
      keywords: [
        "mitrox",
        "mitrox oy",
        "mitrox suomi",
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
      title: "Kumppaniohjelma – Ansaitse suosittelemalla | Mitrox",
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
    },
    blog: {
      title: "Mitrox Blogi – Teknologia, tekoäly ja kasvu",
      description: "Mitroxin asiantuntijoiden näkemykset teknologiasta, tekoälystä, verkkosivuista ja liiketoiminnan kasvusta.",
      keywords: [
        "mitrox blogi",
        "tekoäly blogi",
        "verkkosivut blogi",
        "liiketoiminnan kasvu",
        "tekoäly yrityksille",
        "digitaalinen kasvu",
        "mitrox insights"
      ],
      breadcrumbs: [
        { name: "Etusivu", href: "/" },
        { name: "Blogi", href: "/blog" }
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
    affiliate: "Kumppaniohjelma",
    blog: "Blogi"
  }
} as const;

