import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, FileText, Code, Rocket, ArrowRight } from "lucide-react";
import BorderGlow from "../components/ui/BorderGlow";
import { fadeInLeft } from "../lib/animations";
import { AnimatedSection } from "../lib/animations-components";

const steps = [
  {
    icon: Search,
    title: "1. Discovery Call",
    desc: "We start with a no-obligation conversation to understand your vision, goals, and challenges.",
    gradient: "from-blue-400 to-indigo-500",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?w=600&h=400&fit=crop",
  },
  {
    icon: FileText,
    title: "2. Proposal & Planning",
    desc: "You receive a detailed project roadmap, timeline, and transparent pricing with no hidden fees.",
    gradient: "from-purple-400 to-pink-500",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
  },
  {
    icon: Code,
    title: "3. Design & Build",
    desc: "Our team brings your project to life with iterative development, regular updates, and your feedback at every stage.",
    gradient: "from-green-400 to-emerald-500",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop",
  },
  {
    icon: Rocket,
    title: "4. Launch & Grow",
    desc: "We deploy your solution, monitor performance, and provide ongoing support to ensure long-term success.",
    gradient: "from-orange-400 to-red-500",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
];

export default function HowItWorks() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-6">
            How It <span className="text-gradient">Works</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From your first idea to a fully launched product — here's exactly how
            we bring your project to life.
          </p>
        </AnimatedSection>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-[31px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary-dark origin-top hidden md:block"
          />
          <div className="space-y-16">
            {steps.map((step, i) => (
              <AnimatedSection key={step.title} variant={fadeInLeft} delay={i * 0.15}>
                <div className="relative md:flex gap-8 items-start group">
                  <div className="hidden md:flex shrink-0 w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl items-center justify-center z-10 relative shadow-lg">
                    <step.icon className="text-white" size={28} />
                  </div>
                  <div className="md:hidden flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <step.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-dark">{step.title}</h3>
                  </div>
                  <div className="hidden md:block flex-1">
                    <BorderGlow
                      backgroundColor="#ffffff"
                      glowColor="150 80 80"
                      borderRadius={16}
                      glowRadius={30}
                      glowIntensity={0.6}
                      fillOpacity={0.3}
                      colors={["#6FCF97", "#7C5CFC", "#A8E6C0"]}
                      className="[&_.border-glow-inner]:overflow-hidden"
                    >
                      <div>
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-8">
                          <h3 className="text-xl font-semibold text-dark mb-3">{step.title}</h3>
                          <p className="text-gray-500 leading-relaxed max-w-xl">{step.desc}</p>
                        </div>
                      </div>
                    </BorderGlow>
                  </div>
                  <p className="text-gray-500 leading-relaxed md:hidden">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-darker via-primary-dark to-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(124,92,252,0.15)_0%,transparent_50%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Take the first step toward your digital transformation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-white text-primary-darker px-8 py-4 rounded-xl font-semibold hover:bg-primary/10 hover:text-white transition-all shadow-lg"
              >
                Contact Us
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 glass-dark text-white px-8 py-4 rounded-xl font-semibold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                View Pricing
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
