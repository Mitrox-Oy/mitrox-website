import React from "react";
import { Shield, Zap, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Value = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const CompanyInfo: React.FC = () => {
  const values: Value[] = [
    {
      icon: Shield,
      title: "Luotettavuus",
      description:
        "Toimitamme sovitusti ja pidämme lupauksemme. Asiakkaamme voivat luottaa meihin.",
    },
    {
      icon: Zap,
      title: "Helppous",
      description:
        "Ratkaisumme ovat selkeitä ja käyttäjäystävällisiä — ilman turhaa monimutkaisuutta.",
    },
    {
      icon: Target,
      title: "Täsmällisyys",
      description:
        "Huolehdimme yksityiskohdista ja varmistamme, että kaikki toimii kuten on sovittu.",
    },
  ];

  return (
    <section className="relative bg-black py-24 sm:py-32 overflow-hidden">
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-5">
          <span className="text-[0.7rem] uppercase tracking-[0.5em] text-white/50">
            [ Keitä olemme ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white">
            Keitä olemme
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-white/70">
            Mitrox on suomalainen teknologiayritys, jonka perustajina toimivat
            intohimoiset nuoret. Uskomme vahvasti teknologian tulevaisuuteen
            ja sen potentiaaliin.
          </p>
        </div>

        <div className="mb-20 max-w-3xl">
          <p className="text-base leading-relaxed text-white/70">
            Työskentelemme tehokkaalla periaatteella: teemme asiat kerralla
            mutta perusteellisesti. Et jää koskaan yksin – tarjoamme tukea ja
            asiantuntemusta aina, kun sitä tarvitset.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-black/85 p-8 transition-colors hover:border-white/[0.14]"
            >
              <div className="flex h-full flex-col gap-4">
                <h3 className="text-xl font-medium text-white">{value.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {value.description}
                </p>
              </div>

              <div className="pointer-events-none absolute -bottom-14 -right-10 opacity-0 transition duration-500 group-hover:opacity-45">
                <value.icon className="h-44 w-44 text-white/[0.05]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;

