import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getSEOConfig, Language } from '../../lib/seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
  language?: Language;
  locale?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  noIndex = false,
  language = 'fi',
  locale
}) => {
  const seoConfig = getSEOConfig(language);
  
  // Use provided values or fall back to language-specific defaults
  const finalTitle = title || (language === 'fi' 
    ? "Mitrox – Teknologia, joka tuntuu luonnolliselta"
    : "Mitrox – Technology That Feels Effortless");
  
  const finalDescription = description || (language === 'fi'
    ? "Mitrox muuttaa monimutkaisen yksinkertaiseksi ja tehokkaaksi. Tarjoamme modernit teknologiaratkaisut: ensiluokkaiset sivustot ja Mitrox AI Advisor -palvelun. Suomalainen teknologiayritys, joka luo juuri sinulle sopivat ratkaisut."
    : "Mitrox transforms complex into simple and efficient. We offer modern technology solutions: premium websites and Mitrox AI Advisor service. A Finnish technology company creating the right solutions for you.");
  
  const finalKeywords = keywords || (language === 'fi'
    ? "mitrox ai advisor, ai advisor, tekoälyneuvoja, asiakaspalvelu, automaatio, suomalainen, tekoäly, liiketoiminta, b2b myynti, premium ai"
    : "mitrox ai advisor, ai advisor, ai chatbot, customer service, automation, finnish, artificial intelligence, business, b2b sales, premium ai");
  
  const finalImage = image || seoConfig.defaultImage;
  const finalUrl = url || seoConfig.brand.url;
  const finalLocale = locale || (language === 'fi' ? 'fi_FI' : 'en_US');
  const ogSiteName = seoConfig.brand.name;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={seoConfig.brand.name} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={finalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />
      <meta property="og:locale" content={finalLocale} />
      <meta property="og:site_name" content={ogSiteName} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#0b0a0b" />
      <meta name="msapplication-TileColor" content="#0b0a0b" />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
};

export default SEOHead;