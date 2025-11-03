import React from "react";
import { Quote } from "lucide-react";

export type Testimonial = {
  quote: string;
  company: string;
  personName: string;
  role: string;
  image?: string;
};

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials = [] }) => {
  // Default placeholder testimonials - replace with actual data
  const defaultTestimonials: Testimonial[] = testimonials.length > 0
    ? testimonials
    : [
        {
          quote:
            "Mitrox loi meille upean verkkosivun, joka kasvatti markkinointimme tehokkuutta merkittävästi. Lopputulos ylitti odotuksemme.",
          company: "Esimerkki Yritys Oy",
          personName: "Matti Meikäläinen",
          role: "Toimitusjohtaja",
        },
        {
          quote:
            "Mitrox AI Advisor palvelee asiakkaitamme ympäri vuorokauden ja ohjaa liidit oikeille myyjille. Myyntimme kasvoi 30 % ensimmäisten kuukausien aikana.",
          company: "Toinen Yritys",
          personName: "Liisa Virtanen",
          role: "Markkinointipäällikkö",
        },
        {
          quote:
            "Ammattitaitoinen tiimi ja lopputulos puhuu puolestaan. Suosittelemme lämpimästi!",
          company: "Kolmas Yritys",
          personName: "Jussi Jokinen",
          role: "Perustaja",
        },
      ];

  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4">
            Mitä asiakkaamme sanovat
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Lopputulos ja asiakastyytyväisyys ovat meille tärkeimmät
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {defaultTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-6 lg:p-8 rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 flex flex-col"
            >
              {/* Quote Icon */}
              <div className="mb-4 text-gray-500">
                <Quote className="w-6 h-6" />
              </div>

              {/* Quote Text */}
              <p className="text-gray-300 leading-relaxed mb-6 flex-1 text-sm lg:text-base">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center gap-3">
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
                      alt={testimonial.personName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-white font-medium text-sm">
                      {testimonial.personName}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

