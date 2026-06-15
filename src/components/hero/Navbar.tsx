import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Sparkles, LogOut, User as UserIcon, Shield, Mail, Sun, Moon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const ADMIN_EMAILS = ["admin@luminalsystems.lk"];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setShowDropdown(false);
  }, [pathname]);

  useEffect(() => {
    const handler = () => setShowDropdown(false);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const userInitials = user?.displayName
    ? user.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl"
    >
      <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 rounded-full px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-primary/25 transition-shadow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-bold text-lg text-gray-900 tracking-tight">
            Luminal
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.to
                  ? "text-primary-darker"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
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
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }}
                className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold hover:shadow-lg hover:shadow-primary/30 transition-shadow"
                aria-label="User menu"
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
                    className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl rounded-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.displayName || "User"}
                      </p>
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
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors px-3 py-2"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium bg-gradient-to-r from-primary to-accent text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all"
              >
                Get Started
              </Link>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100/50 dark:hover:bg-gray-200/10 transition-colors"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden mt-2 bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl rounded-2xl p-4"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                    pathname === link.to
                      ? "bg-primary/15 text-primary-darker"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-3 border-t border-gray-100 space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {userInitials}
                      </div>
                      <div className="text-sm">
                        <p className="font-medium text-gray-900 truncate">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-gray-500 text-xs truncate">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/my-messages"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary-darker rounded-xl transition-colors"
                    >
                      <Mail size={16} /> My Messages
                    </Link>
                    {ADMIN_EMAILS.includes(user.email || "") && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary-darker rounded-xl transition-colors"
                      >
                        <Shield size={16} /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary-darker rounded-xl transition-colors"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary-darker rounded-xl transition-colors"
                    >
                      <UserIcon size={16} /> Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-sm font-medium bg-gradient-to-r from-primary to-accent text-white rounded-xl text-center hover:shadow-lg hover:shadow-primary/25 transition-all"
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
    </motion.nav>
  );
}
