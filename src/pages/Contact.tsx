import { useState } from "react";
import { MapPin, Phone, Mail, ChevronDown } from "lucide-react";

const faqs = [
  { q: "What is the typical project timeline?", a: "Most projects take 4-8 weeks depending on scope. We'll provide a clear timeline during the proposal phase." },
  { q: "Do you offer post-launch support?", a: "Yes! We offer ongoing maintenance and support packages to keep your site running smoothly." },
  { q: "Can I request revisions during development?", a: "Absolutely. We build iteratively with your feedback at every stage to ensure the final product matches your vision." },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    fetch("http://localhost/luminal-systems/backend/contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).catch(() => {});

    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  if (submitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Mail className="text-primary-darker" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-dark mb-4">Message Sent!</h1>
        <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-dark text-center mb-6">Get in Touch</h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Have a project in mind? We'd love to hear from you. Send us a message and we'll respond promptly.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            {(["name", "email", "subject"] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-dark mb-1.5 capitalize">{field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${errors[field] ? "border-red-400" : "border-gray-200"} bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                />
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${errors.message ? "border-red-400" : "border-gray-200"} bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-primary-darker text-white py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary-darker/25"
            >
              Send Message
            </button>
          </form>

          <div className="space-y-8">
            <div className="backdrop-blur-md bg-white/50 border border-white/30 rounded-2xl p-8">
              <h3 className="font-semibold text-dark mb-6">Contact Information</h3>
              <ul className="space-y-4">
                {[
                  { icon: MapPin, label: "123 Luminal Street, Colombo, Sri Lanka" },
                  { icon: Phone, label: "+94 11 234 5678" },
                  { icon: Mail, label: "hello@luminalsystems.lk" },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-3 text-gray-600 text-sm">
                    <item.icon size={18} className="text-primary-darker shrink-0" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="backdrop-blur-md bg-white/50 border border-white/30 rounded-2xl p-8 h-48 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <MapPin size={32} className="mx-auto mb-2" />
                <p className="text-sm">Map Integration</p>
                <p className="text-xs">Google Maps placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold text-dark text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="backdrop-blur-md bg-white/50 border border-white/30 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left font-medium text-dark hover:bg-white/30 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                <ChevronDown size={18} className={`transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
