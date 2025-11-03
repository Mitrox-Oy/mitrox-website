// src/components/BottomNavbar.tsx
import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const BOTTOM_NAV_ITEMS = [
  { label: "Prosessi", href: "process" },
  { label: "Hinnasto", href: "pricing" },
  { label: "FAQ", href: "faq" },
];

const BottomNavbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`hidden md:block fixed inset-x-0 z-40 transition-all duration-500 ${
        isExpanded ? "bottom-0" : "bottom-4"
      }`}
      style={{
        fontFamily: 'GeistSans, "GeistSans Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      }}
    >
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        isExpanded ? "pb-4" : "pb-1"
      }`}>
        <div className="flex justify-center">
          <div
            className={`rounded-full bg-black/40 backdrop-blur-xl backdrop-saturate-150 shadow-2xl border border-white/10 overflow-hidden transition-all duration-500 ${
              isExpanded ? "px-6 py-3" : "px-2.5 py-1"
            }`}
          >
            <div className="flex items-center gap-3">
              {isExpanded && (
                <>
                  {BOTTOM_NAV_ITEMS.map((item, index) => (
                    <React.Fragment key={item.href}>
                      <a
                        href={`#${item.href}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleScroll(item.href);
                        }}
                        className="text-white/70 hover:text-white transition-colors text-sm font-light px-4 py-1.5 rounded-full hover:bg-white/10 whitespace-nowrap"
                      >
                        {item.label}
                      </a>
                      {index < BOTTOM_NAV_ITEMS.length - 1 && (
                        <div className="w-px h-4 bg-white/10" />
                      )}
                    </React.Fragment>
                  ))}
                  <div className="w-px h-4 bg-white/10" />
                </>
              )}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`text-white/70 hover:text-white transition-colors font-light rounded-full hover:bg-white/10 flex items-center justify-center ${
                  isExpanded ? "text-sm px-3 py-1.5" : "text-xs px-1.5 py-0.5"
                }`}
                aria-label={isExpanded ? "Piilota navigaatio" : "Näytä navigaatio"}
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

