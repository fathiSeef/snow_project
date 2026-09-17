import { useState } from 'react';
import { Sparkles, Send, CheckCircle2, PhoneCall, ShieldAlert } from 'lucide-react';

export default function CTA({ onOpenBooking }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section id="contact" className="py-14 px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden text-center bg-gradient-to-b from-slate-900/90 to-[#030712]/95">
          {/* Subtle glowing orb background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-amber-300 text-xs font-semibold mb-4 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </div>

            <h2 className="font-serif-luxury text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
              Get Your Free Snow <br />
              <span className="gold-gradient-text">Removal Quote Today</span>
            </h2>

            <p className="text-slate-300 text-sm font-light max-w-lg mx-auto mb-6 leading-relaxed">
              Fill out our contact form and one of our winter maintenance specialists will provide a customized snow removal solution for your property.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-500/30 transition-transform transform active:scale-98 cursor-pointer"
              >
                Request a Free Quote
              </button>

              <a
                href="tel:+14372676527"
                className="w-full sm:w-auto px-6 py-3 rounded-full glass-card border border-white/15 text-slate-200 hover:text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>(437) 267-6527</span>
              </a>
            </div>

            {/* Newsletter */}
            <div className="max-w-sm mx-auto pt-6 border-t border-white/10">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-3">
                Available 24/7 During Winter Events
              </p>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl glass-card text-xs text-white placeholder-slate-500 border border-white/10 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </form>

              {subscribed && (
                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Invitation dispatched to your inbox.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
