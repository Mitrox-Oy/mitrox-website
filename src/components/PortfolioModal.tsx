import React, { useEffect } from "react";
import { X, Quote } from "lucide-react";

export type PortfolioItem = {
  id: string;
  image: string;
  company: string;
  testimonial: {
    quote: string;
    personName: string;
    role: string;
  };
};

interface PortfolioModalProps {
  item: PortfolioItem;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, onClose }) => {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-xl border border-white/20 hover:bg-black/80 hover:border-white/40 transition-all text-white"
          aria-label="Sulje"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex flex-col lg:flex-row max-h-[90vh] overflow-auto">
          {/* Image Section */}
          <div className="relative w-full lg:w-2/3 h-[50vh] lg:h-auto bg-gradient-to-br from-gray-900 to-black">
            <img
              src={item.image}
              alt={item.company}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Testimonial Section */}
          <div className="w-full lg:w-1/3 p-6 lg:p-8 flex flex-col justify-center bg-black/40 backdrop-blur-xl">
            <div className="mb-6">
              <h3 className="text-2xl font-medium text-white mb-2">
                {item.company}
              </h3>
              <div className="h-px w-16 bg-white/20" />
            </div>

            {/* Testimonial */}
            <div className="flex-1">
              <div className="mb-4 text-gray-400">
                <Quote className="w-6 h-6" />
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 text-base lg:text-lg">
                "{item.testimonial.quote}"
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-medium text-sm">
                  {item.testimonial.personName}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {item.testimonial.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;

