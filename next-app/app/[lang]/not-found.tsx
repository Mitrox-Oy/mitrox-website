"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, hasLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/routing";
import GlassPanel from "@/components/ui/GlassPanel";
import en from "@/lib/i18n/dictionaries/en.json";
import fi from "@/lib/i18n/dictionaries/fi.json";

const dictionaries = { en, fi };

export default function NotFound() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale = hasLocale(segment) ? segment : defaultLocale;
  const dict = dictionaries[locale];

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-24">
      <GlassPanel className="w-full max-w-md rounded-2xl px-6 py-8 text-center">
        <h1 className="text-2xl font-semibold text-white">{dict.notFound.title}</h1>
        <p className="mt-3 text-sm text-white/60">{dict.notFound.description}</p>
        <Link
          href={localizedPath("home", locale)}
          className="mt-6 inline-block px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
        >
          {dict.notFound.cta}
        </Link>
      </GlassPanel>
    </div>
  );
}
