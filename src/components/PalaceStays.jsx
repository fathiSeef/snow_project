import { useState } from 'react';
import { Crown, CheckCircle2, ChevronRight } from 'lucide-react';

const PALACES = [
  {
    name: 'Residential Snow Plowing ',
    // location: 'Place de la Concorde, 8th Arr.',
    // rating: '5-Star Palace Rating',
    // price: '€3,800 / night',
    image: '/images/jillwellington-snow-1901847_1920.jpg',
    features: ['Driveway Snow Plowing', 'Walkway & Sidewalk Clearing', 'Ice Control & Salting', 'Seasonal Snow Contracts','On-Demand Snow Removal'],
    // badge: 'Palace Distinction',
  },
  {
    name: 'Commercial Snow Removal',
    // location: '15 Place Vendôme, 1st Arr.',
    // rating: '5-Star Superior',
    // price: '€4,200 / night',
    image: '/images/qimono-plough-1814954_1920.jpg',
    features: ['Parking Lot Plowing', 'Sidewalk Clearing', 'Loading Dock Maintenance', 'Ice Management','Snow Hauling','Priority Storm Response','Seasonal Site Management'],
    // badge: 'Historic Legend',
  },
  {
    name: 'Ice Control & Salting',
    // location: '10 Avenue d’Iéna, 16th Arr.',
    // rating: 'Palace Heritage',
    // price: '€5,100 / night',
    image: '/images/graymediaproductions-fireman-4988540_1920.jpg',
    features: ['Salt Application', 'De-Icing Treatments', 'Anti-Icing Services', 'Walkway Safety Programs','Commercial Ice Monitoring'],
    // badge: 'Best View 2026',
  },

   {
    name: 'Emergency Snow Removal',
    // location: '10 Avenue d’Iéna, 16th Arr.',
    // rating: 'Palace Heritage',
    // price: '€5,100 / night',
    image: '/images/jamesdemers-winter-670314_1920.jpg',
    features: ['Heavy Snowfall Response', 'Storm Clean-Up', 'Priority Dispatch','Overnight Snow Clearing','Critical Access Maintenance'],
    // badge: 'Best View 2026',
  },
];

export default function PalaceStays({ onBookHotel }) {
  const [activeHotel, setActiveHotel] = useState(0);

  const selected = PALACES[activeHotel];

  return (
    <section id="palaces" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-amber-300 text-xs font-semibold mb-4 border border-amber-500/20">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Safety & Reliability</span>
          </div>
          <h2 className="font-serif-luxury text-4xl md:text-5xl font-bold text-white tracking-tight">
           Winter Maintenance <span className="gold-gradient-text">You Can Depend On</span>
          </h2>
          <p className="text-slate-300 text-base mt-3 font-light">
           Safety is our top priority. Our trained operators follow industry best practices and use professional-grade equipment to ensure efficient snow removal and effective ice control.
          </p>
        </div>

        {/* Palace Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {PALACES.map((palace, index) => (
              <div
                key={palace.name}
                onClick={() => setActiveHotel(index)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  activeHotel === index
                    ? 'glass-panel border-amber-500/50 shadow-xl shadow-amber-500/10'
                    : 'glass-card border-white/5 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    {palace.badge}
                  </span>
                  <span className="text-xs text-slate-400">{palace.location}</span>
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-white mb-2">
                  {palace.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-slate-300 pt-2 border-t border-white/5">
                  <span className="font-semibold text-amber-300">{palace.price}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    Explore Suite <ChevronRight className="w-4 h-4 text-amber-400" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Detailed Preview Card */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
              <div className="relative h-80 rounded-2xl overflow-hidden mb-6 group">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-black/20" />
                <div className="absolute top-4 right-4 glass-panel px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 border border-amber-500/30">
                  {selected.price}
                </div>
              </div>

              <h3 className="font-serif-luxury text-3xl font-bold text-white mb-3">
                {selected.name}
              </h3>
              <p className="text-slate-300 text-sm font-light mb-6">
                Whether you need a single snow-clearing visit or a full seasonal maintenance contract, you can count on us to deliver dependable service every time.

              </p>

              {/* Amenities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {selected.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5 text-xs text-slate-200 glass-card px-3.5 py-2.5 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onBookHotel(selected)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform transform active:scale-98 cursor-pointer"
              >
                <Crown className="w-4 h-4" />
                <span>Book Snow Removal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
