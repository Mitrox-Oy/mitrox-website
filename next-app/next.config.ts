import path from "path";
import type { NextConfig } from "next";

const removedRoutes = [
  "/fi/verkkosivut",
  "/en/websites",
  "/fi/ai-neuvonantaja",
  "/en/ai-advisor",
  "/fi/kumppaniohjelma",
  "/en/affiliate",
  "/fi/uutiset",
  "/en/news",
  "/fi/dokumentaatio",
  "/en/docs",
  "/fi/dokumentaatio/ai-advisor",
  "/en/docs/ai-advisor",
  "/fi/dokumentaatio/ai-advisor/wordpress",
  "/en/docs/ai-advisor/wordpress",
  "/fi/dokumentaatio/ai-advisor/wix",
  "/en/docs/ai-advisor/wix",
  "/fi/dokumentaatio/ai-advisor/webflow",
  "/en/docs/ai-advisor/webflow",
  "/fi/dokumentaatio/ai-advisor/shopify",
  "/en/docs/ai-advisor/shopify",
  "/fi/dokumentaatio/ai-advisor/squarespace",
  "/en/docs/ai-advisor/squarespace",
  "/fi/dokumentaatio/ai-advisor/netlify",
  "/en/docs/ai-advisor/netlify",
  "/fi/dokumentaatio/ai-advisor/react",
  "/en/docs/ai-advisor/react",
  "/fi/dokumentaatio/ai-advisor/html",
  "/en/docs/ai-advisor/html",
  "/live-demo",
  "/fi/live-demo",
  "/en/live-demo",
  "/admin",
  "/fi/tiimi",
  "/en/about",
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return removedRoutes.map((source) => {
      const lang = source.startsWith("/fi") ? "fi" : "en";
      return {
        source,
        destination: `/${lang}`,
        permanent: true,
      };
    });
  },
};

export default nextConfig;
