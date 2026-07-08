"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import CinematicScene from "@/components/motion/CinematicScene";
import SceneLayer from "@/components/motion/SceneLayer";
import { enterHoldExit } from "@/components/motion/keyframes";

// Calmer than the narrative scenes, but with a generously long hold so a
// normal scroll flick can't accidentally carry the user past it.
const reveal = enterHoldExit({ enterStart: 0, enterEnd: 0.18, exitStart: 0.86, exitEnd: 0.98, distance: 22, blur: 6, fromScale: 0.98, toScale: 1.01 });

export default function FAQ({ dict }: { dict: Dictionary }) {
  // Closed by default — nothing should be pre-opened until the user asks for it.
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq">
      <CinematicScene heightVh={170} stageClassName="flex items-center px-4 sm:px-6 lg:px-8">
        <SceneLayer keyframes={reveal} className="max-w-3xl mx-auto w-full">
          <span className="text-xs uppercase tracking-[0.35em] text-white/50">{dict.faq.eyebrow}</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">{dict.faq.title}</h2>

          <div className="mt-10 divide-y divide-white/10">
            {dict.faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpen(isOpen ? null : i);
                    }
                  }}
                  className="py-5 cursor-pointer select-none"
                >
                  <div className="w-full flex items-center justify-between text-left text-white">
                    <h3 className="font-medium">{item.q}</h3>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                  {isOpen && <p className="mt-3 text-white/60 text-sm leading-relaxed">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </SceneLayer>
      </CinematicScene>
    </section>
  );
}
