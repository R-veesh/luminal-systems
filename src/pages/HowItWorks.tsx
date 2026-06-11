import { Link } from "react-router-dom";
import { Search, FileText, Code, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Discovery Call",
    desc: "We start with a no-obligation conversation to understand your vision, goals, and challenges.",
  },
  {
    icon: FileText,
    title: "2. Proposal & Planning",
    desc: "You receive a detailed project roadmap, timeline, and transparent pricing with no hidden fees.",
  },
  {
    icon: Code,
    title: "3. Design & Build",
    desc: "Our team brings your project to life with iterative development, regular updates, and your feedback at every stage.",
  },
  {
    icon: Rocket,
    title: "4. Launch & Grow",
    desc: "We deploy your solution, monitor performance, and provide ongoing support to ensure long-term success.",
  },
];

export default function HowItWorks() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-6">
          How It Works
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          From your first idea to a fully launched product — here's exactly how
          we bring your project to life.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/30 hidden md:block" />
          <div className="space-y-16">
            {steps.map((step) => (
              <div key={step.title} className="relative md:flex gap-8 items-start">
                <div className="hidden md:flex shrink-0 w-16 h-16 bg-primary/20 rounded-2xl items-center justify-center z-10 relative">
                  <step.icon className="text-primary-darker" size={28} />
                </div>
                <div className="md:hidden flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <step.icon className="text-primary-darker" size={22} />
                  </div>
                  <h3 className="text-xl font-semibold text-dark">{step.title}</h3>
                </div>
                <div className="hidden md:block">
                  <h3 className="text-xl font-semibold text-dark mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed max-w-xl">{step.desc}</p>
                </div>
                <p className="text-gray-600 leading-relaxed md:hidden">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary-darker to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
            Take the first step toward your digital transformation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary-darker px-8 py-4 rounded-xl font-semibold hover:bg-primary/10 hover:text-white transition-all shadow-lg"
            >
              Contact Us
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 bg-transparent text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
