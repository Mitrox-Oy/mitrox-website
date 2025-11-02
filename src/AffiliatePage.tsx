// src/AffiliatePage.tsx
import React, { useState } from "react";
import SpaceBackground from "./components/SpaceBackground";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import ScrollToTop from "./components/ScrollToTop";
import { ArrowRight, TrendingUp, DollarSign, Users, Award, CheckCircle, X } from "lucide-react";

export default function AffiliatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [botcheck, setBotcheck] = useState("");

  const [formData, setFormData] = useState({
    name: "",
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
      setErrorMsg("Täytä nimesi.");
      setIsModalOpen(true);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg("Tarkista sähköposti.");
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
          email: formData.email,
          website: formData.website || "Ei määritelty",
          message: formData.message || "Ei viestiä",
          page_url: typeof window !== "undefined" ? window.location.href : "",
          botcheck,
        }),
      });

      const data = await res.json();
      if (!data?.success) throw new Error(data?.message || "Lähetys epäonnistui");

      setSuccessMsg("Kiitos hakemuksestasi! Otamme sinuun yhteyttä mahdollisimman pian ja lähetämme henkilökohtaisen affiliate-linkkisi.");
      setIsModalOpen(true);
      setFormData({ name: "", email: "", website: "", message: "" });
      setBotcheck("");
    } catch (err: any) {
      setErrorMsg(err?.message || "Jotain meni pieleen. Yritä hetken päästä uudelleen.");
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SpaceBackground className="top-0" />
      <SEOHead
        title="Affiliate-ohjelma - Mitrox Oy | Hanki ilmaisia kuukausia"
        description="Liity Mitroxin affiliate-ohjelmaan ja saa ilmaisia kuukausia palveluistamme jokaisesta tuomastasi asiakkaasta. Myös uusi asiakas hyötyy ilmaisista kuukausista."
        url="https://mitrox.io/affiliate"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 text-white" style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 600 }}>
            Affiliate-ohjelma
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Tuo meille uusia asiakkaita ja saat ilmaisia kuukausia palveluistamme. Myös uusi asiakas hyötyy ilmaisista kuukausista - kaikki voittavat!
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
              <div className="mb-6 text-gray-400">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                Ilmaisia kuukausia sinulle
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Jokaisesta tuomastasi asiakkaasta saat ilmaisia kuukausia palveluistamme. Mitä enemmän asiakkaita tuot, sitä enemmän ilmaisia kuukausia kertyy.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
              <div className="mb-6 text-gray-400">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                Ilmaisia kuukausia myös uudelle asiakkaalle
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Myös uusi asiakas saa ilmaisia kuukausia linkkisi kautta rekisteröityessään. Molemmat hyötyvät - win-win tilanne!
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
              <div className="mb-6 text-gray-400">
                <DollarSign className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                Täysin ilmainen liittyminen
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Liittyminen on täysin ilmaista. Ei piilotettuja kustannuksia tai kuukausimaksuja. Aloita heti ja ala kerätä ilmaisia kuukausia.
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
              Miten se toimii?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Kolme yksinkertaista vaihetta aloittamiseen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-semibold text-white">1</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                Liity ohjelmaan
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Täytä lomake alla ja saat henkilökohtaisen affiliate-linkkisi heti käyttöösi.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-semibold text-white">2</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                Jaa linkkiäsi
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Jaa henkilökohtaista linkkiäsi verkossa, somessa tai verkostollesi. Jokainen klikkaus seurataan.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-semibold text-white">3</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                Saat ilmaisia kuukausia
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Kun joku rekisteröityy linkkisi kautta ja muuttuu maksavaksi asiakkaaksi, saat ilmaisia kuukausia palveluistamme. Myös uusi asiakas saa ilmaisia kuukausia.
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
                Miten ilmaiset kuukaudet toimivat?
              </h2>
            </div>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    Ilmaisia kuukausia sinulle
                  </h3>
                  <p className="text-gray-400">
                    Jokaisesta linkkisi kautta rekisteröityvästä maksavasta asiakkaasta saat ilmaisia kuukausia palveluistamme (AI Agent / Chatbot tai muut kuukausittaiset palvelut).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    Ilmaisia kuukausia myös uudelle asiakkaalle
                  </h3>
                  <p className="text-gray-400">
                    Uusi asiakas saa myös ilmaisia kuukausia rekisteröityessään linkkisi kautta. Molemmat hyötyvät - se on win-win tilanne!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    Seuraa ilmaisia kuukausia
                  </h3>
                  <p className="text-gray-400">
                    Saat pääsyn dashboardiin, jossa voit seurata kuinka monta ilmaista kuukautta olet saanut ja miten paljon lisää voit vielä ansaita.
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
            Valmis aloittamaan?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Liity affiliate-ohjelmaamme täyttämällä lomake tai ota yhteyttä suoraan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#join-form"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-black hover:bg-gray-100 font-medium transition-all duration-300 gap-2"
            >
              Liity ohjelmaan
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:info@mitrox.io?subject=Affiliate-ohjelma"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-black/60 hover:border-white/20 font-medium transition-all duration-300"
            >
              Ota yhteyttä
            </a>
          </div>
        </div>
      </section>

      {/* Join Form Section */}
      <section id="join-form" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 lg:p-12 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-6 text-white text-center">
              Liity affiliate-ohjelmaan
            </h2>
            <p className="text-gray-400 mb-8 text-center">
              Täytä lomake, niin otamme sinuun yhteyttä mahdollisimman pian ja lähetämme henkilökohtaisen affiliate-linkkisi.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="botcheck" value={botcheck} onChange={(e) => setBotcheck(e.target.value)} />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nimi *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                  placeholder="Etunimi Sukunimi"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Sähköposti *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                  placeholder="sahkoposti@esimerkki.fi"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                  Verkkosivusto tai sosiaalisen median profiili (valinnainen)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                  placeholder="https://esimerkki.fi"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Viesti (valinnainen)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors resize-none"
                  placeholder="Kerro meille itsestäsi ja miten aiot jakaa linkkiäsi..."
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
                    Lähetetään…
                  </>
                ) : (
                  <>
                    Lähetä hakemus
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
                    aria-label="Sulje"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {successMsg ? (
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-white mb-2">Hakemus lähetetty!</h3>
                      <p className="text-gray-300">{successMsg}</p>
                    </div>
                  ) : errorMsg ? (
                    <div className="text-center">
                      <X className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-white mb-2">Virhe</h3>
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

