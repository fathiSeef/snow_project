import { Sparkles, Shield, Star, Users, Clock } from 'lucide-react';

const BENEFITS = [
  {
    icon: Shield,
    title: 'Protect Your Investment',
    description: 'Stop expensive damage before it starts. Year-round upkeep keeps small problems from snowdrifts and lawn decay from spiraling into costly repairs.',
  },
  {
    icon: Star,
    title: 'Make a Great First Impression',
    description: 'Tidy, crisp grounds signal professionalism, boosting curb appeal that lasts.',
  },
  {
    icon: Users,
    title: 'Ensure Safety',
    description: 'Clear sidewalks, safe lots, and spotless entrances keep teams and guests secure, no matter the season.',
  },
  {
    icon: Clock,
    title: 'Reduce Time and Stress',
    description: 'Work with one dependable team from snow season to lawn season, letting you keep executive focus.',
  },
];

export default function ItineraryBuilder() {
  return (
    <section id="itinerary" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-amber-300 text-xs font-semibold mb-4 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Property Care</span>
          </div>
          <h2 className="font-serif-luxury text-4xl md:text-5xl font-bold text-white tracking-tight">
            Why Pick PolarForce for Your <span className="gold-gradient-text">Commercial Property Care?</span>
          </h2>
          <p className="text-slate-300 text-base mt-3 font-light">
            Your tenants, shoppers, and guests expect a property that not only looks polished but also feels secure. PolarForce lets you:
          </p>
        </div>

        {/* Content Card */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/15 shadow-2xl max-w-4xl mx-auto">
          {/* Card Title */}
          <h3 className="font-serif-luxury text-2xl md:text-3xl font-bold text-white mb-4">
            Commercial Property Maintenance Services in <span className="text-amber-300">GTA</span>
          </h3>

          {/* Introductory Paragraph */}
          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed mb-6">
            Running a commercial property is about more than just the inside. You need the exterior to look safe, tidy, and professional all year long. At Polarforce Property Management, we offer full property maintenance and snow clearing solutions tailored for plazas, condos, industrial buildings, and office parks throughout the GTA.
          </p>

          {/* Supporting Introduction */}
          {/* <p className="text-slate-200 text-sm md:text-base font-medium mb-8 border-l-2 border-amber-500/40 pl-4">
            Your tenants, shoppers, and guests expect a property that not only looks polished but also feels secure. PolarForce lets you:
          </p> */}

          {/* 2x2 Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BENEFITS.map((benefit, idx) => (
              <div key={idx} className="glass-card p-5 rounded-2xl border border-white/5 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl glass-panel border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                    <benefit.icon className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-serif-luxury text-lg font-bold text-white">
                    {benefit.title}
                  </h4>
                </div>
                <p className="text-slate-300 text-xs font-light leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
