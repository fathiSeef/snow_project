import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "Exceptional service throughout the winter season. Their team always arrives on time and keeps our property safe and accessible.",

    author: "-Sarah Dyment, Toronto-",
    // title: "Patron of Arts, London & Geneva",
    // rating: 5,
    // tag: "Verified VIP Member",
  },
  {
    quote: "Reliable, professional, and responsive. We never worry about snow removal anymore",
    author: "-Ankita Agarwal, North York-",
    // title: "Diplomatic Envoy",
    // rating: 5,
    // tag: "Impérial Member",
  },
  {
    quote: "Their snow management program has helped us maintain business operations during major snowstorms." ,
    author: "-Ashley Hampton, Toronto-",
    // title: "Tech Founders, Zurich",
    // rating: 5,
    // tag: "Prestige Traveler",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));

  const current = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="py-14 px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="font-serif-luxury text-4xl md:text-5xl font-bold text-white tracking-tight">
            <span className="gold-gradient-text">Testimonials</span>
          </h2>
        </div>

        <div className="glass-panel p-6 md:p-10 rounded-3xl border border-white/15 shadow-2xl relative">
          <Quote className="w-10 h-10 text-amber-500/20 absolute top-5 left-5" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            {/* Star Rating */}
            <div className="flex justify-center gap-1 text-amber-400 mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="font-serif-luxury text-lg md:text-xl font-light text-white italic leading-relaxed mb-5">
              "{current.quote}"
            </p>

            {/* Author */}
            <div>
              <h4 className="font-serif-luxury text-base font-bold text-amber-300">
                {current.author}
              </h4>
              <p className="text-slate-400 text-xs mt-0.5">{current.title}</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold mt-2 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                <span>{current.tag}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-white border border-white/10 hover:border-amber-500 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400">
                0{index + 1} / 0{TESTIMONIALS.length}
              </span>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-white border border-white/10 hover:border-amber-500 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
