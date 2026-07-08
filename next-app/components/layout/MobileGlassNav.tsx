import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/routing";
import GlassPanel from "@/components/ui/GlassPanel";

export default function MobileGlassNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    { label: dict.nav.home, href: `${localizedPath("home", locale)}#hero` },
    { label: dict.nav.about, href: `${localizedPath("home", locale)}#story` },
    { label: dict.nav.contact, href: `${localizedPath("home", locale)}#contact` },
    { label: dict.nav.careers, href: `${localizedPath("home", locale)}#careers` },
  ];

  return (
    <nav
      className="md:hidden fixed inset-x-0 z-50 px-4"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
    >
      <GlassPanel className="mx-auto max-w-md rounded-full px-2 py-2">
        <div className="flex items-center justify-between">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex-1 text-center text-xs text-white/80 hover:text-white transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </GlassPanel>
    </nav>
  );
}
