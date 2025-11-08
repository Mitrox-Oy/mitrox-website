import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import ColorBends from './ColorBends';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showTitle, setShowTitle] = useState<boolean>(false);
  const [showSubtitle, setShowSubtitle] = useState<boolean>(false);
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const { language } = useLanguage();
  const isFinnish = language === 'fi';

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setShowContent(true);
      setShowTitle(true);
      setShowSubtitle(true);
      setShowButtons(true);
      return;
    }

    // Staggered animation sequence
    setTimeout(() => setShowTitle(true), 300);
    setTimeout(() => setShowSubtitle(true), 600);
    setTimeout(() => setShowButtons(true), 900);
    setTimeout(() => setShowContent(true), 300);
  }, []);

  const handleScrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Color Bends Background */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={30}
          speed={0.3}
          scale={1.2}
          frequency={1.45}
          warpStrength={1.05}
          mouseInfluence={0.8}
          parallax={0.6}
          noise={0.08}
          transparent
        
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black pointer-events-none" />

      {/* Bottom fade to match next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 sm:h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000000 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
          <div className="flex flex-col items-center">
            {/* Title */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-7xl leading-tight mb-4 sm:mb-6 flex flex-col items-center justify-center text-white px-2 transition-all duration-1000 ease-out ${
                showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 600 }}
            >
              {isFinnish ? 'Teknologia, joka tuntuu luonnolliselta' : 'Technology that feels effortless'}
            </h1>

            {/* Subtitle */}
            <p
              className={`text-base sm:text-lg text-body-subtle mb-6 sm:mb-8 max-w-[42rem] mx-auto leading-relaxed font-light transition-all duration-1000 ease-out px-2 ${
                showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ fontFamily: 'GeistSans, "GeistSans Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight: 400 }}
            >
              {isFinnish ? 'Mitrox muuttaa monimutkaisen yksinkertaiseksi ja tehokkaaksi' : 'We design digital experiences that simply work. Beautifully.'}
            </p>

            {/* Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 transition-all duration-1000 ease-out w-full sm:w-auto px-2 ${
                showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <button
                onClick={handleScrollToProducts}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white font-medium hover:bg-black/60 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                style={{ fontFamily: 'GeistSans, "GeistSans Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight: 400 }}
              >
                {isFinnish ? 'Tutustu tuotteisiin' : 'Discover Mitrox'}
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={handleScrollToContact}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-white text-black hover:bg-gray-100 font-medium transition-all duration-300 flex items-center justify-center"
                style={{ fontFamily: 'GeistSans, "GeistSans Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontWeight: 400 }}
              >
                {isFinnish ? 'Ota yhteyttä' : "Let's build together"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;