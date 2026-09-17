import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1 — Brand */}
          <div>
            <a href="#home" className="inline-block mb-5">
              <img
                src="/images/Logo.png"
                alt="PolarForce Property Management"
                className="w-auto h-16 object-contain"
                style={{ maxWidth: '200px' }}
              />
            </a>

            <p className="text-slate-400 text-sm font-light leading-7 max-w-sm">
              Reliable snow removal and winter property maintenance services
              across the Greater Toronto Area.
            </p>
          </div>

          {/* Column 2 — Winter Services */}
          <div>
            <h4 className="font-serif-luxury text-base font-bold text-white mb-5 uppercase tracking-wider">
              Winter Services
            </h4>

            <ul className="flex flex-col gap-3 text-sm text-slate-400 font-light">
              <li>
                <a
                  href="#experiences"
                  className="hover:text-amber-300 transition-colors"
                >
                  Residential Snow Plowing
                </a>
              </li>

              <li>
                <a
                  href="#experiences"
                  className="hover:text-amber-300 transition-colors"
                >
                  Commercial Snow Removal
                </a>
              </li>

              <li>
                <a
                  href="#experiences"
                  className="hover:text-amber-300 transition-colors"
                >
                  Ice Control & Salting
                </a>
              </li>

              <li>
                <a
                  href="#experiences"
                  className="hover:text-amber-300 transition-colors"
                >
                  Emergency Snow Removal
                </a>
              </li>

              <li>
                <a
                  href="#experiences"
                  className="hover:text-amber-300 transition-colors"
                >
                  24/7 Winter Monitoring
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 — Contact Us */}
          <div>
            <h4 className="font-serif-luxury text-base font-bold text-white mb-5 uppercase tracking-wider">
              Contact Us
            </h4>

            <ul className="flex flex-col gap-3.5 text-sm text-slate-400 font-light">

              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />

                <span>
                  Phone:{' '}
                  <a
                    href="tel:4372676527"
                    className="text-slate-300 hover:text-amber-300 transition-colors font-medium"
                  >
                    (437) 267-6527
                  </a>
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />

                <span>
                  Email:{' '}
                  <a
                    href="mailto:info@polarforce.ca"
                    className="text-slate-300 hover:text-amber-300 transition-colors font-medium"
                  >
                    info@polarforce.ca
                  </a>
                </span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />

                <span>
                  Service Area: Greater Toronto Area (GTA)
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />

                <span>
                  Availability: 24/7 During Winter Events
                </span>
              </li>

            </ul>
          </div>

          {/* Column 4 — Quick Links */}
          <div>
            <h4 className="font-serif-luxury text-base font-bold text-white mb-5 uppercase tracking-wider">
              Quick Links
            </h4>

            <ul className="flex flex-col gap-3 text-sm text-slate-400 font-light">

              <li>
                <a
                  href="#home"
                  className="hover:text-amber-300 transition-colors"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="hover:text-amber-300 transition-colors"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#experiences"
                  className="hover:text-amber-300 transition-colors"
                >
                  Services
                </a>
              </li>

              <li>
                <a
                  href="#industries"
                  className="hover:text-amber-300 transition-colors"
                >
                  Industries
                </a>
              </li>

              <li>
                <a
                  href="#testimonials"
                  className="hover:text-amber-300 transition-colors"
                >
                  Testimonials
                </a>
              </li>

              <li>
                <a
                  href="#faq"
                  className="hover:text-amber-300 transition-colors"
                >
                  FAQ
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="hover:text-amber-300 transition-colors font-medium text-amber-400/90"
                >
                  Get Free Quote
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-4">

          <p>
            © 2026 PolarForce Property Management Inc. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </a>

            <span className="text-slate-700">|</span>

            <a
              href="#"
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}