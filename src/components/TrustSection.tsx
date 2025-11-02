import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const TrustSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const voiceflowRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [voiceflowKey, setVoiceflowKey] = useState(0);
  const location = useLocation();

  // Näkyvyys
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.5, 1] }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Reset when location changes
  useEffect(() => {
    setIsLoaded(false);
    setVoiceflowKey(prev => prev + 1);
  }, [location.pathname]);

  // Voiceflow script lataus
  useEffect(() => {
    if (!isInView || !voiceflowRef.current || isLoaded) return;

    let timeoutId: NodeJS.Timeout;

    const addCustomStyles = () => {
      // Remove existing styles first
      const existingStyle = document.getElementById('voiceflow-custom-styles');
      if (existingStyle) {
        existingStyle.remove();
      }

      const style = document.createElement('style');
      style.id = 'voiceflow-custom-styles';
      style.textContent = `
      /* Voiceflow Dark Theme Overrides */
      #voiceflow-chatbot * {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
      }
      
      /* Chat container */
      #voiceflow-chatbot .vfrc-chat {
        background: #000000 !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 16px !important;
        box-shadow: none !important;
      }
      
      /* Header */
      #voiceflow-chatbot .vfrc-header {
        background: #000000 !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
        color: #ffffff !important;
      }
      
      /* Messages container */
      #voiceflow-chatbot .vfrc-messages {
        background: #000000 !important;
      }
      
      /* User messages */
      #voiceflow-chatbot .vfrc-message--user .vfrc-message__bubble {
        background: #ffffff !important;
        color: #000000 !important;
        border-radius: 12px !important;
        font-size: 14px !important;
        font-weight: 400 !important;
      }
      
      /* Bot messages */
      #voiceflow-chatbot .vfrc-message--system .vfrc-message__bubble {
        background: rgba(255, 255, 255, 0.05) !important;
        color: #ffffff !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 12px !important;
        font-size: 14px !important;
        font-weight: 400 !important;
      }
      
      /* Input area */
      #voiceflow-chatbot .vfrc-input {
        background: #000000 !important;
        border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
      }
      
      /* Input field */
      #voiceflow-chatbot .vfrc-input__field {
        background: rgba(255, 255, 255, 0.05) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 8px !important;
        color: #ffffff !important;
        font-size: 14px !important;
      }
      
      #voiceflow-chatbot .vfrc-input__field::placeholder {
        color: rgba(255, 255, 255, 0.4) !important;
      }
      
      #voiceflow-chatbot .vfrc-input__field:focus {
        border-color: rgba(255, 255, 255, 0.2) !important;
        outline: none !important;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1) !important;
      }
      
      /* Send button */
      #voiceflow-chatbot .vfrc-input__button {
        background: #ffffff !important;
        color: #000000 !important;
        border-radius: 6px !important;
        border: none !important;
        transition: all 0.2s ease !important;
      }
      
      #voiceflow-chatbot .vfrc-input__button:hover {
        background: rgba(255, 255, 255, 0.9) !important;
        transform: translateY(-1px) !important;
      }
      
      /* Buttons and interactive elements */
      #voiceflow-chatbot .vfrc-button {
        background: rgba(255, 255, 255, 0.05) !important;
        color: #ffffff !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 8px !important;
        font-size: 13px !important;
        transition: all 0.2s ease !important;
      }
      
      #voiceflow-chatbot .vfrc-button:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
      }
      
      /* Scrollbar */
      #voiceflow-chatbot .vfrc-messages::-webkit-scrollbar {
        width: 4px !important;
      }
      
      #voiceflow-chatbot .vfrc-messages::-webkit-scrollbar-track {
        background: transparent !important;
      }
      
      #voiceflow-chatbot .vfrc-messages::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2) !important;
        border-radius: 2px !important;
      }
      
      #voiceflow-chatbot .vfrc-messages::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3) !important;
      }
      
      /* Remove any default shadows or borders */
      #voiceflow-chatbot * {
        box-shadow: none !important;
      }
      
      /* Typing indicator */
      #voiceflow-chatbot .vfrc-typing {
        color: rgba(255, 255, 255, 0.6) !important;
      }
      
      /* Avatar/profile images */
      #voiceflow-chatbot .vfrc-avatar {
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
      }
    `;
      document.head.appendChild(style);
    };

    const loadVoiceflow = () => {
      if (window.voiceflow && voiceflowRef.current) {
        // Clear the container first
        voiceflowRef.current.innerHTML = '';
        
        // Add styles
        addCustomStyles();
        
        // Load Voiceflow
        window.voiceflow.chat.load({
          verify: { projectID: '6902548f4f67aa25ced6751e' },
          url: 'https://general-runtime.voiceflow.com/',
          versionID: 'production',
          render: {
            mode: 'embedded',
            target: voiceflowRef.current
          }
        });
        
        setIsLoaded(true);
        return;
      }
      
      // If Voiceflow is not loaded yet, try again
      timeoutId = setTimeout(loadVoiceflow, 100);
    };

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="voiceflow.com"]');
    if (existingScript) {
      // Script exists, try to load Voiceflow
      loadVoiceflow();
    } else {
      // Load script first
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = function() {
        loadVoiceflow();
      };
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isInView, isLoaded]);

  return (
    <section
      ref={sectionRef as any}
      id="bots"
      className="relative z-0 select-none bg-black overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 sm:mb-6">
            Kokeile tekoälybottia
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto px-4">
            Keskustele suoraan botin kanssa ja näe miten se toimii
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
          {/* Chat Interface */}
          <div className="w-full max-w-sm sm:max-w-md order-2 lg:order-1">
            <div className="relative bg-black border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl mx-auto">
              <div className="relative w-full h-[550px] sm:h-[650px]">
                <div
                  key={voiceflowKey}
                  ref={voiceflowRef}
                  id="voiceflow-chatbot"
                  className="absolute inset-0 h-full w-full"
                />
                
                {(!isInView || !isLoaded) && (
                  <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-2 sm:mb-3"></div>
                      <p className="text-white/60 text-xs sm:text-sm">Ladataan...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center lg:text-left max-w-lg order-1 lg:order-2 px-4 lg:px-0 py-6">
            <h3 className="text-xl sm:text-2xl font-medium text-white mb-3 sm:mb-4">
              Testaa itse
            </h3>
            <p className="text-gray-400 mb-10 sm:mb-12 leading-relaxed text-sm sm:text-base">
              Kysele vapaasti Mitroxista, hinnoittelusta tai miten voimme auttaa yritystäsi.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-black hover:bg-gray-100 rounded-full font-medium transition-all text-sm sm:text-base"
            >
              Tilaa oma botti
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Voiceflow types
declare global {
  interface Window {
    voiceflow: {
      chat: {
        load: (config: any) => void;
      };
    };
  }
}

export default TrustSection;