// src/components/Header.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Menu, X, ArrowRight, ChevronDown, Globe2, Sparkles } from "lucide-react";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedPath, addLanguagePrefix } from "../utils/routing";
import { getFullLocalizedPath } from "../utils/routeMapping";
import { useLocalizedSectionId } from "../hooks/useLocalizedSectionId";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const productsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const processId = useLocalizedSectionId("process");
  const pricingId = useLocalizedSectionId("pricing");
  const faqId = useLocalizedSectionId("faq");
  const contactId = useLocalizedSectionId("contact");

  const navItems = useMemo(
    () => [
      { label: language === "fi" ? "Etusivu" : "Home", href: "hero" },
      { label: language === "fi" ? "Tietoa meistä" : "About Us", href: getFullLocalizedPath("about", language) },
    ],
    [language]
  );

  const productItems = useMemo(
    () => [
      {
        label: "Mitrox Sites",
        href: getFullLocalizedPath("websites", language),
        subtitle: language === "fi" ? "Suunniteltu yrityksesi menestykseen" : "Designed for your business success",
      },
      {
        label: "Mitrox AI Advisor",
        href: getFullLocalizedPath("advisor", language),
        subtitle: language === "fi" ? "Älykäs kasvukumppanisi" : "Your intelligent growth partner",
      },
    ],
    [language]
  );

  const [sitesItem, advisorItem] = productItems;

  // Check if current page is a product page (websites or advisor) using localized paths
  const isProductPage = location.pathname.includes("/verkkosivut") || 
                        location.pathname.includes("/websites") ||
                        location.pathname.includes("/ai-neuvonantaja") ||
                        location.pathname.includes("/ai-advisor");

  const affiliateLabel = language === "fi" ? "Affiliate-ohjelma" : "Affiliate program";

  // Handle products dropdown with delay
  const handleProductsMouseEnter = () => {
    if (productsTimeoutRef.current) {
      clearTimeout(productsTimeoutRef.current);
      productsTimeoutRef.current = null;
    }
    setProductsOpen(true);
  };

  const handleProductsMouseLeave = () => {
    productsTimeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
    }, 150); // Small delay to allow moving to dropdown
  };

  // smooth scroll
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (tries < 20) {
        tries += 1;
        setTimeout(tryScroll, 50);
      }
    };
    requestAnimationFrame(tryScroll);
  }, [location.pathname, location.hash]);

  const handleScroll = (id: string) => {
    // Update URL hash while preserving current pathname
    const currentPath = window.location.pathname;
    window.history.pushState(null, '', `${currentPath}#${id}`);
    
    // Scroll to element
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (productsTimeoutRef.current) {
        clearTimeout(productsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <header
        role="banner"
        className="hidden md:block fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          fontFamily: 'GeistSans, "GeistSans Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-black/40 backdrop-blur-xl backdrop-saturate-150 shadow-2xl px-8 py-4">
              <div className="flex items-center gap-8">
                {/* Logo */}
                <Link
                  to={getLocalizedPath("/", language)}
                  className="flex items-center select-none"
                  aria-label={language === "fi" ? "Mitrox Solutions – etusivu" : "Mitrox Solutions – home"}
                  onClick={(e) => {
                    const homePath = addLanguagePrefix("/", language);
                    if (location.pathname === homePath) {
                      e.preventDefault();
                      handleScroll("hero");
                    }
                    setOpen(false);
                  }}
                >
                  <img
                    src={logo}
                    alt="Mitrox Oy"
                    className="h-8 w-auto object-contain"
                    loading="eager"
                  />
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-2">
                  {/* Etusivu - first */}
                  {navItems[0] && (() => {
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
                              // Already on home page, just scroll to hero
                              handleScroll(item.href);
                            } else {
                              // Navigate to home page
                              navigate(homePath);
                            }
                          }
                          setOpen(false);
                        }}
                        className="text-white/80 hover:text-white transition-colors text-base font-light px-5 py-2.5 rounded-full hover:bg-white/10"
                      >
                        {item.label}
                      </Link>
                    );
                  })()}

                  {/* Products Dropdown - second (always visible) */}
                  <div
                    className="relative"
                    onMouseEnter={handleProductsMouseEnter}
                    onMouseLeave={handleProductsMouseLeave}
                  >
                    <button
                      className="text-white/80 hover:text-white transition-colors text-base font-light px-5 py-2.5 rounded-full hover:bg-white/10 flex items-center gap-1"
                      aria-expanded={productsOpen}
                      aria-haspopup="true"
                    >
                      {language === "fi" ? "Tuotteet" : "Products"}
                      <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {productsOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-black/95 backdrop-blur-sm ring-1 ring-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.35)] overflow-hidden z-50">
                        <div className="py-1">
                          <Link
                            to={getFullLocalizedPath("websites", language)}
                            onClick={() => setProductsOpen(false)}
                            onMouseEnter={handleProductsMouseEnter}
                            className="flex items-center gap-3 px-3.5 py-2.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors rounded-xl mx-1.5"
                          >
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-white/80">
                              <Globe2 className="w-4 h-4" />
                            </span>
                              <span className="flex-1 min-w-0">
                              <span className="block text-sm">Mitrox Sites</span>
                            <span className="block text-[0.6rem] uppercase tracking-[0.35em] text-body-caption mt-0.5">{sitesItem?.subtitle}</span>
                            </span>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                          <Link
                            to={getFullLocalizedPath("advisor", language)}
                            onClick={() => setProductsOpen(false)}
                            onMouseEnter={handleProductsMouseEnter}
                            className="group flex items-center gap-3 px-3.5 py-2.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors rounded-xl mx-1.5"
                          >
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-white/80">
                              <Sparkles className="w-4 h-4" />
                            </span>
                              <span className="flex-1 min-w-0">
                              <span className="block text-sm">Mitrox AI Advisor</span>
                            <span className="block text-[0.6rem] uppercase tracking-[0.35em] text-body-caption mt-0.5">{advisorItem?.subtitle}</span>
                            </span>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rest of navigation items (Tietoa meistä) */}
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
                        className="text-white/80 hover:text-white transition-colors text-base font-light px-5 py-2.5 rounded-full hover:bg-white/10"
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Affiliate Button */}
                <Link
                  to={getFullLocalizedPath("affiliate", language)}
                  className="px-5 py-2.5 bg-black/20 hover:bg-black/30 text-white rounded-full text-base font-light transition-all backdrop-blur-sm border border-white/20 hover:border-white/30"
                >
                  {affiliateLabel}
                </Link>

                {/* Contact Button */}
                <a
                  href={`#${contactId}`}
                  className="px-5 py-2.5 bg-black/20 hover:bg-black/30 text-white rounded-full text-base font-light transition-all backdrop-blur-sm border border-white/20 hover:border-white/30"
                  onClick={(e) => {
                    const currentPath = location.pathname.replace(/^\/[^/]+/, '') || '/';
                    if (currentPath === "/" || currentPath === `/${language}`) {
                      e.preventDefault();
                      handleScroll(contactId);
                    }
                    setOpen(false);
                  }}
                >
                  {language === "fi" ? "Ota yhteyttä" : "Contact us"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header - Bottom Navigation */}
      <header
        role="banner"
        className="md:hidden fixed bottom-0 inset-x-0 z-50 transition-all duration-500 pointer-events-none"
        style={{
          fontFamily: 'GeistSans, "GeistSans Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
        }}
      >
        <div className="flex justify-between items-end px-4 py-4 gap-3">
          {/* Mobile logo - Left corner */}
          <Link
            to={getLocalizedPath("/", language)}
            className="inline-flex items-center justify-center rounded-full bg-black/40 backdrop-blur-xl backdrop-saturate-150 shadow-2xl p-4 text-white hover:bg-white/10 transition-colors pointer-events-auto"
            aria-label={language === "fi" ? "Mitrox Solutions – etusivu" : "Mitrox Solutions – home"}
            onClick={(e) => {
              const homePath = addLanguagePrefix("/", language);
              if (location.pathname === homePath) {
                e.preventDefault();
                handleScroll("hero");
              }
            }}
          >
            <img
              src={logo}
              alt="Mitrox.io"
              className="h-6 w-auto object-contain"
              loading="eager"
            />
          </Link>

          {/* Mobile menu button - Right corner */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-xl backdrop-saturate-150 shadow-2xl p-4 text-white hover:bg-white/10 transition-colors pointer-events-auto"
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
          <div className="rounded-2xl bg-black/40 backdrop-blur-xl backdrop-saturate-150 shadow-2xl p-3.5 w-[15.4rem]">
            <div className="flex flex-col gap-0.5">
              {/* Mobile Etusivu - first */}
              {navItems[0] && (() => {
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
                          // Already on home page, just scroll to hero
                          handleScroll(item.href);
                        } else {
                          // Navigate to home page
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
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
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
                to={getFullLocalizedPath("affiliate", language)}
                onClick={() => setOpen(false)}
                className="block rounded-full px-4 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
              >
                {affiliateLabel}
              </Link>

              {/* Mobile Contact - fifth */}
              <a
                href={`#${contactId}`}
                onClick={(e) => {
                  const currentPath = location.pathname.replace(/^\/[^/]+/, '') || '/';
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
    </>
  );
};

export default Header;