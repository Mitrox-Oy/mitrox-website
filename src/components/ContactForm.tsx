import React, { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import SpaceBackground from "./SpaceBackground";

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
  return (
    <li className="flex items-center justify-between gap-6 py-2">
      <div className="min-w-0">
        {label && (
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/70 font-semibold">
            {label}
          </div>
        )}
        <div className="text-sm text-gray-200 truncate">{name}</div>
        <a
          href={`mailto:${email}`}
          className="text-sm text-white/70 hover:text-white underline-offset-4 hover:underline break-all"
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
        aria-label="Kopioi sähköposti"
      >
        {copied ? "Kopioitu" : "Kopioi"}
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
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const invalidReason = () => {
    if (!formData.name.trim()) return "Täytä nimesi.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Tarkista sähköposti.";
    if (!formData.company.trim()) return "Täytä yritys.";
    if (!formData.phone.trim()) return "Täytä puhelin.";
    if (formData.message.trim().length < 5) return "Kirjoita viesti (väh. 5 merkkiä).";
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
          subject: `Uusi yhteydenotto: ${formData.company} – ${formData.name}`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          company: formData.company,
          phone: formData.phone,
          page_url: typeof window !== "undefined" ? window.location.href : "",
          botcheck,
        }),
      });

      const data = await res.json();
      if (!data?.success) throw new Error(data?.message || "Lähetys epäonnistui");

      setSuccessMsg("Kiitos viestistä! Otamme sinuun yhteyttä pian.");
      setIsModalOpen(true);
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      setBotcheck("");
    } catch (err: any) {
      setErrorMsg(err?.message || "Jotain meni pieleen. Yritä hetken päästä uudelleen.");
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
              aria-label="Sulje"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/5"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold text-white">
              {successMsg ? "Viesti lähetetty" : errorMsg ? "Lähetys epäonnistui" : "Ilmoitus"}
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              {successMsg
                ? successMsg
                : errorMsg
                ? errorMsg
                : "Voit olla meihin yhteydessä myös suoraan sähköpostilla. Vastamme yleensä 24 tunnin sisällä."}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6">
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.18em] text-white/90 font-semibold">MYYNTI</div>
                <ul className="divide-y divide-white/10">
                  {salesPeople.map((p) => (
                    <EmailRow key={p.email} {...p} />
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.18em] text-white/90 font-semibold">TEKNINEN</div>
                <ul className="divide-y divide-white/10">
                  {techPeople.map((p) => (
                    <EmailRow key={p.email} {...p} />
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-6 text-xs text-gray-500">Liitä viestiin yrityksesi nimi ja lyhyt kuvaus tarpeesta.</p>
          </div>
        </div>
      )}

      {/* Otsikko */}
      <header className="text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-semibold text-white">Ota yhteyttä</h2>
        <p className="mt-3 text-gray-400">Kerro lyhyesti tarpeesi – palaamme mahdollisimman nopeasti.</p>
        <p className="mt-2 text-gray-400 text-sm">Nuoret asiantuntijamme rakentavat räätälöidyn ratkaisun yrityksellesi.</p>
      </header>

      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.05fr_1fr]">
        {/* Lomake boxi */}
        <div className="lg:col-span-2 max-w-2xl mx-auto space-y-4">
          {/* Lomake boxi */}
          <div className="rounded-xl bg-white/5 backdrop-blur-xl backdrop-saturate-150 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Lähetä viesti</h3>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="botcheck">Jätä tyhjäksi</label>
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
                <label htmlFor="name" className="text-sm text-gray-300">Nimi *</label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nimi"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="company" className="text-sm text-gray-300">Yritys *</label>
                <input
                  id="company"
                  name="company"
                  required
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Yrityksesi nimi"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm text-gray-300">Sähköposti *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="sahkoposti@yritys.fi"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-sm text-gray-300">Puhelin *</label>
                <input
                  id="phone"
                  name="phone"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+358 40 123 4567"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-sm text-gray-300">Viesti *</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Kuvaile lyhyesti tarpeesi…"
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
                  Lähetetään…
                </>
              ) : (
                <>Lähetä viesti</>
              )}
            </button>

            <p className="sr-only" role="status" aria-live="polite">
              {isSubmitting ? "Lähetetään" : successMsg ? "Lähetys onnistui" : errorMsg ? "Lähetys epäonnistui" : ""}
            </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;