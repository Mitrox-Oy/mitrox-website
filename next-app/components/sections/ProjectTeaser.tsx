"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import GlassPanel from "@/components/ui/GlassPanel";
import CinematicScene from "@/components/motion/CinematicScene";
import SceneLayer from "@/components/motion/SceneLayer";
import { enterHoldExit } from "@/components/motion/keyframes";
import { useSubscribeForm } from "./useSubscribeForm";

const backgroundGlow = enterHoldExit({ enterStart: 0, enterEnd: 0.16, exitStart: 0.86, exitEnd: 0.98, distance: 0, blur: 0, fromScale: 0.85, toScale: 1.1 });
// enterStart 0: someone landing directly via the "Join the waitlist" anchor
// link (progress 0) must see the fully-formed card immediately, not a
// still-hidden entrance state. The hold (exitStart 0.86) is deliberately long
// so a normal scroll flick can't accidentally skip past this section.
const card = enterHoldExit({ enterStart: 0, enterEnd: 0.18, exitStart: 0.86, exitEnd: 0.98, distance: 36, blur: 14, fromScale: 0.9, toScale: 1.05 });

export default function ProjectTeaser({ dict }: { dict: Dictionary }) {
  const [email, setEmail] = useState("");
  const [botcheck, setBotcheck] = useState("");
  const { status, submit } = useSubscribeForm("/api/waitlist");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await submit({ email, botcheck });
    if (ok) setEmail("");
  }

  return (
    <section id="teaser">
      <CinematicScene heightVh={200} stageClassName="flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <SceneLayer keyframes={backgroundGlow} className="absolute inset-0 -z-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(50% 45% at 50% 50%, rgba(150,130,255,0.16), transparent 70%)",
            }}
          />
        </SceneLayer>

        <SceneLayer keyframes={card}>
          <GlassPanel className="max-w-3xl mx-auto rounded-3xl px-5 py-10 sm:px-8 sm:py-14 md:px-16 md:py-20 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-white/60 mb-6">
              {dict.teaser.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6">
              {dict.teaser.title}
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">{dict.teaser.description}</p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" noValidate>
              <div className="sr-only" aria-hidden="true">
                <input tabIndex={-1} autoComplete="off" value={botcheck} onChange={(e) => setBotcheck(e.target.value)} />
              </div>
              <label htmlFor="teaser-email" className="sr-only">Email</label>
              <input
                id="teaser-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dict.teaser.emailPlaceholder}
                className="flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-50"
              >
                {status === "submitting" ? dict.teaser.submitting : dict.teaser.submit}
              </button>
            </form>

            <p className="mt-4 text-sm" role="status" aria-live="polite">
              {status === "success" && <span className="text-emerald-400">{dict.teaser.success}</span>}
              {status === "error" && <span className="text-red-400">{dict.teaser.error}</span>}
            </p>
          </GlassPanel>
        </SceneLayer>
      </CinematicScene>
    </section>
  );
}
