import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 max-w-7xl mx-auto z-10 pointer-events-none">
      {/* Top Floating Badge */}
      {/* <div className="self-center pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-xl animate-bounce">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>24/7 WINTER SERVICES</span>
        </div>
      </div> */}

      {/* Hero Headline & Subtitle */}
      <div className="text-center max-w-2xl mx-auto my-auto py-4 pointer-events-auto">
        <h1 className="font-serif-luxury text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-4 drop-shadow-2xl">
          Reliable Snow <br />
          <span className="gold-gradient-text">Plowing & Ice Management Services</span>
        </h1>
        <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-8 drop-shadow-md">
          When winter weather strikes, you need a snow removal partner you can trust. We provide professional residential, commercial, and industrial snow plowing services designed to keep your driveways, parking lots, walkways, and properties clear and safe throughout the season.
        </p>

        {/* Standalone CTA Button */}
        <div className="flex justify-center mb-4">
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold text-base hover:brightness-110 shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 transition-all transform active:scale-98"
          >
            <span>Book Your Snow Removal</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Hero Trust & Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full pointer-events-auto">
        <div className="glass-card p-4 rounded-2xl text-center border border-white/10">
          <p className="text-xs text-slate-300 font-semibold">24/7 Winter Response</p>
        </div>

        <div className="glass-card p-4 rounded-2xl text-center border border-white/10">
          <p className="text-xs text-slate-300 font-semibold">Fully Insured</p>
        </div>

        <div className="glass-card p-4 rounded-2xl text-center border border-white/10">
          <p className="text-xs text-slate-300 font-semibold">Professional Equipment</p>
        </div>
      </div>
    </section>
  );
}
