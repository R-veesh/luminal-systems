import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Globe,
  ShoppingCart,
  BarChart3,
  Smartphone,
  ArrowRight,
  Code,
  Palette,
  Rocket,
} from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import SectionHeading from "../components/ui/SectionHeading";
import { staggerContainer, staggerItem, fadeInUp } from "../lib/animations";
import { AnimatedSection } from "../lib/animations-components";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    gradient: "from-blue-400 to-indigo-500",
    features: [
      "Custom React/Next.js applications",
      "Responsive, mobile-first design",
      "API integration & backend setup",
      "Performance optimized builds",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    gradient: "from-green-400 to-emerald-500",
    features: [
      "Full e-commerce store setup",
      "Payment gateway integration",
      "Inventory & order management",
      "Secure checkout experiences",
    ],
  },
  {
    icon: BarChart3,
    title: "Digital Strategy",
    gradient: "from-purple-400 to-pink-500",
    features: [
      "SEO optimization & analytics",
      "Conversion rate optimization",
      "User experience research",
      "Growth strategy consulting",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile Optimization",
    gradient: "from-orange-400 to-red-500",
    features: [
      "Progressive Web Apps (PWAs)",
      "Cross-platform compatibility",
      "Touch & gesture optimization",
      "Offline-first capabilities",
    ],
  },
];

const steps = [
  {
    icon: Code,
    title: "Discovery",
    desc: "We learn about your business, goals, and audience to create a tailored strategy.",
  },
  {
    icon: Palette,
    title: "Design & Prototype",
    desc: "Our team designs wireframes and interactive prototypes for your approval.",
  },
  {
    icon: Rocket,
    title: "Development & Launch",
    desc: "We build, test, and deploy your solution with rigorous quality assurance.",
  },
  {
    icon: BarChart3,
    title: "Support & Scale",
    desc: "Ongoing maintenance, monitoring, and optimization to help you grow.",
  },
];

export default function Services() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-6">
            What <span className="text-gradient">We Deliver</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            From concept to launch, we provide end-to-end digital services that
            drive real business results. Every solution is crafted with cutting-edge
            technology, clean code, and a relentless focus on user experience.
          </p>
        </AnimatedSection>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={staggerItem}>
              <GlassCard className="p-8 group h-full">
                <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}>
                  <service.icon className="text-white" size={26} />
                </div>
                <h3 className="text-xl font-semibold text-dark mb-4">{service.title}</h3>
                <ul className="space-y-2.5 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-gray-500 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary-darker rounded-full mt-2 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-primary-darker font-medium text-sm group/link"
                >
                  Learn More
                  <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gray-50/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="How We Deliver" subtitle="Our proven process from start to success." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {steps.map((step, i) => (
              <AnimatedSection key={step.title} variant={fadeInUp} delay={i * 0.1}>
                <div className="text-center">
                  <div className="relative inline-block mb-5">
                    <div className={`w-16 h-16 bg-gradient-to-br ${
                      ["from-blue-400 to-indigo-500", "from-purple-400 to-pink-500", "from-green-400 to-emerald-500", "from-orange-400 to-red-500"][i]
                    } rounded-2xl flex items-center justify-center shadow-lg`}>
                      <step.icon className="text-white" size={28} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-dark text-white rounded-full text-xs flex items-center justify-center font-bold shadow-lg">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-dark mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
