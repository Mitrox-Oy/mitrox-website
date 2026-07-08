import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { ROUTE_SLUGS } from "@/lib/routing";
import { SITE_URL, languageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  for (const locale of locales) {
    for (const routeKey of Object.keys(ROUTE_SLUGS)) {
      const slug = ROUTE_SLUGS[routeKey][locale];
      entries.push({
        url: `${SITE_URL}/${locale}${slug ? `/${slug}` : ""}`,
        lastModified,
        alternates: {
          languages: languageAlternates(routeKey),
        },
      });
    }
  }

  return entries;
}
