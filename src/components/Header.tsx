// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

const NAV = [
  { label: "Etusivu", href: "hero" },
  { label: "Tietoa meistä", href: "/about" },
];

const PRODUCT_PAGE_NAV = [
  { label: "Prosessi", href: "process" },
  { label: "Hinnasto", href: "pricing" },
  { label: "FAQ", href: "faq" },
];

const PRODUCTS = [
  { label: "Räätälöidyt Verkkosivut", href: "/websites" },
  { label: "AI Agent / Chatbot", href: "/ai-agent" },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const productsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const location = useLocation();

  // Show product page nav items on product pages
  const isProductPage = location.pathname === "/websites" || location.pathname === "/ai-agent";
  const displayNav = isProductPage 
    ? location.pathname === "/websites"
      ? [NAV[0], ...PRODUCT_PAGE_NAV, NAV[1]]
      : [...NAV, ...PRODUCT_PAGE_NAV]
    : NAV;

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
                  to="/"
                  className="flex items-center select-none"
                  aria-label="Mitrox Solutions – etusivu"
                  onClick={(e) => {
                    if (location.pathname === "/") {
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
                  {displayNav[0] && (() => {
                    const item = displayNav[0];
                    const isPage = item.href.startsWith("/");
                    return (
                      <Link
                        key={item.href}
                        to={isPage ? item.href : `/#${item.href}`}
                        onClick={(e) => {
                          // If on product page, always go to landing page
                          if (isProductPage && !isPage) {
                            e.preventDefault();
                            window.location.href = `/#${item.href}`;
                          } else if (!isPage) {
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
                  })()}

                  {/* Products Dropdown - second (only on landing page) */}
                  {!isProductPage && (
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
                        Tuotteet
                        <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {productsOpen && (
                        <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-black/40 backdrop-blur-xl backdrop-saturate-150 shadow-2xl border border-white/10 overflow-hidden z-50">
                          <div className="py-2">
                            {PRODUCTS.map((product) => {
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
                                    if (productsTimeoutRef.current) {
                                      clearTimeout(productsTimeoutRef.current);
                                    }
                                    setProductsOpen(false);
                                  }}
                                  onMouseEnter={handleProductsMouseEnter}
                                  className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
                                >
                                  {product.label}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Rest of navigation items (Tietoa meistä, Prosessi, Hinnasto, FAQ) */}
                  {displayNav.slice(1).map((item) => {
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
                            } else if (isProductPage) {
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
                  to="/affiliate"
                  className="px-5 py-2.5 bg-black/20 hover:bg-black/30 text-white rounded-full text-base font-light transition-all backdrop-blur-sm border border-white/20 hover:border-white/30"
                >
                  Affiliate
                </Link>

                {/* Contact Button */}
                <a
                  href="#contact"
                  className="px-5 py-2.5 bg-black/20 hover:bg-black/30 text-white rounded-full text-base font-light transition-all backdrop-blur-sm border border-white/20 hover:border-white/30"
                  onClick={(e) => {
                    if (location.pathname === "/") {
                      e.preventDefault();
                      handleScroll("contact");
                    }
                    setOpen(false);
                  }}
                >
                  Ota yhteyttä
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
        <div className="flex justify-between items-end px-4 py-4">
          {/* Mobile logo - Left corner */}
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-black/40 backdrop-blur-xl backdrop-saturate-150 shadow-2xl p-4 text-white hover:bg-white/10 transition-colors pointer-events-auto"
            aria-label="Mitrox Solutions – etusivu"
            onClick={(e) => {
              if (location.pathname === "/") {
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
            className="inline-flex items-center justify-center rounded-full bg-black/40 backdrop-blur-xl backdrop-saturate-150 shadow-2xl p-4 text-white hover:bg-white/10 transition-colors pointer-events-auto"
            aria-label="Valikko"
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
            "absolute bottom-full right-4 mb-2 overflow-hidden transition-all duration-300 ease-out pointer-events-auto origin-bottom-right",
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
          ].join(" ")}
        >
          <div className="rounded-2xl bg-black/40 backdrop-blur-xl backdrop-saturate-150 shadow-2xl p-3 w-56">
            <div className="flex flex-col gap-0.5">
              {/* Mobile Etusivu - first */}
              {displayNav[0] && (() => {
                const item = displayNav[0];
                const isPage = item.href.startsWith("/");
                return (
                  <Link
                    key={item.href}
                    to={isPage ? item.href : `/#${item.href}`}
                    onClick={(e) => {
                      // If on product page, always go to landing page
                      if (isProductPage && !isPage) {
                        e.preventDefault();
                        window.location.href = `/#${item.href}`;
                      } else if (!isPage) {
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
              })()}

              {/* Mobile Products Dropdown - second */}
              {!isProductPage && (
                <div>
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="w-full flex items-center justify-between rounded-full px-4 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
                  >
                    Tuotteet
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileProductsOpen && (
                    <div className="ml-4 mt-1 flex flex-col gap-0.5">
                      {PRODUCTS.map((product) => {
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
                            className="block rounded-full px-4 py-1.5 text-white/60 hover:text-white/80 hover:bg-white/10 transition-colors text-xs font-light"
                          >
                            {product.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Rest of navigation items (Tietoa meistä, Prosessi, Hinnasto, FAQ) */}
              {displayNav.slice(1).map((item) => {
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
                        } else if (isProductPage) {
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
                to="/affiliate"
                onClick={() => setOpen(false)}
                className="block rounded-full px-4 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
              >
                Affiliate
              </Link>

              {/* Mobile Contact - fifth */}
              <a
                href="#contact"
                onClick={(e) => {
                  if (location.pathname === "/") {
                    e.preventDefault();
                    handleScroll("contact");
                  }
                  setOpen(false);
                }}
                className="block rounded-full px-4 py-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-light"
              >
                Ota yhteyttä
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;