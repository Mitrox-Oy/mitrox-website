import type { Metadata } from "next";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { notFound, redirect } from "next/navigation";
import { ROUTE_SLUGS, localizedPath } from "@/lib/routing";
import { localizedAbsoluteUrl, languageAlternates } from "@/lib/seo";
import PrivacyContent from "@/components/sections/PrivacyContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.meta.privacyTitle,
    description: dict.meta.privacyDescription,
    alternates: {
      canonical: localizedAbsoluteUrl("privacy-policy", lang as Locale),
      languages: languageAlternates("privacy-policy"),
    },
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;

  if (ROUTE_SLUGS["privacy-policy"][locale] !== "privacy-policy") {
    redirect(localizedPath("privacy-policy", locale));
  }

  const dict = await getDictionary(locale);
  return <PrivacyContent dict={dict} locale={locale} />;
}
