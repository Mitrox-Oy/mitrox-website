import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useLocalizedSectionId } from "../hooks/useLocalizedSectionId";

const UpcomingProjectTeaser: React.FC = () => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const waitlistId = useLocalizedSectionId("waitlist");

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [botcheck, setBotcheck] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "193da3a3-3009-437b-8d44-2c1a539273fb",
          to: "info@mitrox.io",
          subject: isFinnish ? "Uusi jonotuslistan liittyjä" : "New waitlist signup",
          email,
          page_url: typeof window !== "undefined" ? window.location.href : "",
          botcheck,
        }),
      });
      const data = await res.json();
      if (!data?.success) throw new Error(data?.message);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={waitlistId} className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto glass rounded-3xl px-8 py-14 md:px-16 md:py-20 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-body-caption mb-6">
          {isFinnish ? "Tulossa" : "Coming soon"}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-6">
          {isFinnish ? "Rakennamme jotain uutta" : "We're building something new"}
        </h2>
        <p className="text-lg text-body-subtle max-w-xl mx-auto mb-10">
          {isFinnish
            ? "Työstämme parhaillaan uutta alustaa, joka yhdistää yhteisön ja kaupankäynnin tavalla, jota et ole vielä nähnyt. Lisää tietoa julkistetaan lähempänä julkaisua."
            : "We're quietly working on a new platform that brings community and commerce together in a way you haven't seen yet. More details soon — as we get closer to launch."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" noValidate>
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="teaser-botcheck">{isFinnish ? "Jätä tyhjäksi" : "Leave empty"}</label>
            <input
              id="teaser-botcheck"
              tabIndex={-1}
              autoComplete="off"
              value={botcheck}
              onChange={(e) => setBotcheck(e.target.value)}
            />
          </div>
          <label htmlFor="teaser-email" className="sr-only">
            {isFinnish ? "Sähköpostiosoite" : "Email address"}
          </label>
          <input
            id="teaser-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isFinnish ? "sinun@sahkoposti.fi" : "you@email.com"}
            className="flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isSubmitting
              ? isFinnish ? "Lähetetään…" : "Joining…"
              : isFinnish ? "Liity jonotuslistalle" : "Join the waitlist"}
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </form>

        <p className="mt-4 text-sm" role="status" aria-live="polite">
          {status === "success" && (
            <span className="text-emerald-400">
              {isFinnish ? "Kiitos! Olet nyt jonotuslistalla." : "Thanks! You're on the list."}
            </span>
          )}
          {status === "error" && (
            <span className="text-red-400">
              {isFinnish ? "Tarkista sähköpostiosoite ja yritä uudelleen." : "Please check your email and try again."}
            </span>
          )}
        </p>
      </div>
    </section>
  );
};

export default UpcomingProjectTeaser;
