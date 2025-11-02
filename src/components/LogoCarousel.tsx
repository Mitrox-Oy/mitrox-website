import React, { useEffect, useRef, useState } from "react";

type LogoItem = {
  name: string;
  logo: string; // Path to logo image
};

interface LogoCarouselProps {
  logos?: LogoItem[];
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({ logos = [] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Default placeholder logos - replace with actual logos
  const defaultLogos: LogoItem[] = logos.length > 0 
    ? logos 
    : [
        { name: "Company 1", logo: "/placeholder-logo.png" },
        { name: "Company 2", logo: "/placeholder-logo.png" },
        { name: "Company 3", logo: "/placeholder-logo.png" },
        { name: "Company 4", logo: "/placeholder-logo.png" },
        { name: "Company 5", logo: "/placeholder-logo.png" },
      ];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      if (!isPaused && carousel) {
        scrollPosition += scrollSpeed;
        
        // Check if we've scrolled past the first set of logos
        const singleSetWidth = carousel.scrollWidth / 2;
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0;
        }
        
        carousel.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...defaultLogos, ...defaultLogos];

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-medium text-white mb-2">
            Yritykset, jotka luottavat meihin
          </h2>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex gap-8 md:gap-12">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-40 h-20 md:w-48 md:h-24 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img
                  src={logo.logo}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain filter"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;

