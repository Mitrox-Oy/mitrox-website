import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/routing";
import GlassPanel from "@/components/ui/GlassPanel";
import MobileGlassNav from "@/components/layout/MobileGlassNav";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    { label: dict.nav.home, href: `${localizedPath("home", locale)}#hero` },
    { label: dict.nav.about, href: `${localizedPath("home", locale)}#story` },
    { label: dict.nav.contact, href: `${localizedPath("home", locale)}#contact` },
    { label: dict.nav.careers, href: `${localizedPath("home", locale)}#careers` },
  ];

  return (
    <>
      <header className="hidden md:block fixed inset-x-0 top-0 z-50 py-6 px-4">
        <div className="mx-auto max-w-5xl flex justify-center">
          <GlassPanel hover className="rounded-full px-6 py-3">
            <nav className="flex items-center gap-6">
              <Link href={`${localizedPath("home", locale)}#hero`} className="flex items-center gap-2 shrink-0">
                <Image src="/logo-icon.png" alt="Mitrox" width={26} height={21} className="h-[21px] w-auto object-contain" priority />
                <span className="font-semibold tracking-tight text-white">Mitrox</span>
              </Link>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </GlassPanel>
        </div>
      </header>
      <MobileGlassNav locale={locale} dict={dict} />
    </>
  );
}
