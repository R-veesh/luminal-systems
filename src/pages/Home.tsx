import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary-dark/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-dark leading-tight mb-6">
              Illuminate Your Digital
              <span className="text-primary-darker"> Future</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              Luminal Systems delivers cutting-edge web solutions that transform
              businesses. From stunning marketing sites to full e-commerce
              ecosystems — we build what you need to grow.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 bg-primary-darker text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary-darker/25"
              >
                View Plans
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-dark px-6 py-3 rounded-xl font-medium border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Optimized performance ensures your site loads in under 2 seconds, keeping visitors engaged.",
            },
            {
              icon: Shield,
              title: "Secure by Design",
              desc: "Enterprise-grade security baked into every layer of your application from day one.",
            },
            {
              icon: TrendingUp,
              title: "Conversion Focused",
              desc: "Data-driven UI/UX decisions that turn casual browsers into loyal customers.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="backdrop-blur-md bg-white/50 border border-white/30 rounded-2xl p-8 hover:shadow-xl hover:bg-white/70 transition-all group"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/30 transition-colors">
                <feature.icon className="text-primary-darker" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-darker text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that trust Luminal Systems for their
            digital presence.
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 bg-white text-primary-darker px-8 py-4 rounded-xl font-semibold hover:bg-primary/10 hover:text-white transition-all shadow-lg"
          >
            Choose Your Plan
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
