import type { Dictionary } from "@/lib/i18n/dictionaries";
import CinematicScene from "@/components/motion/CinematicScene";
import SceneLayer from "@/components/motion/SceneLayer";
import { enterHoldExit } from "@/components/motion/keyframes";

// Hero stays deliberately restrained (short scene, two layers) — the brief
// asks for the opening to feel polished and staged but not overcomplicated.
// Both layers enter starting at progress 0: the Hero is the very first thing
// on the page, visible with zero prior scroll, so there is no "wait, then
// reveal" delay here — it must already be resolving into view immediately.
const backgroundGlow = enterHoldExit({ enterStart: 0, enterEnd: 0.12, exitStart: 0.82, exitEnd: 0.97, distance: 0, blur: 0, fromScale: 0.9, toScale: 1.08 });
const content = enterHoldExit({ enterStart: 0, enterEnd: 0.12, exitStart: 0.8, exitEnd: 0.95, distance: 26, blur: 8 });

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section id="hero">
      <CinematicScene heightVh={190} stageClassName="flex items-center justify-center text-center px-4">
        <SceneLayer keyframes={backgroundGlow} className="absolute inset-0 -z-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 40%, rgba(120,150,255,0.16), transparent 70%)",
            }}
          />
        </SceneLayer>

        <SceneLayer keyframes={content} className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.35em] text-white/50">{dict.hero.eyebrow}</span>
          <h1 className="mt-4 text-5xl sm:text-7xl font-bold tracking-tight text-white">
            {dict.hero.title}
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto">{dict.hero.subtitle}</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#teaser"
              className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
            >
              {dict.hero.cta}
            </a>
            <a
              href="#story"
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              {dict.hero.secondaryCta}
            </a>
          </div>
        </SceneLayer>
      </CinematicScene>
    </section>
  );
}
