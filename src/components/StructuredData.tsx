import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData: React.FC = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mitrox.io",
    "url": "https://mitrox.io",
    "logo": "https://mitrox.io/logo.png",
    "description": "Suomalainen tekoälybot-ratkaisu yrityksille. Automatisoi asiakaspalvelusi ja kasvata liiketoimintaasi 24/7 älykkäillä chatbot-ratkaisuilla.",
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
      "name": "Tekoälybot-palvelut",
      "description": "Chatbot-ratkaisut yrityksille",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mitrox.io",
    "url": "https://mitrox.io",
    "description": "Tekoälybotti joka kasvattaa liiketoimintaasi",
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
    "name": "Tekoälybot-palvelut",
    "description": "Chatbot-ratkaisut yrityksille - automatisoi asiakaspalvelusi ja kasvata liiketoimintaasi",
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
      "name": "Tekoälybot-paketit",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Starter Bot"
          },
          "price": "79",
          "priceCurrency": "EUR",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "79",
            "priceCurrency": "EUR",
            "billingIncrement": "1",
            "unitCode": "MON"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pro Bot"
          },
          "price": "129",
          "priceCurrency": "EUR",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "129",
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
        "name": "Mitä tekoälybot maksaa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Starter Bot maksaa 79€/kk ja Pro Bot 129€/kk. Tarjoamme myös 14 päivän maksuttoman kokeilujakson."
        }
      },
      {
        "@type": "Question",
        "name": "Kuinka nopeasti tekoälybot saadaan käyttöön?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tekoälybot voidaan ottaa käyttöön nopeasti. Prosessi sisältää 30 minuutin ideakartoituksen, toteutuksen, integraatiot ja käyttöönoton."
        }
      },
      {
        "@type": "Question",
        "name": "Onko tekoälybot suomenkielinen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kyllä, kaikki bottimme tukevat suomea. Pro Bot -paketti tukee myös englantia (FI/EN)."
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