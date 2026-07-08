import type { Locale } from "./i18n/config";

export const ROUTE_SLUGS: Record<string, Record<Locale, string>> = {
  home: { en: "", fi: "" },
  "privacy-policy": { en: "privacy-policy", fi: "tietosuojaseloste" },
};

export function localizedPath(routeKey: keyof typeof ROUTE_SLUGS, locale: Locale) {
  const slug = ROUTE_SLUGS[routeKey][locale];
  return `/${locale}${slug ? `/${slug}` : ""}`;
}

/** Finds the route key whose slug (for the given locale) matches a pathname segment. */
function findRouteKeyFromSlug(slug: string, locale: Locale) {
  return (Object.keys(ROUTE_SLUGS) as (keyof typeof ROUTE_SLUGS)[]).find(
    (key) => ROUTE_SLUGS[key][locale] === slug
  );
}

/**
 * Given the current pathname (e.g. "/en/privacy-policy") and its locale, returns the
 * equivalent path in the target locale (e.g. "/fi/tietosuojaseloste") — falls back to
 * that locale's home page if the current route has no mapped equivalent.
 */
export function switchLocalePath(pathname: string, currentLocale: Locale, targetLocale: Locale) {
  const withoutLocale = pathname.replace(new RegExp(`^/${currentLocale}/?`), "");
  const routeKey = findRouteKeyFromSlug(withoutLocale, currentLocale) ?? "home";
  return localizedPath(routeKey, targetLocale);
}
