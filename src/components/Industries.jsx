import {
  Sparkles,
  Home,
  Building2,
  Store,
  Building,
  Factory,
  Warehouse,
  Landmark,
  Briefcase,
  Hospital,
  GraduationCap,
} from 'lucide-react';

const INDUSTRIES = [
  {
    name: 'Residential Properties',
    icon: Home,
  },
  {
    name: 'Commercial Buildings',
    icon: Building2,
  },
  {
    name: 'Retail Centers',
    icon: Store,
  },
  {
    name: 'Office Complexes',
    icon: Building,
  },
  {
    name: 'Industrial Facilities',
    icon: Factory,
  },
  {
    name: 'Warehouses',
    icon: Warehouse,
  },
  {
    name: 'Condominiums',
    icon: Landmark,
  },
  {
    name: 'Property Management Companies',
    icon: Briefcase,
  },
  {
    name: 'Healthcare Facilities',
    icon: Hospital,
  },
  {
    name: 'Educational Institutions',
    icon: GraduationCap,
  },
];

export default function Industries() {
  return (
    <section id="industries" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-amber-300 text-xs font-semibold mb-4 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>INDUSTRIES</span>
          </div>
          <h2 className="font-serif-luxury text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Industries <span className="gold-gradient-text">We Serve</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg font-light mt-4">
            We proudly provide snow removal services for:
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {INDUSTRIES.map((ind, idx) => {
            const IconComponent = ind.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col items-center text-center group transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-1 shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl glass-panel border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-sm md:text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {ind.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
