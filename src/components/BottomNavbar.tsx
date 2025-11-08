// src/components/BottomNavbar.tsx
import React, { useEffect, useMemo, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useLocalizedSectionId } from "../hooks/useLocalizedSectionId";

const BottomNavbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const { language } = useLanguage();
  const processId = useLocalizedSectionId("process");
  const pricingId = useLocalizedSectionId("pricing");
  const faqId = useLocalizedSectionId("faq");

  const items = useMemo(
    () => [
      { label: language === "fi" ? "Prosessi" : "Process", href: processId },
      { label: language === "fi" ? "Hinnasto" : "Pricing", href: pricingId },
      { label: "FAQ", href: faqId },
    ],
    [language, processId, pricingId, faqId]
  );

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

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
        setFooterHeight(entry.target.getBoundingClientRect().height);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const computedBottom = isFooterVisible ? Math.min(footerHeight, 80) + 48 : isExpanded ? 0 : 16;

  return (
    <nav
      className="block fixed inset-x-0 z-40 transition-all duration-500 bg-transparent"
      style={{
        fontFamily: 'GeistSans, "GeistSans Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        bottom: `${computedBottom}px`,
      }}
    >
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        isExpanded ? "pb-4" : "pb-1"
      }`}>
        <div className="flex justify-center">
          <div
            className={`rounded-full backdrop-blur-xl backdrop-saturate-150 shadow-2xl border border-white/10 overflow-hidden transition-all duration-500 ${
              isExpanded ? "px-6 py-3" : "px-2.5 py-1"
            } ${
              // Transparent background on mobile, semi-transparent on desktop
              "bg-transparent md:bg-black/40"
            }`}
          >
            <div className="flex items-center gap-3">
              {isExpanded && (
                <>
                  {items.map((item, index) => (
                    <React.Fragment key={item.href}>
                      <a
                        href={`#${item.href}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleScroll(item.href);
                        }}
                        className="text-body-subtle hover:text-white transition-colors text-sm font-light px-4 py-1.5 rounded-full hover:bg-white/10 whitespace-nowrap"
                      >
                        {item.label}
                      </a>
                      {index < items.length - 1 && (
                        <div className="w-px h-4 bg-white/10" />
                      )}
                    </React.Fragment>
                  ))}
                  <div className="w-px h-4 bg-white/10" />
                </>
              )}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`text-body-subtle hover:text-white transition-colors font-light rounded-full hover:bg-white/10 flex items-center justify-center ${
                  isExpanded ? "text-sm px-3 py-1.5" : "text-xs px-1.5 py-0.5"
                }`}
                aria-label={isExpanded ? (language === "fi" ? "Piilota navigaatio" : "Hide navigation") : language === "fi" ? "Näytä navigaatio" : "Show navigation"}
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;

