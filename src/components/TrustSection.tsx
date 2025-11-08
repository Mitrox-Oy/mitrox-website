import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const VF_SCRIPT = "https://cdn.voiceflow.com/widget-next/bundle.mjs";

const TrustSection: React.FC = () => {
  const embedRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = embedRef.current;
    if (!container) {
      return;
    }

    container.innerHTML = "";
    setIsLoading(true);

    const stylesheetUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/voiceflow-custom.css`
        : "/voiceflow-custom.css";

    const mountChat = () => {
      if (initializedRef.current || !(window as any).voiceflow?.chat || !embedRef.current) {
        return;
      }

      initializedRef.current = true;
      embedRef.current.innerHTML = "";

      (window as any).voiceflow.chat.load({
        verify: { projectID: "6902548f4f67aa25ced6751e" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
        render: {
          mode: "embedded",
          target: embedRef.current,
        },
        assistant: {
          // Force light theme (prevents auto dark mode from coloring the input)
          theme: { colorScheme: "light" },
          // Hard style overrides inside the iframe without losing base Voiceflow styles
          stylesheet: stylesheetUrl,
        },
      });

      // Give the embed a moment to render before hiding the loader
      window.setTimeout(() => setIsLoading(false), 600);
    };

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${VF_SCRIPT}"]`);

    if (existingScript) {
      if ((window as any).voiceflow?.chat) {
        mountChat();
      } else {
        existingScript.addEventListener("load", mountChat);
        return () => existingScript.removeEventListener("load", mountChat);
      }
    } else {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = VF_SCRIPT;
      script.async = true;
      script.addEventListener("load", mountChat);
      document.body.appendChild(script);

      return () => {
        script.removeEventListener("load", mountChat);
      };
    }

    return () => {
      initializedRef.current = false;
    };
  }, []);

  return (
    <section id="bots" className="relative bg-black py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-3">
            Kokeile Mitrox AI Advisoria
          </h2>
          <p className="text-[0.75rem] uppercase tracking-[0.45em] text-body-caption">
            ÄLYKÄS KASVUKUMPPANISI
          </p>
          <p className="text-body-subtle max-w-2xl mx-auto mt-4">
            Keskustele neuvojalta Mitroxista, hinnoittelusta tai siitä, miten voimme vauhdittaa yrityksesi kasvua.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="relative mx-auto w-full max-w-[520px] rounded-[24px] bg-white overflow-hidden shadow-2xl">
              <div className="h-[560px] lg:h-[700px]">
                <div ref={embedRef} id="voiceflow-chatbot" className="absolute inset-0" />
                {isLoading && (
                  <div className="absolute inset-0 grid place-items-center bg-white">
                    <div className="h-10 w-10 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:pl-10">
            <h3 className="text-white text-2xl font-medium mb-2">Testaa itse</h3>
            <p className="text-body-subtle mb-6 max-w-md">
              Kysele neuvojalta Mitroxista, hinnoittelusta tai siitä, miten voimme vauhdittaa yrityksesi kasvua.
            </p>
            <Link
              to="#pricing"
              className="inline-flex items-center px-6 py-3 rounded-full bg-white text-black hover:bg-gray-100 transition font-medium"
            >
              Tilaa Mitrox AI Advisor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

declare global {
  interface Window {
    voiceflow?: {
      chat: {
        load: (config: any) => void;
      };
    };
  }
}

export default TrustSection;
