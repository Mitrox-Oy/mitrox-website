export const locales = ["en", "fi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fi";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
