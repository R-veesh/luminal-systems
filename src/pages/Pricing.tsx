import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import SectionHeading from "../components/ui/SectionHeading";
import Accordion from "../components/ui/Accordion";
import { staggerContainer, staggerItem } from "../lib/animations";
import { AnimatedSection } from "../lib/animations-components";

const plans = [
  {
    id: "basic",
    name: "Basic",
    monthlyPrice: 29,
    yearlyPrice: 290,
    desc: "Perfect for small businesses getting started.",
    features: ["Up to 5 pages", "Responsive design", "Basic SEO", "Contact form", "1 month support"],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 79,
    yearlyPrice: 790,
    desc: "Best for growing businesses. Our most popular plan.",
    popular: true,
    features: ["Up to 15 pages", "Custom animations", "Advanced SEO", "E-commerce ready", "6 months support", "Priority email support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    desc: "For large-scale projects with custom needs.",
    features: ["Unlimited pages", "Full e-commerce suite", "Dedicated project manager", "Custom integrations", "12 months support", "24/7 phone support", "SLA guarantees"],
  },
];

const trustBadges = ["Company A", "Company B", "Company C", "Company D", "Company E", "Company F"];

const faqs = [
  { question: "Can I switch plans later?", answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle." },
  { question: "Is there a setup fee?", answer: "No, there are no setup fees. The price you see is the price you pay." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards and PayHere for secure payments." },
  { question: "Do you offer refunds?", answer: "Yes, we offer a 14-day money-back guarantee on all plans if you're not satisfied." },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
            Choose the plan that fits your needs. No hidden fees — just straightforward pricing.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex items-center justify-center gap-4 mb-14">
            <span className={`text-sm font-medium transition-colors ${!yearly ? "text-dark" : "text-gray-400"}`}>Monthly</span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-14 h-7 rounded-full transition-colors ${yearly ? "bg-primary-darker" : "bg-gray-300"}`}
            >
              <motion.div
                animate={{ x: yearly ? 28 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${yearly ? "text-dark" : "text-gray-400"}`}>
              Yearly <span className="text-primary-darker text-xs font-semibold">Save ~17%</span>
            </span>
          </div>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start"
        >
          {plans.map((plan) => (
            <motion.div key={plan.id} variants={staggerItem}>
              <GlassCard
                className={`relative p-8 text-left ${plan.popular ? "gradient-border" : ""}`}
                glow={plan.popular}
              >
                {plan.popular && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-darker to-primary-dark text-white text-xs font-semibold px-5 py-1.5 rounded-full shadow-lg"
                  >
                    Best Value
                  </motion.span>
                )}
                <h3 className="text-xl font-bold text-dark mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-5">{plan.desc}</p>
                <div className="mb-6">
                  <motion.span
                    key={yearly ? "y" : "m"}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-dark"
                  >
                    ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </motion.span>
                  <span className="text-gray-400 text-sm ml-1.5">/{yearly ? "yr" : "mo"}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2.5 text-sm text-gray-500"
                    >
                      <Check size={16} className="text-primary-darker shrink-0 mt-0.5" />
                      {f}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => navigate("/checkout", { state: { plan, yearly } })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? "bg-primary-darker text-white hover:bg-primary-dark shadow-lg shadow-primary-darker/25"
                      : "border border-gray-200 text-gray-700 hover:border-primary hover:text-primary-darker hover:bg-primary/5"
                  }`}
                >
                  Buy Now <ArrowRight size={18} />
                </motion.button>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gray-50/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-dark mb-8">Trusted By</h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-6"
            >
              {trustBadges.map((badge) => (
                <motion.div
                  key={badge}
                  variants={staggerItem}
                  className="h-12 px-8 bg-white/50 border border-white/30 rounded-xl flex items-center text-gray-400 text-sm font-medium glass hover:bg-white/70 transition-all"
                >
                  {badge}
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <SectionHeading title="Frequently Asked Questions" subtitle="Everything you need to know about our plans and pricing." />
        <Accordion items={faqs} />
      </section>
    </div>
  );
}
