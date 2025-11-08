// src/AffiliatePage.tsx
import React, { useState } from "react";
import SpaceBackground from "./components/SpaceBackground";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import SEOEnhanced from "./components/SEOEnhanced";
import ScrollToTop from "./components/ScrollToTop";
import { ArrowRight, Award, CheckCircle, Users, X } from "lucide-react";
import { buildMeta, organizationSchema, breadcrumbSchema } from "../lib/seo";
import { SEO_CONFIG } from "../config/seo.fi";
import { useLanguage } from "./context/LanguageContext";

export default function AffiliatePage() {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [botcheck, setBotcheck] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    website: "",
    message: "",
  });

  // ESC sulkee modaalin
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsModalOpen(false);
    if (isModalOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!formData.name.trim()) {
      setErrorMsg(isFinnish ? "Täytä nimesi." : "Please fill in your name.");
      setIsModalOpen(true);
      return;
    }
    if (!formData.company.trim()) {
      setErrorMsg(isFinnish ? "Täytä yrityksen nimi." : "Please fill in the company name.");
      setIsModalOpen(true);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg(isFinnish ? "Tarkista sähköposti." : "Please check your email.");
      setIsModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "193da3a3-3009-437b-8d44-2c1a539273fb",
          to: "info@mitrox.io",
          subject: `Affiliate-hakemus: ${formData.name}`,
          name: formData.name,
          company: formData.company,
          email: formData.email,
          website: formData.website || "Ei määritelty",
          message: formData.message || "Ei viestiä",
          page_url: typeof window !== "undefined" ? window.location.href : "",
          botcheck,
        }),
      });

      const data = await res.json();
      if (!data?.success) throw new Error(data?.message || (isFinnish ? "Lähetys epäonnistui" : "Submission failed"));

      setSuccessMsg(isFinnish ? "Kiitos hakemuksestasi! Otamme sinuun yhteyttä mahdollisimman pian ja lähetämme henkilökohtaisen kumppanikoodisi." : "Thank you for your application! We will contact you as soon as possible and send your personal partner code.");
      setIsModalOpen(true);
      setFormData({ name: "", company: "", email: "", website: "", message: "" });
      setBotcheck("");
    } catch (err: any) {
      setErrorMsg(err?.message || (isFinnish ? "Jotain meni pieleen. Yritä hetken päästä uudelleen." : "Something went wrong. Please try again in a moment."));
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // SEO_V2 enhancements (only when flag is enabled)
  const isSEO_V2 = import.meta.env.VITE_SEO_V2 === "true";
  const meta = isSEO_V2
    ? buildMeta({
        title: SEO_CONFIG.pages.affiliate.title,
        description: SEO_CONFIG.pages.affiliate.description,
        path: "/affiliate",
        keywords: SEO_CONFIG.pages.affiliate.keywords,
      })
    : undefined;
  const schemas = isSEO_V2
    ? [
        organizationSchema(),
        breadcrumbSchema(SEO_CONFIG.pages.affiliate.breadcrumbs),
      ]
    : [];

  return (
    <div className="min-h-screen bg-black text-white">
      <SpaceBackground className="top-0" />
      <SEOHead
        title={meta?.title || "Affiliate-ohjelma - Mitrox Oy | Hanki ilmaisia kuukausia"}
        description={meta?.description || "Liity Mitroxin affiliate-ohjelmaan ja saa ilmaisia kuukausia palveluistamme jokaisesta tuomastasi asiakkaasta. Myös uusi asiakas hyötyy ilmaisista kuukausista."}
        url={meta?.url || "https://mitrox.io/affiliate"}
        keywords={meta?.keywords}
      />
      {isSEO_V2 && <SEOEnhanced meta={meta} schemas={schemas} lang="fi" />}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 text-white" style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 600 }}>
            {isFinnish ? "Mitroxin kumppaniohjelma - Kasvamme yhdessä" : "Mitrox Affiliate Program - Growing Together"}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {isFinnish ? "Liity Mitroxin kumppaniksi ja ansaitse palkintoja suosittelemalla palveluitamme eteenpäin. Sekä sinä että uusi asiakas hyötyvät. Kumppanuus, jossa kaikki voittavat." : "Join Mitrox as a partner and earn rewards by recommending our services."}
            {!isFinnish && (
              <>
                <br /><br />
                Both you and your referred customers benefit a partnership built on shared growth.
              </>
            )}
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
              <div className="mb-6 text-gray-400">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {isFinnish ? "1. Palkitseva kumppanuus" : "1. Rewarding Partnership"}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {isFinnish ? "Jokaisesta suosittelemastasi asiakkaasta saat yhden ilmaisen kuukauden omaan Mitrox-palveluusi." : "For every customer you refer, you'll receive one free month of your own Mitrox service."}
                <br /><br />
                {isFinnish ? "Mitä enemmän suosittelet, sitä enemmän ilmaisia kuukausia kertyy – reilu ja läpinäkyvä tapa hyötyä yhteisestä kasvusta." : "The more referrals you bring, the more free months you collect — a transparent and fair way to grow together."}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
              <div className="mb-6 text-gray-400">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {isFinnish ? "2. Uusi asiakas palkitaan heti alusta" : "Your Customers Benefit Too"}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {isFinnish ? "Liittyessään Mitrox-palveluun käyttäessään kumppanikoodiasi uusi asiakas saa ensimmäisen kuukauden maksutta." : "When a new customer joins using your partner code, they get their first month free."}
                <br /><br />
                {isFinnish ? "Se on luonteva tapa aloittaa yhteistyö ja kokea Mitroxin palvelun arvo jo ensimmäisestä päivästä lähtien." : "It's a simple way to start cooperation and let them experience the value of Mitrox from day one."}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
              <div className="mb-6 text-gray-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {isFinnish ? "3. Helppo ja maksuton liittyminen" : "Simple, Free, and Effortless"}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {isFinnish ? "Kumppaniohjelmaan liittyminen on täysin ilmaista eikä vaadi sitoumuksia." : "Joining the affiliate program is completely free. No contracts, no hidden conditions."}
                <br /><br />
                {isFinnish ? "Liity, jaa henkilökohtainen kumppanikoodisi ja ala ansaita ilmaisia kuukausia heti – me hoidamme loput." : "Just share your personal partner code and start earning free months instantly. We'll take care of the rest."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-medium mb-4 text-white">
              {isFinnish ? "Miten se toimii?" : "How It Works"}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {isFinnish ? "Kolme yksinkertaista askelta kohti kannattavaa kumppanuutta." : "Three simple steps to start earning with Mitrox — quick, fair, and transparent."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-semibold text-white">1</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {isFinnish ? "Liity kumppaniohjelmaan" : "Join the Affiliate Program"}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {isFinnish ? "Täytä lyhyt lomake ja saat henkilökohtaisen kumppanilinkin heti käyttöösi." : "Fill out a short form to receive your personal partner link instantly."}
                <br /><br />
                {isFinnish ? "Liittyminen on maksutonta, eikä se velvoita mihinkään – pääset alkuun muutamassa minuutissa." : "Joining is completely free and comes with no obligations — you can get started in just a few minutes."}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-semibold text-white">2</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {isFinnish ? "Jaa kumppanikoodisi eteenpäin" : "Share Your Partner Code"}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {isFinnish ? "Jaa henkilökohtainen kumppanikoodisi verkostossasi, sosiaalisessa mediassa tai asiakkaillesi." : "Share your personal partner code within your network, on social media, or directly with your clients."}
                <br /><br />
                {isFinnish ? "Jokainen rekisteröityminen kumppanikoodillasi seurataan automaattisesti – sinä keskityt vain suositteluun, me hoidamme loput." : "Each registration made through your code is tracked automatically — you focus on referrals, and we take care of the rest."}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-semibold text-white">3</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {isFinnish ? "Ansaitse ilmainen kuukausi" : "Earn Free Months"}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {isFinnish ? "Kun uusi asiakas aloittaa palvelun käyttäessään kumppanikoodiasi, saat yhden ilmaisen kuukauden omaan Mitrox-palveluusi." : "When a new customer subscribes using your partner code, you'll receive one free month of your own Mitrox service."}
                <br /><br />
                {isFinnish ? "Myös uusi asiakas saa ensimmäisen kuukauden veloituksetta – reilu ja palkitseva yhteistyö molemmille." : "The referred customer also gets their first month free — a fair, win–win partnership from day one."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Details */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 lg:p-12 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-gray-400" />
              <h2 className="text-2xl sm:text-3xl font-medium text-white">
                {isFinnish ? "Miten ilmainen kuukausi toimii?" : "How Does the Free Month Work?"}
              </h2>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    {isFinnish ? "Ilmainen kuukausi sinulle" : "Free Month for You"}
                  </h3>
                  <p className="text-gray-400">
                    {isFinnish ? "Jokaisesta uudesta asiakkaasta, joka liittyy palveluumme käyttäen henkilökohtaista kumppanikoodiasi, saat yhden ilmaisen kuukauden omaan Mitrox-palveluusi." : "For every new customer who joins using your personal partner code, you'll receive one free month of your own Mitrox service."}
                    <br /><br />
                    {isFinnish ? "Palkitseminen tapahtuu, kun uusi asiakas on suorittanut ensimmäisen maksukuukautensa – näin ohjelma pysyy reiluna ja läpinäkyvänä kaikille." : "The reward is activated after the referred customer completes their first paid month — ensuring a fair and transparent program for everyone."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    {isFinnish ? "Ilmainen kuukausi myös uudelle asiakkaalle" : "Free Month for Your Customer Too"}
                  </h3>
                  <p className="text-gray-400">
                    {isFinnish ? "Uusi asiakas saa liittyessään kahden kuukauden Mitrox-jakson, josta ensimmäinen on maksullinen ja toinen täysin ilmainen." : "Each new customer starts with a two-month Mitrox period. They pay for the first month, and the second one is completely free."}
                    <br /><br />
                    {isFinnish ? "Tämä antaa mahdollisuuden kokeilla palvelua rauhassa ja nähdä sen todellisen arvon ennen pidempää päätöstä." : "This gives them time to explore the service, see real results, and make an informed decision about continuing long-term."}
                  </p>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-medium mb-4 text-white">
            {isFinnish ? "Valmis aloittamaan?" : "Ready to Get Started?"}
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            {isFinnish ? "Liity kumppaniohjelmaamme täyttämällä lomake tai ota yhteyttä suoraan." : "Join the Mitrox Affiliate Program by filling out the form below — or contact us directly if you have questions."}
            {!isFinnish && (
              <>
                <br /><br />
                We'll guide you through every step.
              </>
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#join-form"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-black hover:bg-gray-100 font-medium transition-all duration-300 gap-2"
            >
              {isFinnish ? "Liity ohjelmaan" : "Become a Partner"}
              <ArrowRight className="w-4 h-4" />
            </a>

          </div>
        </div>
      </section>

      {/* Join Form Section */}
      <section id="join-form" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 lg:p-12 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-6 text-white text-center">
              {isFinnish ? "Liity kumppaniohjelmaan" : "Join the Affiliate Program"}
            </h2>
            <p className="text-gray-400 mb-8 text-center">
              {isFinnish ? "Täytä lomake, niin otamme sinuun yhteyttä mahdollisimman pian ja lähetämme henkilökohtaisen kumppanikoodisi." : "Fill out the form, and we'll contact you as soon as possible with your personal partner code and onboarding details."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="botcheck" value={botcheck} onChange={(e) => setBotcheck(e.target.value)} />

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  {isFinnish ? "Yrityksen nimi *" : "Company Name *"}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                  placeholder={isFinnish ? "Yrityksen nimi Oy" : "Company Name Ltd"}
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  {isFinnish ? "Nimi *" : "Name *"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                  placeholder={isFinnish ? "Etunimi Sukunimi" : "First and Last Name"}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  {isFinnish ? "Sähköposti *" : "Email *"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                  placeholder={isFinnish ? "sahkoposti@esimerkki.fi" : "your@email.com"}
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                  {isFinnish ? "Verkkosivusto tai sosiaalisen median profiili (valinnainen)" : "Website or Social Media Profile (optional)"}
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                  placeholder={isFinnish ? "https://esimerkki.fi" : "https://example.com"}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  {isFinnish ? "Viesti (valinnainen)" : "Message (optional)"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors resize-none"
                  placeholder={isFinnish ? "Kerro meille itsestäsi ja miten aiot jakaa kumppanikoodiasi..." : "Tell us briefly about yourself and how you plan to share your partner code…"}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-3 rounded-full bg-white text-black hover:bg-gray-100 font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/70 border-t-transparent" />
                    {isFinnish ? "Lähetetään…" : "Submitting…"}
                  </>
                ) : (
                  <>
                    {isFinnish ? "Lähetä hakemus" : "Apply Now"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Success/Error Modal */}
            {isModalOpen && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={() => setIsModalOpen(false)}
              >
                <div
                  className="relative w-full max-w-md bg-black rounded-2xl border border-white/10 p-8 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 border border-white/20 hover:bg-black/80 transition-colors text-white"
                    aria-label={isFinnish ? "Sulje" : "Close"}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {successMsg ? (
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-white mb-2">{isFinnish ? "Hakemus lähetetty!" : "Application Sent!"}</h3>
                      <p className="text-gray-300">{successMsg}</p>
                    </div>
                  ) : errorMsg ? (
                    <div className="text-center">
                      <X className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-white mb-2">{isFinnish ? "Virhe" : "Error"}</h3>
                      <p className="text-gray-300">{errorMsg}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}