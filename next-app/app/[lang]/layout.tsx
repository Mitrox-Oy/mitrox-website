import type { Metadata } from "next";
import { Geist, Bricolage_Grotesque } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL, localizedAbsoluteUrl, languageAlternates, absoluteUrl } from "@/lib/seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GalaxyBackdrop from "@/components/three/GalaxyBackdrop";
import Preloader from "@/components/three/Preloader";
import { DeviceTierProvider } from "@/components/three/DeviceTierProvider";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import PrivacyConsent from "@/components/PrivacyConsent";
import LanguagePopup from "@/components/LanguagePopup";
import JsonLd from "@/components/seo/JsonLd";

const OG_LOCALE: Record<Locale, string> = { en: "en_US", fi: "fi_FI" };

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// Condensed, confident display sans for headings — closer to the Igloo.inc /
// Rockstar style than the default UI font. Body copy stays on Geist for
// neutral legibility.
const displayFont = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"] });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const alternateLocale: Locale = locale === "en" ? "fi" : "en";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.homeTitle,
      template: "%s | Mitrox",
    },
    description: dict.meta.homeDescription,
    icons: {
      icon: "/favicon.ico",
      apple: "/favicon-96x96.png",
    },
    alternates: {
      canonical: localizedAbsoluteUrl("home", locale),
      languages: {
        ...languageAlternates("home"),
        "x-default": localizedAbsoluteUrl("home", "fi"),
      },
    },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      url: localizedAbsoluteUrl("home", locale),
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[alternateLocale],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mitrox Oy",
    legalName: "Mitrox Oy",
    url: localizedAbsoluteUrl("home", locale),
    logo: absoluteUrl("/mitroxlogo.png"),
    foundingDate: "2025",
    email: "info@mitrox.io",
    sameAs: ["https://www.linkedin.com/company/mitrox/"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: dict.meta.siteName,
    url: localizedAbsoluteUrl("home", locale),
    inLanguage: locale,
  };

  return (
    <html lang={locale} className={`${geistSans.variable} ${displayFont.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased font-sans">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <DeviceTierProvider>
          <GalaxyBackdrop />
          <Preloader />
        </DeviceTierProvider>
        <SmoothScrollProvider />
        <Header locale={locale} dict={dict} />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer locale={locale} dict={dict} />
        <PrivacyConsent locale={locale} dict={dict} />
        <LanguagePopup locale={locale} dict={dict} />
      </body>
    </html>
  );
}
