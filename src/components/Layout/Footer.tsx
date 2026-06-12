import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const quickLinks = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
];

const resourceLinks = [
  { to: "/contact", label: "Contact" },
  { to: "/pricing", label: "Plans & Pricing" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-darker/10 via-transparent to-accent-dark/5 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-dark font-bold text-sm">L</span>
              </div>
              <span className="font-semibold text-lg">
                Luminal<span className="text-primary">Systems</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering businesses with cutting-edge digital solutions. We turn
              ideas into impactful experiences.
            </p>
            <div className="flex items-center gap-3">
              {["Bluesky", "Discord", "GitHub", "X"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 glass-dark rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all"
                  aria-label={social}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 text-sm hover:text-primary transition-colors relative inline-block group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 text-sm hover:text-primary transition-colors relative inline-block group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
                <span>123 Luminal Street, Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-primary shrink-0" />
                <a href="tel:+94112345678" className="hover:text-primary transition-colors">+94 11 234 5678</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-primary shrink-0" />
                <a href="mailto:hello@luminalsystems.lk" className="hover:text-primary transition-colors">hello@luminalsystems.lk</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Luminal Systems. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 glass-dark rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
