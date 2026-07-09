import type { Dictionary } from "@/lib/i18n/dictionaries";
import CinematicScene from "@/components/motion/CinematicScene";
import SceneLayer from "@/components/motion/SceneLayer";
import { enterHoldExit } from "@/components/motion/keyframes";

// heading AND body both start at enterStart 0: someone landing here via the
// "Our story" anchor link (progress 0) must see the whole opening paragraph,
// not just the heading with nothing underneath it.
const heading = enterHoldExit({ enterStart: 0, enterEnd: 0.14, exitStart: 0.42, exitEnd: 0.54, distance: 34 });
const body = enterHoldExit({ enterStart: 0, enterEnd: 0.16, exitStart: 0.44, exitEnd: 0.56, distance: 30 });
// Vision block begins entering before the story paragraphs have fully
// exited, so the two overlap (cross-fade) rather than reading as separate
// scroll steps.
const vision = enterHoldExit({ enterStart: 0.5, enterEnd: 0.66, exitStart: 0.88, exitEnd: 0.98, distance: 34 });

export default function Story({ dict }: { dict: Dictionary }) {
  return (
    <section id="story">
      <CinematicScene heightVh={230} stageClassName="flex items-center px-4 sm:px-6 lg:px-8">
        {/* Fixed-height frame: layers are absolutely positioned within it and
            cross-fade in place, so a layer fading out never leaves the next
            one pushed further down the page (no layout shift/reflow). */}
        <div className="relative max-w-4xl mx-auto w-full h-auto sm:h-[clamp(34rem,50vh,44rem)]">
          <SceneLayer keyframes={heading} className="relative sm:absolute sm:inset-x-0 sm:top-0">
            <span className="text-xs uppercase tracking-[0.35em] text-white/50">{dict.story.eyebrow}</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">{dict.story.title}</h2>
          </SceneLayer>

          <SceneLayer keyframes={body} className="relative sm:absolute sm:inset-x-0 sm:top-0 mt-8 sm:mt-0 sm:flex sm:items-center sm:h-full">
            <div className="space-y-4 text-white/70 leading-relaxed">
              {dict.story.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </SceneLayer>

          <SceneLayer keyframes={vision} className="relative sm:absolute sm:inset-x-0 sm:bottom-0 mt-8 sm:mt-0">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">{dict.story.visionTitle}</h3>
            <div className="mt-6 space-y-4 text-white/70 leading-relaxed max-w-2xl">
              {dict.story.visionParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </SceneLayer>
        </div>
      </CinematicScene>
    </section>
  );
}
