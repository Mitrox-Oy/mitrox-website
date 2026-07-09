import React, { useState, useEffect } from "react";
import background from "../assets/background.png";
import background1 from "../assets/background1.png";
import background2 from "../assets/background2.png";
import background3 from "../assets/background3.png";

interface ImageCarouselProps {
  images?: string[];
  autoSlideInterval?: number; // milliseconds
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images = [],
  autoSlideInterval = 4800,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Default images from assets
  const defaultImages: string[] =
    images.length > 0
      ? images
      : [background, background1, background2, background3];

  useEffect(() => {
    if (isPaused || defaultImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % defaultImages.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [isPaused, defaultImages.length, autoSlideInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + defaultImages.length) % defaultImages.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % defaultImages.length);
  };

  return (
    <section className="relative w-full bg-black py-20 md:py-28">
      <div
        className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-4 sm:p-6">
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 via-white/[0.02] to-transparent opacity-40" />
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.75rem] border border-white/5 bg-black/80">
            {defaultImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <img
                  src={image}
                  alt={`Carousel image ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
              </div>
            ))}
          </div>

          {/* Frame decorations */}
          <div className="pointer-events-none absolute inset-x-12 top-6 h-1 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute inset-x-20 bottom-6 h-[0.15rem] rounded-full bg-white/5" />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          {defaultImages.length > 1 && (
            <button
              onClick={goToPrevious}
              className="rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.12]"
              aria-label="Previous image"
            >
              Edellinen
            </button>
          )}

          <div className="flex items-center gap-2">
            {defaultImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/35 hover:bg-white/55"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {defaultImages.length > 1 && (
            <button
              onClick={goToNext}
              className="rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.12]"
              aria-label="Next image"
            >
              Seuraava
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;

