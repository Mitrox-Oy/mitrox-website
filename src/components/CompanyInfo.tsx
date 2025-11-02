import React from "react";
import { Shield, Zap, Target } from "lucide-react";

const CompanyInfo: React.FC = () => {
  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Luotettavuus",
      description:
        "Toimitamme sovitusti ja pidämme lupauksemme. Asiakkaamme voivat luottaa meihin.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Helppous",
      description:
        "Ratkaisumme ovat selkeitä ja käyttäjäystävällisiä — ilman turhaa monimutkaisuutta.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Täsmällisyys",
      description:
        "Huolehdimme yksityiskohdista ja varmistamme, että kaikki toimii kuten on sovittu.",
    },
  ];

  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4">
            Keitä olemme
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Mitrox on suomalainen teknologiayritys, jonka perustajina toimivat
            intohimoiset nuoret. Uskomme vahvasti teknologian tulevaisuuteen
            ja sen potentiaaliin.
          </p>
        </div>

        {/* Company Description */}
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-gray-300 leading-relaxed text-center">
            Työskentelemme tehokkaalla periaatteella: teemme asiat kerralla
            mutta perusteellisesti. Et jää koskaan yksin – tarjoamme tukea ja
            asiantuntemusta aina, kun sitä tarvitset.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 text-center"
            >
              <div className="mb-4 flex items-center justify-center text-gray-400 group-hover:text-gray-300 transition-colors">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {value.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;

