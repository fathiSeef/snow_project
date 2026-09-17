import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q:'How quickly do you respond after a snowfall?',
    a: 'Our team monitors weather conditions continuously and dispatches crews promptly based on snowfall accumulation and service agreements.',
  },
  {
    q: 'Do you offer seasonal contracts?',
    a: 'Yes. We offer seasonal snow removal and ice management contracts for residential and commercial properties.',
  },
  {
    q: 'Are you insured?',
    a: 'Absolutely. We are fully licensed and insured for all snow removal and winter maintenance operations.',
  },
  {
    q: 'Do you provide emergency services?',
    a: 'Yes. Emergency snow removal services are available during major winter storms and unexpected weather events.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-amber-300 text-xs font-semibold mb-4 border border-amber-500/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </div>
          <h2 className="font-serif-luxury text-4xl md:text-5xl font-bold text-white tracking-tight">
            Frequently Asked <span className="gold-gradient-text">Questions</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all ${
                openIndex === i
                  ? 'glass-panel border-amber-500/40 shadow-xl'
                  : 'glass-card border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif-luxury text-lg font-bold text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-400 shrink-0 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === i && (
                <div className="px-6 pb-6 text-slate-300 text-sm font-light leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
