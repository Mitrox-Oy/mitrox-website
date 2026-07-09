import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useLocalizedSectionId } from "../hooks/useLocalizedSectionId";

const CareersSection: React.FC = () => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const careersId = useLocalizedSectionId("careers");

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
          subject: isFinnish ? "Uusi talent pool -ilmoittautuminen" : "New talent pool signup",
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
    <section id={careersId} className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto glass rounded-3xl px-8 py-14 md:px-16 md:py-20 text-center">
        <Sparkles className="w-6 h-6 mx-auto mb-6 text-white/60" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-6">
          {isFinnish ? "Emme rekrytoi juuri nyt" : "We're not hiring right now"}
        </h2>
        <p className="text-lg text-body-subtle max-w-xl mx-auto mb-10">
          {isFinnish
            ? "Mitroxilla ei ole avoimia paikkoja tällä hetkellä, mutta olemme aina kiinnostuneita kuulemaan poikkeuksellisen taitavista tekijöistä. Jätä sähköpostisi, niin otamme yhteyttä, kun sopiva mahdollisuus avautuu."
            : "We don't have open roles at the moment, but we're always glad to hear from exceptional people. Leave your email and we'll reach out when the right opportunity comes up."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" noValidate>
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="careers-botcheck">{isFinnish ? "Jätä tyhjäksi" : "Leave empty"}</label>
            <input
              id="careers-botcheck"
              tabIndex={-1}
              autoComplete="off"
              value={botcheck}
              onChange={(e) => setBotcheck(e.target.value)}
            />
          </div>
          <label htmlFor="careers-email" className="sr-only">
            {isFinnish ? "Sähköpostiosoite" : "Email address"}
          </label>
          <input
            id="careers-email"
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
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? isFinnish ? "Lähetetään…" : "Submitting…"
              : isFinnish ? "Liity talent pooliin" : "Join the talent pool"}
          </button>
        </form>

        <p className="mt-4 text-sm" role="status" aria-live="polite">
          {status === "success" && (
            <span className="text-emerald-400">
              {isFinnish ? "Kiitos! Olemme yhteydessä, kun sopiva rooli avautuu." : "Thanks! We'll be in touch when a fitting role opens up."}
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

export default CareersSection;
