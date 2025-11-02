import React from "react";

const CompanyStory: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Story Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-medium text-white mb-6">
              Meidän tarinamme
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Mitrox syntyi uskosta siihen, että teknologia voi tehdä
                liiketoiminnasta helpompaa ja tehokkaampaa. Perustajamme,
                intohimoiset nuoret suomalaiset, kokoontuivat yhteen idean
                ympärille: luoda ratkaisuja, jotka todella toimivat ja
                auttavat yrityksiä kasvamaan.
              </p>
              <p>
                Aloitimme pienestä, mutta suurella visiolla. Jokainen projekti
                on meille mahdollisuus oppia, kehittyä ja parantaa. Asiakkaidemme
                menestys on meidän menestyksemme, ja siksi panostamme jokaiseen
                yksityiskohtaan.
              </p>
              <p>
                Tänään olemme kasvaneet vahvaksi tiimiksi, joka yhdistää
                teknologisen osaamisen, luovuuden ja ymmärryksen
                liiketoiminnan tarpeista. Tulevaisuudessa haluamme olla
                se kumppani, johon suomalaiset yritykset luottavat, kun
                tarvitaan ratkaisuja, jotka todella toimivat.
              </p>
            </div>
          </div>

          {/* Visual Element / Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg bg-white/[0.02] backdrop-blur-xl border border-white/10 flex items-center justify-center">
              <p className="text-gray-500 text-sm">
                [ Kuvan paikka: Yrityskuva / Tiimikuva ]
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-medium text-white mb-4">
              Visiomme
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Olemme sitoutuneita luomaan teknologisia ratkaisuja, jotka
              tekevät liiketoiminnasta helpompaa, tehokkaampaa ja
              menestyksekkäämpää. Yhdessä rakennamme tulevaisuuden, jossa
              teknologiasta on helpompi hyötyä kuin koskaan aikaisemmin.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;

