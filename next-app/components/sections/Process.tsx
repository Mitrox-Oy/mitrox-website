import type { Dictionary } from "@/lib/i18n/dictionaries";
import CinematicScene from "@/components/motion/CinematicScene";
import SceneLayer from "@/components/motion/SceneLayer";
import { enterHoldExit } from "@/components/motion/keyframes";

// Heading holds through almost the entire time the steps are being read —
// see Ambition.tsx for the same fix and reasoning.
const heading = enterHoldExit({ enterStart: 0, enterEnd: 0.14, exitStart: 0.72, exitEnd: 0.86, distance: 32 });
const steps = enterHoldExit({ enterStart: 0.24, enterEnd: 0.42, exitStart: 0.8, exitEnd: 0.94, distance: 28, fromScale: 0.94 });

export default function Process({ dict }: { dict: Dictionary }) {
  return (
    <section id="process">
      <CinematicScene heightVh={200} stageClassName="flex items-center px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-5xl mx-auto w-full h-auto sm:h-[46vh]">
          <SceneLayer keyframes={heading} className="relative sm:absolute sm:inset-x-0 sm:top-0">
            <span className="text-xs uppercase tracking-[0.35em] text-white/50">{dict.process.eyebrow}</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">{dict.process.title}</h2>
          </SceneLayer>

          <SceneLayer keyframes={steps} className="relative sm:absolute sm:inset-x-0 sm:bottom-0 mt-8 sm:mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dict.process.steps.map((step, i) => (
                <div key={step.title}>
                  <span className="text-white/30 text-sm">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-white font-medium">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{step.desc}</p>
                </div>
              ))}
            </div>
          </SceneLayer>
        </div>
      </CinematicScene>
    </section>
  );
}
