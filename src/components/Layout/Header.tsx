import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User as UserIcon, Shield, Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ADMIN_EMAILS = ["admin@luminalsystems.lk"];

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const userInitials = user?.displayName
    ? user.displayName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/80 shadow-lg shadow-black/5"
          : "backdrop-blur-md bg-white/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center"
            >
              <span className="text-dark font-bold text-sm">L</span>
            </motion.div>
            <span className="font-semibold text-lg text-dark">
              Luminal<span className="text-primary-dark">Systems</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.to
                    ? "text-primary-darker"
                    : "text-gray-600 hover:text-primary-darker hover:bg-primary/5"
                }`}
              >
                {pathname === link.to && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/15 rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold hover:shadow-lg hover:shadow-primary/30 transition-shadow"
                >
                  {userInitials}
                </button>
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-white/20">
                        <p className="text-sm font-medium text-dark truncate">{user.displayName || "User"}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/my-messages"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary-darker transition-colors"
                      >
                        <Mail size={16} /> My Messages
                      </Link>
                      {ADMIN_EMAILS.includes(user.email || "") && (
                        <Link
                          to="/admin"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary-darker transition-colors"
                        >
                          <Shield size={16} /> Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary-darker transition-colors"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-primary-darker transition-colors px-3 py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium bg-primary-darker text-white px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary-darker/25"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden glass border-t border-white/20"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      pathname === link.to
                        ? "bg-primary/20 text-primary-darker"
                        : "text-gray-600 hover:bg-primary/10 hover:text-primary-darker"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 pb-1 border-t border-white/20 space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {userInitials}
                      </div>
                      <div className="text-sm">
                        <p className="font-medium text-dark truncate">{user.displayName || "User"}</p>
                        <p className="text-gray-500 text-xs truncate">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/my-messages"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary-darker rounded-lg w-full transition-colors"
                    >
                      <Mail size={16} /> My Messages
                    </Link>
                    {ADMIN_EMAILS.includes(user.email || "") && (
                      <Link
                        to="/admin"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary-darker rounded-lg w-full transition-colors"
                      >
                        <Shield size={16} /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary-darker rounded-lg w-full transition-colors"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-primary/10 hover:text-primary-darker rounded-lg transition-colors"
                    >
                      <UserIcon size={16} className="inline mr-2" />
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium bg-primary-darker text-white rounded-xl text-center hover:bg-primary-dark transition-colors"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
