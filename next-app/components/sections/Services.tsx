import type { Dictionary } from "@/lib/i18n/dictionaries";
import GlassPanel from "@/components/ui/GlassPanel";
import CinematicScene from "@/components/motion/CinematicScene";
import SceneLayer from "@/components/motion/SceneLayer";
import { enterHoldExit } from "@/components/motion/keyframes";

const heading = enterHoldExit({ enterStart: 0, enterEnd: 0.16, exitStart: 0.8, exitEnd: 0.92, distance: 28 });
const points = enterHoldExit({ enterStart: 0.22, enterEnd: 0.4, exitStart: 0.86, exitEnd: 0.97, distance: 24, fromScale: 0.96 });

export default function Services({ dict }: { dict: Dictionary }) {
  return (
    <section id="services">
      <CinematicScene heightVh={210} stageClassName="flex items-center px-4 sm:px-6 lg:px-8">
        {/* Taller frame than Ambition/Process — the CTA button under the
            points grid needs extra room so it doesn't crowd the heading
            block above it. */}
        <div className="relative max-w-5xl mx-auto w-full h-auto sm:h-[clamp(40rem,58vh,52rem)]">
          <SceneLayer keyframes={heading} className="relative sm:absolute sm:inset-x-0 sm:top-0">
            <span className="text-xs uppercase tracking-[0.35em] text-white/50">{dict.services.eyebrow}</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white max-w-2xl">{dict.services.title}</h2>
            <p className="mt-4 text-white/70 max-w-2xl">{dict.services.description}</p>
          </SceneLayer>

          <SceneLayer keyframes={points} className="relative sm:absolute sm:inset-x-0 sm:bottom-0 mt-8 sm:mt-0">
            <div className="grid sm:grid-cols-2 gap-4">
              {dict.services.points.map((p) => (
                <GlassPanel key={p.title} hover className="rounded-2xl p-6">
                  <h3 className="text-white font-medium">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{p.desc}</p>
                </GlassPanel>
              ))}
            </div>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              {dict.services.cta}
            </a>
          </SceneLayer>
        </div>
      </CinematicScene>
    </section>
  );
}
