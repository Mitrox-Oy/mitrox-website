/**
 * English SEO Configuration
 * 
 * Centralized constants for English SEO keywords, meta content, and structured data.
 * Used when VITE_SEO_V2 is enabled.
 */

export const SEO_CONFIG = {
  brand: {
    name: "Mitrox Oy",
    nameShort: "Mitrox",
    url: "https://mitrox.io",
    logo: "https://mitrox.io/logo.png",
    description: "Finnish technology company combining premium design and AI.",
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
      title: "Websites for Business in 14 Days | Company Websites | Mitrox",
      description: "Custom business websites in 14 days. SEO optimization, modern design, and maintenance. Start today!",
      keywords: [
        "websites",
        "business websites",
        "company websites",
        "company website",
        "corporate websites",
        "corporate website",
        "websites finland",
        "website builder finland",
        "business website finland",
        "search engine optimization",
        "SEO",
        "website maintenance",
        "custom websites",
        "professional websites"
      ],
      breadcrumbs: [
        { name: "Home", href: "/" },
        { name: "Websites", href: "/websites" }
      ],
      serviceType: "ProfessionalService",
      serviceName: "Business Websites"
    },
    advisor: {
      title: "AI Advisor for Business 24/7 | AI Agent | Chatbot | Mitrox",
      description: "AI advisor and chatbot for businesses 24/7. Automate customer service, grow sales, and free your team. AI Agent and business chatbot solution.",
      keywords: [
        "AI advisor",
        "ai advisor",
        "AI advisor for business",
        "AI Agent",
        "AI agent",
        "chatbot",
        "chatbot for business",
        "business chatbot",
        "ai chatbot for business",
        "AI chatbot",
        "customer service chatbot",
        "AI customer service",
        "automated customer service",
        "AI assistant",
        "lead generation",
        "chatbot finland"
      ],
      breadcrumbs: [
        { name: "Home", href: "/" },
        { name: "AI Advisor", href: "/advisor" }
      ],
      serviceType: "SoftwareApplication",
      serviceName: "AI Advisor for Businesses"
    },
    about: {
      title: "About Us – Mitrox Team",
      description: "Meet the Mitrox team. Finnish specialists creating premium websites and AI solutions. 14-day delivery, quality guaranteed.",
      keywords: [
        "mitrox",
        "finnish technology company",
        "AI",
        "websites",
        "premium design"
      ],
      breadcrumbs: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" }
      ]
    },
    affiliate: {
      title: "Affiliate Program – Earn by Referring | Mitrox",
      description: "Earn free months by referring Mitrox services. Clear commission model, easy signup. Both you and customers benefit.",
      keywords: [
        "affiliate program",
        "affiliate",
        "websites",
        "AI solutions",
        "commission model"
      ],
      breadcrumbs: [
        { name: "Home", href: "/" },
        { name: "Affiliate Program", href: "/affiliate" }
      ]
    }
  },

  // Default image for OG tags
  defaultImage: "https://mitrox.io/og-image.jpg",
  defaultImageWidth: 1200,
  defaultImageHeight: 630,

  // Locale
  defaultLocale: "en-US",
  alternateLocales: ["fi-FI"],

  // Common English anchor texts for internal linking
  anchorTexts: {
    home: "Home",
    websites: "Websites",
    advisor: "AI Advisor",
    about: "About Us",
    affiliate: "Affiliate Program"
  }
} as const;

