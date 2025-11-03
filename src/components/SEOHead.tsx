import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Mitrox Oy - Teknologia, joka tuntuu luonnolliselta | Suomalainen teknologiayritys",
  description = "Mitrox muuttaa monimutkaisen yksinkertaiseksi ja tehokkaaksi. Tarjoamme modernit teknologiaratkaisut: ensiluokkaiset sivustot ja Mitrox AI Advisor -palvelun. Suomalainen teknologiayritys, joka luo juuri sinulle sopivat ratkaisut.",
  keywords = "mitrox ai advisor, ai advisor, tekoälyneuvoja, asiakaspalvelu, automaatio, suomalainen, tekoäly, liiketoiminta, b2b myynti, premium ai",
  image = "https://mitrox.io/og-image.jpg",
  url = "https://mitrox.io/",
  type = "website",
  noIndex = false
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Mitrox Oy" />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="fi_FI" />
      <meta property="og:site_name" content="Mitrox Oy" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#0b0a0b" />
      <meta name="msapplication-TileColor" content="#0b0a0b" />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
};

export default SEOHead;