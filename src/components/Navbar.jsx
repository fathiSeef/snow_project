import { useState, useEffect } from 'react';
import { Sparkles, Globe, Calendar, Menu, X, ArrowRight } from 'lucide-react';



export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [currency, setCurrency] = useState('EUR (€)');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl'
          : 'bg-gradient-to-b from-[#030712]/90 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
         <a href="#" className="flex items-center gap-3 group">
          <img
            src="/images/Logo.png"
            alt="PolarForce Logo"
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
          /> 
          <div>
            <span className="font-serif-luxury text-xl font-bold tracking-wider text-white group-hover:text-amber-200 transition-colors">
              POLARFORCE <span className="font-sans font-light text-amber-400 text-sm tracking-widest block uppercase"> PROPERTY MANAGEMENT</span>
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 glass-panel px-6 py-2.5 rounded-full border border-white/10">
          <a href="#home" className="text-sm text-slate-300 hover:text-amber-300 transition-colors font-medium">
            Home
          </a>
          <a href="#about" className="text-sm text-slate-300 hover:text-amber-300 transition-colors font-medium">
            About Us
          </a>
          <a href="#experiences" className="text-sm text-slate-300 hover:text-amber-300 transition-colors font-medium">
            Services
          </a>
          <a href="#industries" className="text-sm text-slate-300 hover:text-amber-300 transition-colors font-medium">
            Industries
          </a>
          {/* <a href="#palaces" className="text-sm text-slate-300 hover:text-amber-300 transition-colors font-medium">
            Safety 
          </a> */}
          {/* <a href="#itinerary" className="text-sm text-slate-300 hover:text-amber-300 transition-colors font-medium flex items-center gap-1.5">
            Property Care */}
            {/* <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">New</span> */}
          {/* </a> */}
          <a href="#testimonials" className="text-sm text-slate-300 hover:text-amber-300 transition-colors font-medium">
            Testimonials
          </a>
          {/* <a href="#packages" className="text-sm text-slate-300 hover:text-amber-300 transition-colors font-medium">
            
          </a> */}
          <a href="#faq" className="text-sm text-slate-300 hover:text-amber-300 transition-colors font-medium">
            FAQ
          </a>
          <a href="#contact" className="text-sm text-slate-300 hover:text-amber-300 transition-colors font-medium">
            Contact Us
          </a>

        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* <button
            onClick={() => setCurrency(currency === 'EUR (€)' ? 'USD ($)' : 'EUR (€)')}
            className="flex items-center gap-2 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-full border border-white/10 glass-card transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{currency}</span>
          </button> */}

          <button
            onClick={onOpenBooking}
            className="relative group overflow-hidden rounded-full p-[1px] font-medium text-sm"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 rounded-full animate-pulse opacity-70 group-hover:opacity-100 transition-opacity"></span>
            <div className="relative px-5 py-2.5 bg-[#030712] rounded-full flex items-center gap-2 text-amber-200 group-hover:text-white transition-colors cursor-pointer">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Book Snow Removal</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2 rounded-xl border border-white/10 glass-card"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-[#030712]/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-slate-200 hover:text-amber-400 font-medium"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-slate-200 hover:text-amber-400 font-medium"
          >
            About Us
          </a>
          <a
            href="#experiences"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-slate-200 hover:text-amber-400 font-medium"
          >
            Services
          </a>
          <a
            href="#industries"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-slate-200 hover:text-amber-400 font-medium"
          >
            Industries
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-slate-200 hover:text-amber-400 font-medium"
          >
            Testimonials
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-slate-200 hover:text-amber-400 font-medium"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-slate-200 hover:text-amber-400 font-medium"
          >
            Contact Us
          </a>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-center shadow-lg shadow-amber-500/20"
          >
            Reserve Your Journey
          </button>
        </div>
      )}
    </header>
  );
}
