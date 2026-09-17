import { useState } from 'react';
import { Sparkles } from 'lucide-react';

const EXPERIENCES = [
  {
    id: 1,
    title: 'Residential Snow Plowing',
    category: 'Plowing',
    image: '/images/jillwellington-snow-1901847_1920.jpg',
    description: 'Keep your driveway and walkways clear throughout the winter season. Our residential snow removal services provide homeowners with dependable snow clearing whenever winter weather arrives.',
  },
  {
    id: 2,
    title: 'Commercial Snow Removal',
    category: 'Removal',
    image: '/images/jamesdemers-winter-670314_1920.jpg',
    description: 'We help businesses maintain safe and accessible properties for employees, customers, and visitors. Our commercial snow management programs are customized to your property.',
  },
  {
    id: 3,
    title: 'Ice Control & Salting',
    category: 'Ice Control',
    image: '/images/graymediaproductions-fireman-4988540_1920.jpg',
    description: 'Prevent dangerous ice buildup on walkways, parking lots, and entrances. Our ice control and salting services keep your property safe and accessible throughout the winter months.',
  },
  {
    id: 4,
    title: 'Emergency Snow Removal',
    category: 'Emergency',
    image: '/images/qimono-plough-1814954_1920.jpg',
    description: 'When heavy snowfall hits unexpectedly, our emergency snow removal team is ready to respond. We provide rapid deployment to clear your property and restore safe access.',
  },
];

export default function Experiences() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Plowing', 'Removal', 'Ice Control', 'Emergency'];

  const filtered = activeCategory === 'All'
    ? EXPERIENCES
    : EXPERIENCES.filter((exp) => exp.category === activeCategory);

  return (
    <section id="experiences" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-amber-300 text-xs font-semibold mb-4 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OUR SERVICES</span>
            </div>
            <h2 className="font-serif-luxury text-4xl md:text-5xl font-bold text-white tracking-tight">
              Complete Winter <span className="gold-gradient-text">Property Maintenance</span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 glass-panel rounded-full border border-white/10 self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((exp) => (
            <div
              key={exp.id}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 group flex flex-col"
            >
              {/* Card Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-black/30" />
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-3 line-clamp-2">
                  {exp.title}
                </h3>

                <p className="text-slate-300 text-xs font-light leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
