import { Sparkles, CheckCircle2 } from 'lucide-react';

const BENEFITS = [
  '24/7 Snow Monitoring & Dispatch',
  'Fast Response Times',
  'Experienced & Trained Operators',
  'Commercial & Residential Services',
  'Fully Licensed and Insured',
  'Seasonal Contracts Available',
  'Reliable Ice Control Solutions',
  'Modern Fleet & Equipment',
];

export default function AboutUs() {
  return (
    <section id="about" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column — About Us Info */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-amber-300 text-xs font-semibold mb-4 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>About Us</span>
            </div>

            <h2 className="font-serif-luxury text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Your Trusted <span className="gold-gradient-text">Winter Maintenance Partner</span>
            </h2>

            <div className="space-y-4 text-slate-300 text-base font-light leading-relaxed">
              <p>
                At PolarForce Property Management Inc, we are committed to delivering dependable snow plowing and ice management services to homeowners, businesses, property managers, and commercial facilities. With experienced operators, modern equipment, and proactive weather monitoring, we ensure your property remains accessible and safe during every snowfall.
              </p>
              <p>
                Our team understands that snow and ice can disrupt daily operations, create safety hazards, and impact your peace of mind. That's why we provide timely, efficient, and professional winter maintenance solutions tailored to your specific needs.
              </p>
            </div>
          </div>

          {/* Right Column — Why Choose Us */}
          <div className="lg:col-span-6 glass-panel p-8 md:p-10 rounded-3xl border border-white/15 shadow-2xl">
            <h3 className="font-serif-luxury text-2xl md:text-3xl font-bold text-white mb-6">
              Why <span className="gold-gradient-text">Choose Us?</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BENEFITS.map((benefit, idx) => (
                <div
                  key={idx}
                  className="glass-card p-3.5 rounded-2xl border border-white/10 flex items-center gap-3 hover:border-amber-500/40 transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl glass-panel border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-slate-200 text-xs md:text-sm font-medium leading-tight">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
