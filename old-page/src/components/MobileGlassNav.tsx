import React from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";
import { Link, type Location, type NavigateFunction } from "react-router-dom";
import { getLocalizedPath, addLanguagePrefix } from "../utils/routing";

type NavItem = { label: string; href: string };
type SubItem = { label: string; href: string; subtitle: string };

type MobileGlassNavProps = {
  language: string;
  location: Location;
  navigate: NavigateFunction;
  navItems: NavItem[];
  productItems: SubItem[];
  resourcesItems: SubItem[];
  isProductPage: boolean;
  processId: string;
  pricingId: string;
  faqId: string;
  contactId: string;
  affiliateLabel: string;
  affiliateHref: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileProductsOpen: boolean;
  setMobileProductsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileResourcesOpen: boolean;
  setMobileResourcesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleScroll: (id: string) => void;
};

const MobileGlassNav: React.FC<MobileGlassNavProps> = ({
  language,
  location,
  navigate,
  navItems,
  productItems,
  resourcesItems,
  isProductPage,
  processId,
  pricingId,
  faqId,
  contactId,
  affiliateLabel,
  affiliateHref,
  open,
  setOpen,
  mobileProductsOpen,
  setMobileProductsOpen,
  mobileResourcesOpen,
  setMobileResourcesOpen,
  handleScroll,
}) => {
  return (
    <header
      role="banner"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 transition-all duration-500 pointer-events-none"
      style={{
        fontFamily:
          'GeistSans, "GeistSans Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        bottom: "calc(var(--safe-area-inset-bottom, 0px) + 6px)",
        paddingBottom: 0,
      }}
    >
      <div className="flex justify-between items-end px-4 py-2 gap-3">
        {/* Mobile logo - Left corner */}
        <Link
          to={getLocalizedPath("/", language)}
          className="glass glass-hover inline-flex items-center justify-center rounded-full shadow-2xl p-4 text-white hover:bg-white/5 transition-colors pointer-events-auto"
          aria-label={language === "fi" ? "Mitrox Solutions – etusivu" : "Mitrox Solutions – home"}
          onClick={(e) => {
            const homePath = addLanguagePrefix("/", language);
            if (location.pathname === homePath) {
              e.preventDefault();
              handleScroll("hero");
            }
          }}
        >
          <img src={logo} alt="Mitrox.io" className="h-6 w-auto object-contain" loading="eager" />
        </Link>

        {/* Mobile menu button - Right corner */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="glass glass-hover inline-flex h-14 w-14 items-center justify-center rounded-full shadow-2xl p-4 text-white hover:bg-white/5 transition-colors pointer-events-auto"
          aria-label={language === "fi" ? "Valikko" : "Menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu - Opens upward from right corner */}
      <div
        id="mobile-nav"
        className={[
          "absolute bottom-full right-4 mb-2 overflow-hidden transition-all duration-300 ease-out pointer-events-none origin-bottom-right",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2",
        ].join(" ")}
      >
        <div className="glass rounded-2xl shadow-2xl p-3.5 w-[15.4rem]">
          <div className="flex flex-col gap-0.5">
            {/* Mobile Etusivu - first */}
            {navItems[0] &&
              (() => {
                const item = navItems[0];
                const isPage = item.href.startsWith("/");
                const homePath = addLanguagePrefix("/", language);
                return (
                  <Link
                    key={item.href}
                    to={isPage ? item.href : homePath}
                    onClick={(e) => {
                      if (!isPage) {
                        e.preventDefault();
                        if (location.pathname === homePath) {
                          handleScroll(item.href);
                        } else {
                          navigate(homePath);
                        }
                      }
                      setOpen(false);
                    }}
                    className="block rounded-full px-4 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
                  >
                    {item.label}
                  </Link>
                );
              })()}

            {/* Mobile Products Dropdown - second */}
            <div>
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="w-full flex items-center justify-between rounded-full px-4 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
              >
                {language === "fi" ? "Tuotteet" : "Products"}
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileProductsOpen && (
                <div className="ml-4 mt-1 flex flex-col gap-0.5">
                  {productItems.map((product) => {
                    const isPage = product.href.startsWith("/");
                    return (
                      <Link
                        key={product.href}
                        to={product.href}
                        onClick={(e) => {
                          if (!isPage && location.pathname === "/") {
                            e.preventDefault();
                            handleScroll(product.href.replace("/#", ""));
                          }
                          setOpen(false);
                          setMobileProductsOpen(false);
                        }}
                        className="block rounded-full px-5 py-2 text-body-muted hover:text-white/80 hover:bg-white/10 transition-colors text-sm font-light"
                      >
                        {product.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Resources Dropdown - third */}
            <div>
              <button
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                className="w-full flex items-center justify-between rounded-full px-4 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
              >
                {language === "fi" ? "Resurssit" : "Resources"}
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileResourcesOpen && (
                <div className="ml-4 mt-1 flex flex-col gap-0.5">
                  {resourcesItems.map((resource) => {
                    const isPage = resource.href.startsWith("/");
                    return (
                      <Link
                        key={resource.href}
                        to={resource.href}
                        onClick={(e) => {
                          if (!isPage && location.pathname === "/") {
                            e.preventDefault();
                            handleScroll(resource.href.replace("/#", ""));
                          }
                          setOpen(false);
                          setMobileResourcesOpen(false);
                        }}
                        className="block rounded-full px-5 py-2 text-body-muted hover:text-white/80 hover:bg-white/10 transition-colors text-sm font-light"
                      >
                        {resource.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Product Page Navigation (Prosessi, Hinnasto, FAQ) - only on product pages */}
            {isProductPage && (
              <>
                <a
                  href={`#${processId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(processId);
                    setOpen(false);
                  }}
                  className="block rounded-full px-4 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
                >
                  {language === "fi" ? "Prosessi" : "Process"}
                </a>
                <a
                  href={`#${pricingId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(pricingId);
                    setOpen(false);
                  }}
                  className="block rounded-full px-4 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
                >
                  {language === "fi" ? "Hinnasto" : "Pricing"}
                </a>
                <a
                  href={`#${faqId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(faqId);
                    setOpen(false);
                  }}
                  className="block rounded-full px-4 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
                >
                  FAQ
                </a>
              </>
            )}

            {/* Mobile Rest of navigation items (Tietoa meistä) */}
            {navItems.slice(1).map((item) => {
              const isPage = item.href.startsWith("/");
              return (
                <Link
                  key={item.href}
                  to={isPage ? item.href : `/#${item.href}`}
                  onClick={(e) => {
                    if (!isPage) {
                      if (location.pathname === "/") {
                        e.preventDefault();
                        handleScroll(item.href);
                      }
                    }
                    setOpen(false);
                  }}
                  className="block rounded-full px-4 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Affiliate - fourth */}
            <Link
              to={affiliateHref}
              onClick={() => setOpen(false)}
              className="block rounded-full px-4 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
            >
              {affiliateLabel}
            </Link>

            {/* Mobile Contact - fifth */}
            <a
              href={`#${contactId}`}
              onClick={(e) => {
                const currentPath = location.pathname.replace(/^\/[^/]+/, "") || "/";
                if (currentPath === "/" || currentPath === `/${language}`) {
                  e.preventDefault();
                  handleScroll(contactId);
                }
                setOpen(false);
              }}
              className="block rounded-full px-4 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
            >
              {language === "fi" ? "Ota yhteyttä" : "Contact us"}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileGlassNav;
