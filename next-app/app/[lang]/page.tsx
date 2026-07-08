import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Ambition from "@/components/sections/Ambition";
import Process from "@/components/sections/Process";
import ProjectTeaser from "@/components/sections/ProjectTeaser";
import Services from "@/components/sections/Services";
import FAQ from "@/components/sections/FAQ";
import ContactGeneral from "@/components/sections/ContactGeneral";
import Careers from "@/components/sections/Careers";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      {/* Each narrative section owns its own sticky CinematicScene — a scene
          timeline of background/foreground layers, not a stacked document. */}
      <Hero dict={dict} />
      <Story dict={dict} />
      <Ambition dict={dict} />
      <Process dict={dict} />
      <ProjectTeaser dict={dict} />

      {/* Service-oriented block: Mitrox also takes on custom software work
          alongside its own platform — sits ahead of the contact section it
          leads into. */}
      <Services dict={dict} />

      {/* Calmer, lighter-weight scenes for the secondary sections. */}
      <FAQ dict={dict} />
      <ContactGeneral dict={dict} />
      <Careers dict={dict} />
    </>
  );
}
