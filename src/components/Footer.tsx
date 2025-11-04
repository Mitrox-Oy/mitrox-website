import React from "react";
import { Mail } from "lucide-react";
import logo from "../assets/logo.png";

type FooterProps = {
  email?: string; // esim. "info@mitrox.io"
};

const InstagramIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.25 1.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
  </svg>
);

const YouTubeIcon = ({ className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      fill="#FF0000"
      d="M23.5 7.5s-.2-1.5-.8-2.1c-.7-.8-1.5-.9-1.9-1C17.6 4 12 4 12 4s-5.6 0-8.8.4c-.4.1-1.2.2-1.9 1C.7 6 0.5 7.5 0.5 7.5S0 9.2 0 12s.5 4.5.5 4.5.2 1.5.8 2.1c.7.8 1.6.8 2 .9C6.4 19.9 12 20 12 20s5.6 0 8.8-.4c.4-.1 1.2-.1 1.9-.9.6-.6.8-2.1.8-2.1S24 14.8 24 12s-.5-4.5-.5-4.5Z"
    />
    <path fill="#FFFFFF" d="M9.75 15.5v-7l6 3.5-6 3.5Z" />
  </svg>
);

const Footer: React.FC<FooterProps> = ({ email = "info@mitrox.io" }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          {/* Logo */}
          <a href="/" className="inline-flex items-center gap-3 shrink-0">
            <img
              src={logo}
              alt="Mitrox Oy"
              className="h-8 w-auto select-none"
              draggable={false}
            />
          </a>

          {/* Email + Copyright + Y-tunnus */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-center sm:text-left">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {email}
            </a>
            <span className="hidden sm:inline text-gray-600">•</span>
            <div className="text-gray-400">
              © {year} Mitrox Oy. Kaikki oikeudet pidätetään.
            </div>
            <span className="hidden sm:inline text-gray-600">•</span>
            <div className="text-gray-400">Y-tunnus: 3562179-8</div>
          </div>

          {/* Sosiaalinen media: Instagram + YouTube */}
          <div className="flex items-center gap-4 justify-center md:justify-end">
            <a
              href="https://www.linkedin.com/company/mitrox/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              title="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a
              href="https://www.instagram.com/mitrox.io/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              title="Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>

            <a
              href="https://www.youtube.com/@Mitroxio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="group inline-flex transition-transform"
              title="YouTube"
            >
              <YouTubeIcon className="h-5 w-5 transform transition-transform group-hover:scale-110" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
