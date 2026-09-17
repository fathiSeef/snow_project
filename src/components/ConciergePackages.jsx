import { Sparkles, Check } from 'lucide-react';

const SERVICE_CARDS = [
  {
    title: 'Lawn & Garden Care',
    items: [
      'Regular mowing, trimming, and edging',
      'Fertilizing, aeration, and weed control',
      'Stunning spring and fall flower installs and ongoing garden upkeep',
      'Seasonal cleanups that refresh the site twice a year',
    ],
  },
  {
    title: 'Property Enhancements',
    items: [
      'Mulching, shrub pruning, and tree welfare',
      'Deck & fence repair and replacement',
      'Custom retaining walls, pathway upgrades, and safety lighting',
      'Tailored landscape refreshes that keep curb appeal year-round',
    ],
  },
];

export default function ConciergePackages() {
  return (
    <section id="packages" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-amber-300 text-xs font-semibold mb-4 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Property Services</span>
          </div>
          <h2 className="font-serif-luxury text-4xl md:text-5xl font-bold text-white tracking-tight">
            Our Commercial <span className="gold-gradient-text">Property Services</span>
          </h2>
        </div>

        {/* Two Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SERVICE_CARDS.map((card) => (
            <div
              key={card.title}
              className="glass-card rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col"
            >
              <h3 className="font-serif-luxury text-2xl font-bold text-white mb-6">
                {card.title}
              </h3>

              <div className="flex flex-col gap-3.5">
                {card.items.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-xs text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
