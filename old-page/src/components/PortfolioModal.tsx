import React, { useEffect } from "react";
import { X } from "lucide-react";

export type PortfolioItem = {
  id: string;
  image: string;
  company: string;
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

        {/* Image Only */}
        <div className="relative w-full h-[90vh] bg-gradient-to-br from-gray-900 to-black">
          <img
            src={item.image}
            alt={item.company}
            className="w-full h-full object-contain"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;

