import React, { useEffect, useRef, useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import SpaceBackground from "./SpaceBackground";
import { useLanguage } from "../context/LanguageContext";
import { useLocalizedSectionId } from "../hooks/useLocalizedSectionId";

type Person = { name: string; email: string };

const salesPeople: Person[] = [
  { name: "Tobias Rockas", email: "tobias.rockas@mitrox.io" },
];

const techPeople: Person[] = [
  { name: "Johannes Hurmerinta", email: "johannes.hurmerinta@mitrox.io" },
  { name: "Felix Miettinen", email: "felix.miettinen@mitrox.io" },
];

const EmailRow: React.FC<Person & { label?: string }> = ({ name, email, label }) => {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  return (
    <li className="flex items-center justify-between gap-6 py-2">
      <div className="min-w-0">
        {label && (
          <div className="text-[11px] uppercase tracking-[0.2em] text-body-caption font-semibold">
            {label}
          </div>
        )}
        <div className="text-sm text-gray-200 truncate">{name}</div>
        <a
          href={`mailto:${email}`}
          className="text-sm text-body-subtle hover:text-white underline-offset-4 hover:underline break-all"
        >
          {email}
        </a>
      </div>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          } catch {}
        }}
        className="shrink-0 rounded-md border border-white/10 px-2.5 py-1 text-xs text-gray-300 hover:bg-white/5"
        aria-label={isFinnish ? "Kopioi sähköposti" : "Copy email address"}
      >
        {copied ? (isFinnish ? "Kopioitu" : "Copied") : isFinnish ? "Kopioi" : "Copy"}
      </button>
    </li>
  );
};

const ContactForm: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [botcheck, setBotcheck] = useState("");
  const [isPreferredContactOpen, setIsPreferredContactOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const preferredContactRef = useRef<HTMLDivElement | null>(null);
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const contactId = useLocalizedSectionId("contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    preferredContact: "",
  });

  // Fade-in
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // ESC sulkee modaalin
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsModalOpen(false);
    if (isModalOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (preferredContactRef.current && !preferredContactRef.current.contains(event.target as Node)) {
        setIsPreferredContactOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handlePreferredContactChange = (value: string) => {
    setFormData((p) => ({ ...p, preferredContact: value }));
    setIsPreferredContactOpen(false);
  };

  const invalidReason = () => {
    if (!formData.name.trim()) return isFinnish ? "Täytä nimesi." : "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return isFinnish ? "Tarkista sähköposti." : "Please check the email address.";
    if (!formData.company.trim()) return isFinnish ? "Täytä yritys." : "Please add your company.";
    if (!formData.phone.trim()) return isFinnish ? "Täytä puhelin." : "Please add your phone number.";
    if (formData.message.trim().length < 5) return isFinnish ? "Kirjoita viesti (väh. 5 merkkiä)." : "Please write a short message (min. 5 characters).";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const reason = invalidReason();
    if (reason) {
      setErrorMsg(reason);
      setIsModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "193da3a3-3009-437b-8d44-2c1a539273fb", // käytetään suoraan
          to: "info@mitrox.io",                      // vastaanottaja
          subject: `${isFinnish ? "Uusi yhteydenotto" : "New contact"}: ${formData.company} – ${formData.name}`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          company: formData.company,
          phone: formData.phone,
          preferred_contact: formData.preferredContact,
          page_url: typeof window !== "undefined" ? window.location.href : "",
          botcheck,
        }),
      });

      const data = await res.json();
      if (!data?.success) throw new Error(data?.message || (isFinnish ? "Lähetys epäonnistui" : "Submission failed"));

      setSuccessMsg(
        isFinnish ? "Kiitos viestistä! Otamme sinuun yhteyttä pian." : "Thanks for your message! We’ll get back to you shortly."
      );
      setIsModalOpen(true);
      setFormData({ name: "", email: "", company: "", phone: "", message: "", preferredContact: "" });
      setBotcheck("");
    } catch (err: any) {
      setErrorMsg(err?.message || (isFinnish ? "Jotain meni pieleen. Yritä hetken päästä uudelleen." : "Something went wrong. Please try again in a moment."));
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id={contactId}
      ref={sectionRef}
      className={`relative py-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 overflow-hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{ backgroundColor: "#000000" }}
    >
      {/* Space Background */}
      <SpaceBackground className="absolute inset-0" starCount={150} speed={0.3} />

      {/* Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center p-4"
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full max-w-md rounded-xl bg-white/10 backdrop-blur-xl backdrop-saturate-150 p-6">
            <button
              aria-label={isFinnish ? "Sulje" : "Close"}
              onClick={() => setIsModalOpen(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/5"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold text-white">
              {successMsg
                ? isFinnish ? "Viesti lähetetty" : "Message sent"
                : errorMsg
                ? isFinnish ? "Lähetys epäonnistui" : "Submission failed"
                : isFinnish ? "Ilmoitus" : "Notice"}
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              {successMsg
                ? successMsg
                : errorMsg
                ? errorMsg
                : isFinnish
                ? "Voit olla meihin yhteydessä myös suoraan sähköpostilla. Vastamme yleensä 24 tunnin sisällä."
                : "You can also reach us directly by email. We typically reply within 24 hours."}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6">
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.18em] text-white/90 font-semibold">
                  {isFinnish ? "MYYNTI" : "SALES"}
                </div>
                <ul className="divide-y divide-white/10">
                  {salesPeople.map((p) => (
                    <EmailRow key={p.email} {...p} />
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.18em] text-white/90 font-semibold">
                  {isFinnish ? "TEKNINEN" : "TECH"}
                </div>
                <ul className="divide-y divide-white/10">
                  {techPeople.map((p) => (
                    <EmailRow key={p.email} {...p} />
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-6 text-xs text-gray-500">
              {isFinnish
                ? "Liitä viestiin yrityksesi nimi ja lyhyt kuvaus tarpeesta."
                : "Include your company name and a short description of your need."}
            </p>
          </div>
        </div>
      )}

      {/* Otsikko */}
      <header className="text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-semibold text-white">
          {isFinnish ? "Ota yhteyttä" : "Let's start the conversation"}
        </h2>
        <p className="mt-7 sm:mt-7 text-gray-400">
          {isFinnish ? "Kerro lyhyesti tarpeesi – palaamme mahdollisimman nopeasti." : "Share a few details about your project, and our team will reach out with ideas and next steps."}
        </p>
        <p className="mt-2 text-gray-400">
          {isFinnish
            ? "Nuoret asiantuntijamme rakentavat räätälöidyn ratkaisun yrityksellesi."
            : "Every message is answered personally by a Mitrox specialist."}
        </p>
      </header>

      <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1fr_1fr] items-start">
        {/* Lomake vasemmalla */}
        <div className="space-y-4">
          <div className="rounded-xl bg-white/5 backdrop-blur-xl backdrop-saturate-150 p-6 min-h-[600px] flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-6">{isFinnish ? "Lähetä viesti" : "Get in touch"}</h3>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="botcheck">{isFinnish ? "Jätä tyhjäksi" : "Leave empty"}</label>
              <input
                id="botcheck"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                value={botcheck}
                onChange={(e) => setBotcheck(e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm text-gray-300">
                  {isFinnish ? "Nimi *" : "Name *"}
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={isFinnish ? "Nimi" : "Your name"}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="company" className="text-sm text-gray-300">
                  {isFinnish ? "Yritys *" : "Company *"}
                </label>
                <input
                  id="company"
                  name="company"
                  required
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={isFinnish ? "Yrityksesi nimi" : "Company name"}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm text-gray-300">
                  {isFinnish ? "Sähköposti *" : "Email *"}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={isFinnish ? "sahkoposti@yritys.fi" : "your@email.com"}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-sm text-gray-300">
                  {isFinnish ? "Puhelin *" : "Phone *"}
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={isFinnish ? "+358 40 123 4567" : "+358 40 123 4567"}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="preferredContact" className="text-sm text-gray-300">
                {isFinnish ? "Mieluisin yhteydenottotapa" : "Preferred contact method"}
              </label>
              <div 
                ref={preferredContactRef}
                className="relative"
              >
                <button
                  type="button"
                  id="preferredContact"
                  onClick={() => setIsPreferredContactOpen(!isPreferredContactOpen)}
                  className={`w-full rounded-lg border text-left flex items-center justify-between transition-colors px-4 py-3 ${
                    formData.preferredContact
                      ? "bg-black border-white/10 text-white"
                      : "bg-black border-white/10 text-gray-400"
                  } hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <span>
                    {formData.preferredContact === "email"
                      ? (isFinnish ? "Sähköposti" : "Email")
                      : formData.preferredContact === "phone"
                      ? (isFinnish ? "Puhelin" : "Phone")
                      : formData.preferredContact === "text"
                      ? (isFinnish ? "Tekstiviesti" : "Text message")
                      : (isFinnish ? "Valitse..." : "Choose...")}
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${isPreferredContactOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isPreferredContactOpen && (
                  <div 
                    className="absolute z-50 w-full rounded-lg bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden top-full mt-2"
                  >
                    <button
                      type="button"
                      onClick={() => handlePreferredContactChange("email")}
                      className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                        formData.preferredContact === "email"
                          ? "bg-white/10 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {isFinnish ? "Sähköposti" : "Email"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePreferredContactChange("phone")}
                      className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                        formData.preferredContact === "phone"
                          ? "bg-white/10 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {isFinnish ? "Puhelin" : "Phone"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePreferredContactChange("text")}
                      className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                        formData.preferredContact === "text"
                          ? "bg-white/10 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {isFinnish ? "Tekstiviesti" : "Text message"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-sm text-gray-300">
                {isFinnish ? "Viesti *" : "Message *"}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder={isFinnish ? "Kuvaile lyhyesti tarpeesi…" : "Tell us a bit about your project or goals..."}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-medium text-black transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-300 max-w-fit mx-auto"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/70 border-t-transparent" />
                  {isFinnish ? "Lähetetään…" : "Sending…"}
                </>
              ) : (
                <>{isFinnish ? "Lähetä viesti" : "Get in touch"}</>
              )}
            </button>

            <p className="sr-only" role="status" aria-live="polite">
              {isSubmitting
                ? isFinnish ? "Lähetetään" : "Sending"
                : successMsg
                ? isFinnish ? "Lähetys onnistui" : "Submission succeeded"
                : errorMsg
                ? isFinnish ? "Lähetys epäonnistui" : "Submission failed"
                : ""}
            </p>
            </form>
          </div>
        </div>

        {/* Kalenteri oikealla */}
        <div className="space-y-4">
          <div className="w-full rounded-xl overflow-hidden" style={{ minHeight: "600px" }}>
            <iframe
              src={import.meta.env.VITE_CALENDAR_EMBED_URL || "https://69384f97621d6e2fa9f67a2d--inspiring-dodol-0e3278.netlify.app/book/mitrox-akcwztlrg"}
              width="100%"
              height="600"
              frameBorder="0"
              allow="payment"
              className="w-full border-0"
              style={{ 
                backgroundColor: "transparent",
                display: "block",
                border: "none",
                outline: "none"
              }}
              title={isFinnish ? "Ajanvarauskalenteri" : "Booking calendar"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;