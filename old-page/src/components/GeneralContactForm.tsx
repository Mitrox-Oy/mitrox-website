import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useLocalizedSectionId } from "../hooks/useLocalizedSectionId";

const GeneralContactForm: React.FC = () => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const generalContactId = useLocalizedSectionId("general-contact");

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [botcheck, setBotcheck] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const invalidReason = () => {
    if (!formData.name.trim()) return isFinnish ? "Täytä nimesi." : "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return isFinnish ? "Tarkista sähköposti." : "Please check the email address.";
    if (formData.message.trim().length < 5) return isFinnish ? "Kirjoita viesti (väh. 5 merkkiä)." : "Please write a short message (min. 5 characters).";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (invalidReason()) {
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
          subject: `${isFinnish ? "Yleinen yhteydenotto" : "General inquiry"}: ${formData.name}`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          page_url: typeof window !== "undefined" ? window.location.href : "",
          botcheck,
        }),
      });
      const data = await res.json();
      if (!data?.success) throw new Error(data?.message);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={generalContactId} className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto glass rounded-2xl p-8 md:p-10">
        <h2 className="text-2xl sm:text-3xl font-medium text-white mb-2 text-center">
          {isFinnish ? "Yleiset kysymykset" : "General inquiries"}
        </h2>
        <p className="text-sm text-body-subtle text-center mb-8">
          {isFinnish
            ? "Muu kysymys kuin asiakastyö? Lähetä lyhyt viesti, niin vastaamme pian."
            : "Have a question that isn't about custom software work? Send a short note and we'll get back to you."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="general-botcheck">{isFinnish ? "Jätä tyhjäksi" : "Leave empty"}</label>
            <input
              id="general-botcheck"
              tabIndex={-1}
              autoComplete="off"
              value={botcheck}
              onChange={(e) => setBotcheck(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="general-name" className="text-sm text-gray-300">
              {isFinnish ? "Nimi *" : "Name *"}
            </label>
            <input
              id="general-name"
              name="name"
              required
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={isFinnish ? "Nimi" : "Your name"}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="general-email" className="text-sm text-gray-300">
              {isFinnish ? "Sähköposti *" : "Email *"}
            </label>
            <input
              id="general-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={isFinnish ? "sahkoposti@yritys.fi" : "your@email.com"}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="general-message" className="text-sm text-gray-300">
              {isFinnish ? "Viesti *" : "Message *"}
            </label>
            <textarea
              id="general-message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder={isFinnish ? "Kysymyksesi…" : "Your question…"}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-medium text-black transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-300"
            aria-busy={isSubmitting}
          >
            {isSubmitting
              ? isFinnish ? "Lähetetään…" : "Sending…"
              : isFinnish ? "Lähetä viesti" : "Send message"}
          </button>

          <p className="text-sm text-center" role="status" aria-live="polite">
            {status === "success" && (
              <span className="text-emerald-400">
                {isFinnish ? "Kiitos viestistä!" : "Thanks for your message!"}
              </span>
            )}
            {status === "error" && (
              <span className="text-red-400">
                {isFinnish ? "Tarkista tiedot ja yritä uudelleen." : "Please check your details and try again."}
              </span>
            )}
          </p>
        </form>
      </div>
    </section>
  );
};

export default GeneralContactForm;
