import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import SectionHeading from "../components/ui/SectionHeading";
import Accordion from "../components/ui/Accordion";
import { staggerContainer, staggerItem, fadeInRight } from "../lib/animations";
import { AnimatedSection } from "../lib/animations-components";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const faqs = [
  { question: "What is the typical project timeline?", answer: "Most projects take 4-8 weeks depending on scope. We'll provide a clear timeline during the proposal phase." },
  { question: "Do you offer post-launch support?", answer: "Yes! We offer ongoing maintenance and support packages to keep your site running smoothly." },
  { question: "Can I request revisions during development?", answer: "Absolutely. We build iteratively with your feedback at every stage to ensure the final product matches your vision." },
];

export default function Contact() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    try {
      await fetch(API_URL + "/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, user_uid: user?.uid || "" }),
      });
    } catch {
      // Silently fail — backend might be offline
    }
    setSending(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="text-white" size={40} />
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-dark mb-4"
        >
          Message Sent!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-lg"
        >
          Thank you for reaching out. We'll get back to you within 24 hours.
        </motion.p>
      </div>
    );
  }

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl font-bold text-dark text-center mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-gray-500 text-lg text-center mb-16 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you. Send us a message and we'll respond promptly.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-5 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {(["name", "email", "subject"] as const).map((field) => (
                <motion.div key={field} variants={staggerItem}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 capitalize">{field}</label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${errors[field] ? "border-error/50" : "border-gray-200"} bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm`}
                    placeholder={`Enter your ${field}`}
                  />
                  <AnimatePresence>
                    {errors[field] && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-error text-xs mt-1"
                      >
                        {errors[field]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              <motion.div variants={staggerItem}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.message ? "border-error/50" : "border-gray-200"} bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-sm`}
                  placeholder="Tell us about your project..."
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-error text-xs mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.button
                variants={staggerItem}
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-primary-darker text-white py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-all shadow-lg shadow-primary-darker/25 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {sending ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          <div className="md:col-span-2 space-y-6">
            <AnimatedSection variant={fadeInRight}>
              <GlassCard className="p-6">
                <h3 className="font-semibold text-dark mb-5">Contact Information</h3>
                <ul className="space-y-4">
                  {[
                    { icon: MapPin, label: "123 Luminal Street, Colombo, Sri Lanka" },
                    { icon: Phone, label: "+94 11 234 5678", href: "tel:+94112345678" },
                    { icon: Mail, label: "hello@luminalsystems.lk", href: "mailto:hello@luminalsystems.lk" },
                  ].map((item) => (
                    <li key={item.label}>
                      {item.href ? (
                        <a href={item.href} className="flex items-center gap-3 text-gray-500 text-sm hover:text-primary-darker transition-colors group">
                          <item.icon size={18} className="text-primary-darker shrink-0" />
                          <span className="group-hover:underline">{item.label}</span>
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 text-gray-500 text-sm">
                          <item.icon size={18} className="text-primary-darker shrink-0" />
                          {item.label}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </AnimatedSection>

            <AnimatedSection variant={fadeInRight} delay={0.1}>
              <GlassCard className="p-6 h-48 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin size={32} className="mx-auto mb-2 text-primary-darker/30" />
                  <p className="text-sm font-medium">Colombo, Sri Lanka</p>
                  <p className="text-xs">Map Integration</p>
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <SectionHeading title="Frequently Asked Questions" />
        <Accordion items={faqs} />
      </section>
    </div>
  );
}
