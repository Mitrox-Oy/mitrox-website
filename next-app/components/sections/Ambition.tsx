import type { Dictionary } from "@/lib/i18n/dictionaries";
import GlassPanel from "@/components/ui/GlassPanel";
import CinematicScene from "@/components/motion/CinematicScene";
import SceneLayer from "@/components/motion/SceneLayer";
import { enterHoldExit } from "@/components/motion/keyframes";

// Heading holds through almost the entire time the cards are being read —
// it should still be framing the section while the user looks at the cards,
// not disappear the moment they come into focus.
const heading = enterHoldExit({ enterStart: 0, enterEnd: 0.14, exitStart: 0.72, exitEnd: 0.86, distance: 32 });
const cards = enterHoldExit({ enterStart: 0.22, enterEnd: 0.4, exitStart: 0.8, exitEnd: 0.94, distance: 28, fromScale: 0.94 });

export default function Ambition({ dict }: { dict: Dictionary }) {
  return (
    <section id="ambition">
      <CinematicScene heightVh={220} stageClassName="flex items-center px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-5xl mx-auto w-full h-auto sm:h-[clamp(36rem,52vh,46rem)]">
          <SceneLayer keyframes={heading} className="relative sm:absolute sm:inset-x-0 sm:top-0">
            <span className="text-xs uppercase tracking-[0.35em] text-white/50">{dict.ambition.eyebrow}</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white max-w-2xl">
              {dict.ambition.title}
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl">{dict.ambition.subtitle}</p>
          </SceneLayer>

          <SceneLayer keyframes={cards} className="relative sm:absolute sm:inset-x-0 sm:bottom-0 mt-8 sm:mt-0">
            <div className="grid sm:grid-cols-2 gap-4">
              {dict.ambition.capabilities.map((c) => (
                <GlassPanel key={c.title} hover className="rounded-2xl p-6">
                  <h3 className="text-white font-medium">{c.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{c.desc}</p>
                </GlassPanel>
              ))}
            </div>
          </SceneLayer>
        </div>
      </CinematicScene>
    </section>
  );
}
