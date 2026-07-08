import { locales, type Locale } from "./i18n/config";
import { ROUTE_SLUGS, localizedPath } from "./routing";

export const SITE_URL = "https://mitrox.io";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localizedAbsoluteUrl(routeKey: keyof typeof ROUTE_SLUGS, locale: Locale) {
  return absoluteUrl(localizedPath(routeKey, locale));
}

/** Language alternates map for a route, keyed the way Next.js metadata/sitemap APIs expect. */
export function languageAlternates(routeKey: keyof typeof ROUTE_SLUGS) {
  const entries = locales.map((locale) => [locale, localizedAbsoluteUrl(routeKey, locale)] as const);
  return Object.fromEntries(entries) as Record<Locale, string>;
}
