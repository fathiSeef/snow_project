import { useState } from 'react';
import { X, Sparkles, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    serviceRequired: '',
    date: '',
    details: '',
  });

  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="glass-panel w-full max-w-xl p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden bg-slate-900/95 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-white transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmed ? (
          <div>
            {/* <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" />
              <span>FREE SNOW REMOVAL QUOTE</span>
            </div> */}

            {/* <h3 className="font-serif-luxury text-2xl md:text-3xl font-bold text-white mb-6">
              Get Your Free <span className="gold-gradient-text">Snow Removal Quote</span>
            </h3> */}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-card text-sm text-white placeholder-slate-500 border border-white/10 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-card text-sm text-white placeholder-slate-500 border border-white/10 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(437) 267-6527"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-card text-sm text-white placeholder-slate-500 border border-white/10 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Property Type & Service Required */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-card text-sm text-white border border-white/10 focus:outline-none focus:border-amber-500 bg-slate-900"
                  >
                    <option value="">Select Property Type</option>
                    <option value="Residential Property">Residential Property</option>
                    <option value="Commercial Property">Commercial Property</option>
                    <option value="Retail Center">Retail Center</option>
                    <option value="Office Complex">Office Complex</option>
                    <option value="Industrial Facility">Industrial Facility</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Condominium">Condominium</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Service Required
                  </label>
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-card text-sm text-white border border-white/10 focus:outline-none focus:border-amber-500 bg-slate-900"
                  >
                    <option value="">Select Service Required</option>
                    <option value="Residential Snow Plowing">Residential Snow Plowing</option>
                    <option value="Commercial Snow Removal">Commercial Snow Removal</option>
                    <option value="Ice Control & Salting">Ice Control & Salting</option>
                    <option value="Emergency Snow Removal">Emergency Snow Removal</option>
                    <option value="Seasonal Snow Management">Seasonal Snow Management</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Preferred Service Date */}
              <div>
                <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                  Preferred Service Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-card text-sm text-white border border-white/10 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Property / Service Details */}
              <div>
                <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                  Property / Service Details
                </label>
                <textarea
                  rows="3"
                  placeholder="Tell us about your property, snow removal needs, parking lot size, access requirements, or any other details..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-card text-sm text-white placeholder-slate-500 border border-white/10 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              {/* Supporting Contact Line */}
              <div className="text-xs text-slate-400 space-y-1 py-1">
                <p className="font-medium text-slate-300">
                  Our winter maintenance team is available 24/7 during winter events.
                </p>
                <p>
                  You can also contact us directly:{' '}
                  <a href="tel:4372676527" className="text-amber-400 hover:underline font-semibold">
                    (437) 267-6527
                  </a>{' '}
                  |{' '}
                  <a href="mailto:info@polarforce.ca" className="text-amber-400 hover:underline font-semibold">
                    info@polarforce.ca
                  </a>
                </p>
              </div>

              {/* Privacy Message */}
              <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
                <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Your information is kept confidential and used only to prepare your snow removal quote.</span>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold text-base hover:brightness-110 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-transform transform active:scale-98 cursor-pointer"
              >
                <span>Request a Free Quote</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-6 border border-amber-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif-luxury text-3xl font-bold text-white mb-2">
              Quote Request Dispatched
            </h3>
            <p className="text-slate-300 text-sm font-light max-w-md mx-auto mb-6">
              Thank you, <span className="text-amber-300 font-semibold">{formData.name}</span>. Our winter maintenance team will review your property details and contact you shortly.
            </p>

            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
