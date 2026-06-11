import { Link } from "react-router-dom";
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

const services = [
  {
    icon: Globe,
    title: "Web Development",
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-6">
          What We Deliver
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          From concept to launch, we provide end-to-end digital services that
          drive real business results. Every solution is crafted with cutting-edge
          technology, clean code, and a relentless focus on user experience.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="backdrop-blur-md bg-white/50 border border-white/30 rounded-2xl p-8 hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/30 transition-colors">
                <service.icon className="text-primary-darker" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-4">
                {service.title}
              </h3>
              <ul className="space-y-2 mb-6">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="text-primary-darker mt-1">•</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 text-primary-darker font-medium text-sm hover:gap-2 transition-all"
              >
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/50 backdrop-blur-md py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">
            How We Deliver
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                  <step.icon className="text-primary-darker" size={28} />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary-darker text-white rounded-full text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-dark mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
