import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData: React.FC = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mitrox.io",
    "url": "https://mitrox.io",
    "logo": "https://mitrox.io/logo.png",
    "description": "Suomalainen Mitrox AI Advisor -ratkaisu yrityksille. Automatisoi asiakaspalvelusi ja kasvata liiketoimintaasi 24/7 älykkäällä neuvojalla.",
    "foundingDate": "2025",
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
      "addressCountry": "FI"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+358",
      "contactType": "customer service",
      "email": "info@mitrox.io",
      "availableLanguage": ["Finnish", "English"]
    },
    "sameAs": [
      "https://www.instagram.com/mitrox.io/",
      "https://www.youtube.com/@Mitroxio"
    ],
    "offers": {
      "@type": "Offer",
      "name": "Mitrox AI Advisor -palvelut",
      "description": "Älykäs Mitrox AI Advisor B2B-yrityksille",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mitrox.io",
    "url": "https://mitrox.io",
    "description": "Mitrox AI Advisor joka kasvattaa liiketoimintaasi",
    "inLanguage": "fi",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mitrox.io/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mitrox AI Advisor",
    "description": "Mitrox AI Advisor -ratkaisu yrityksille – automatisoi asiakaspalvelusi ja kasvata liiketoimintaasi",
    "provider": {
      "@type": "Organization",
      "name": "Mitrox.io"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Finland"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mitrox AI Advisor -paketit",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Starter Advisor"
          },
          "price": "69",
          "priceCurrency": "EUR",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "69",
            "priceCurrency": "EUR",
            "billingIncrement": "1",
            "unitCode": "MON"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pro Advisor"
          },
          "price": "103",
          "priceCurrency": "EUR",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "103",
            "priceCurrency": "EUR",
            "billingIncrement": "1",
            "unitCode": "MON"
          }
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Mitä Mitrox AI Advisor maksaa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Starter Advisor maksaa alkaen 69€/kk ja Pro Advisor alkaen 103€/kk. Tarjoamme myös 14 päivän maksuttoman kokeilujakson."
        }
      },
      {
        "@type": "Question",
        "name": "Kuinka nopeasti Mitrox AI Advisor saadaan käyttöön?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mitrox AI Advisor voidaan ottaa käyttöön nopeasti. Prosessi sisältää 30 minuutin ideakartoituksen, toteutuksen, integraatiot ja käyttöönoton."
        }
      },
      {
        "@type": "Question",
        "name": "Onko Mitrox AI Advisor suomenkielinen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kyllä, kaikki Mitrox AI Advisor -paketit tukevat suomea. Pro Advisor -paketti tukee myös englantia (FI/EN)."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;