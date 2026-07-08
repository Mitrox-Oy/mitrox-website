"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import GlassPanel from "@/components/ui/GlassPanel";
import CinematicScene from "@/components/motion/CinematicScene";
import SceneLayer from "@/components/motion/SceneLayer";
import { enterHoldExit } from "@/components/motion/keyframes";
import { useSubscribeForm } from "./useSubscribeForm";

const reveal = enterHoldExit({ enterStart: 0, enterEnd: 0.18, exitStart: 0.88, exitEnd: 0.99, distance: 22, blur: 6, fromScale: 0.98, toScale: 1.01 });

export default function ContactGeneral({ dict }: { dict: Dictionary }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [botcheck, setBotcheck] = useState("");
  const { status, submit } = useSubscribeForm("/api/contact");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await submit({ email, name, message, botcheck });
    if (ok) {
      setName("");
      setEmail("");
      setMessage("");
    }
  }

  return (
    <section id="contact">
      <CinematicScene heightVh={170} stageClassName="flex items-center px-4 sm:px-6 lg:px-8">
        <SceneLayer keyframes={reveal} className="w-full">
          <GlassPanel hover glow className="max-w-2xl mx-auto rounded-3xl px-5 py-10 sm:px-8 sm:py-14 md:px-12 md:py-16">
            <span className="text-xs uppercase tracking-[0.35em] text-white/50">{dict.contact.eyebrow}</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">{dict.contact.title}</h2>
            <p className="mt-4 text-white/70">{dict.contact.description}</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
              <div className="sr-only" aria-hidden="true">
                <input tabIndex={-1} autoComplete="off" value={botcheck} onChange={(e) => setBotcheck(e.target.value)} />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={dict.contact.namePlaceholder}
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dict.contact.emailPlaceholder}
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={dict.contact.messagePlaceholder}
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-50"
              >
                {status === "submitting" ? dict.contact.submitting : dict.contact.submit}
              </button>
            </form>

            <p className="mt-4 text-sm" role="status" aria-live="polite">
              {status === "success" && <span className="text-emerald-400">{dict.contact.success}</span>}
              {status === "error" && <span className="text-red-400">{dict.contact.error}</span>}
            </p>
          </GlassPanel>
        </SceneLayer>
      </CinematicScene>
    </section>
  );
}
