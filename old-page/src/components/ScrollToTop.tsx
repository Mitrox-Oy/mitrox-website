import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Observe footer to lift the button when footer is visible
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
        setFooterHeight(entry.target.getBoundingClientRect().height);
      },
      { root: null, threshold: 0 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      heroElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback to top of page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const computedBottom = isFooterVisible ? Math.min(footerHeight, 52) + 20 : 32; // 32px = bottom-8
  const safeAreaInsetBottom = 'var(--safe-area-inset-bottom, 0px)';

  return (
    <button
      onClick={scrollToTop}
      className={`hidden md:block fixed bottom-8 right-8 z-50 p-3 bg-white text-black rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 ease-out ${
        isVisible 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      } grid place-items-center`}
      aria-label="Scroll to top"
      style={{
        bottom: `calc(${computedBottom}px + ${safeAreaInsetBottom})`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <ArrowUp className="w-5 h-5" strokeWidth={2} />
    </button>
  );
};

export default ScrollToTop;