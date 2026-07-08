"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath, switchLocalePath } from "@/lib/routing";
import GlassPanel from "@/components/ui/GlassPanel";

const LinkedInIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const otherLocale: Locale = locale === "en" ? "fi" : "en";
  const otherLocalePath = switchLocalePath(pathname, locale, otherLocale);

  return (
    <footer className="mt-auto px-4 pt-4 pb-28 md:pb-10">
      <div className="mx-auto max-w-6xl">
        <GlassPanel hover className="rounded-3xl px-6 py-5 sm:px-10">
          <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left lg:whitespace-nowrap">
            <Link href={localizedPath("home", locale)} className="flex items-center gap-2 shrink-0">
              <Image src="/logo-icon.png" alt="Mitrox" width={22} height={18} className="h-[18px] w-auto object-contain" />
              <span className="font-semibold text-white">Mitrox</span>
            </Link>

            <div className="flex flex-col sm:flex-row items-center gap-x-3 gap-y-1 text-xs text-white/55 lg:flex-nowrap">
              <a href="mailto:info@mitrox.io" className="hover:text-white transition-colors">
                info@mitrox.io
              </a>
              <span className="hidden sm:inline">•</span>
              <span>
                © {year} Mitrox Oy. {dict.footer.allRightsReserved}
              </span>
              <span className="hidden sm:inline">•</span>
              <span>{dict.footer.businessId}</span>
              <span className="hidden sm:inline">•</span>
              <Link href={localizedPath("privacy-policy", locale)} className="hover:text-white transition-colors">
                {dict.footer.privacyPolicy}
              </Link>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link
                href={otherLocalePath}
                className="text-xs text-white/55 hover:text-white transition-colors uppercase tracking-wide"
                aria-label={dict.footer.language}
              >
                {otherLocale}
              </Link>
              <a
                href="https://www.linkedin.com/company/mitrox/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/55 hover:text-white transition-colors"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </GlassPanel>
      </div>
    </footer>
  );
}
