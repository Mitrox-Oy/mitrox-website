import type { Dictionary } from "@/lib/i18n/dictionaries";
import GlassPanel from "@/components/ui/GlassPanel";
import CinematicScene from "@/components/motion/CinematicScene";
import SceneLayer from "@/components/motion/SceneLayer";
import type { LayerKeyframe } from "@/components/motion/keyframes";

// The last scene on the page, with nothing after it but the footer — it must
// never fade out. Any exit phase (even a late one) gets permanently clamped
// to its hidden end state once the user scrolls past this scene's own range
// into the footer, which is exactly the "Careers box disappears at the
// bottom of the page" bug. So: no exit at all, held fully visible to
// progress 1 (always safe — scroll progress is clamped to [0, 1]).
//
// Also starts visible at progress 0 (not a hidden "enter" state): the header
// nav's "Careers" link jumps straight to this section's progress 0, so
// anything hidden there would make the link look broken until the user
// scrolled further — the exact bug this used to have.
const reveal: LayerKeyframe[] = [
  { at: 0, opacity: 1, scale: 1, blur: 0, y: 0 },
  { at: 1, opacity: 1, scale: 1, blur: 0, y: 0 },
];

// No form here on purpose: Mitrox isn't collecting talent-pool emails, so
// there's no address for this section to send anything to.
export default function Careers({ dict }: { dict: Dictionary }) {
  return (
    <section id="careers">
      <CinematicScene heightVh={160} stageClassName="flex items-center px-4 sm:px-6 lg:px-8">
        <SceneLayer keyframes={reveal} className="w-full">
          <GlassPanel hover glow className="max-w-3xl mx-auto rounded-3xl px-5 py-10 sm:px-8 sm:py-14 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6">
              {dict.careers.title}
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto">{dict.careers.description}</p>
          </GlassPanel>
        </SceneLayer>
      </CinematicScene>
    </section>
  );
}
