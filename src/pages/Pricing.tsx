import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

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

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-6">Pricing Plans</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Choose the plan that fits your needs. No hidden fees — just straightforward pricing.
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!yearly ? "text-dark" : "text-gray-400"}`}>Monthly</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative w-14 h-7 rounded-full transition-colors ${yearly ? "bg-primary-darker" : "bg-gray-300"}`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${yearly ? "translate-x-8" : "translate-x-1"}`} />
          </button>
          <span className={`text-sm font-medium ${yearly ? "text-dark" : "text-gray-400"}`}>
            Yearly <span className="text-primary-darker text-xs">Save ~17%</span>
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative backdrop-blur-md bg-white/50 border rounded-2xl p-8 text-left transition-all hover:shadow-xl ${
                plan.popular ? "border-primary-darker shadow-lg shadow-primary-darker/10 scale-105" : "border-white/30"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-darker text-white text-xs font-semibold px-4 py-1 rounded-full">
                  Best Value
                </span>
              )}
              <h3 className="text-xl font-bold text-dark mb-2">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-dark">${yearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                <span className="text-gray-400 text-sm ml-1">/{yearly ? "yr" : "mo"}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-primary-darker shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/checkout", { state: { plan, yearly } })}
                className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-primary-darker text-white hover:bg-primary-dark shadow-lg shadow-primary-darker/25"
                    : "border border-gray-200 text-dark hover:border-primary hover:bg-primary/5"
                }`}
              >
                Buy Now <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/50 backdrop-blur-md py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-dark mb-8">Trusted By</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {trustBadges.map((badge) => (
              <div key={badge} className="h-10 px-6 bg-gray-200/50 rounded-lg flex items-center text-gray-400 text-sm font-medium">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
