import { Target, Lightbulb, Users, Award } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We stay ahead of the curve, embracing emerging technologies to deliver forward-thinking solutions.",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "Your vision meets our expertise. We work hand-in-hand to ensure every project exceeds expectations.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "We don't just meet standards — we set them. Quality is non-negotiable in everything we build.",
  },
];

const team = [
  { name: "Sarah Chen", role: "CEO & Founder", color: "bg-primary" },
  { name: "Marcus Rivera", role: "CTO", color: "bg-primary-dark" },
  { name: "Aisha Patel", role: "Lead Designer", color: "bg-primary-darker" },
  { name: "James Okonkwo", role: "Head of Engineering", color: "bg-primary" },
  { name: "Yuki Tanaka", role: "Marketing Director", color: "bg-primary-dark" },
  { name: "Priya Sharma", role: "Customer Success", color: "bg-primary-darker" },
];

export default function About() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-6">
              Our Mission
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              At Luminal Systems, we believe technology should illuminate
              possibilities — not complicate them. Our mission is to democratize
              high-quality digital experiences for businesses of every scale.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From seed-stage startups to established enterprises, we provide the
              tools, expertise, and support needed to thrive in the digital
              landscape.
            </p>
          </div>
          <div className="h-80 rounded-2xl bg-gradient-to-br from-primary/30 to-primary-dark/20 flex items-center justify-center backdrop-blur-md border border-white/30">
            <Target size={64} className="text-primary-darker/50" />
          </div>
        </div>
      </section>

      <section className="bg-white/50 backdrop-blur-md py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">
            Our Story
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              { year: "2020", event: "Luminal Systems was founded in Colombo with a team of 3." },
              { year: "2021", event: "Launched our first enterprise platform, serving 50+ clients." },
              { year: "2023", event: "Expanded globally with offices in Singapore and Dubai." },
              { year: "2025", event: "Reached 500+ successful projects and a team of 80+ experts." },
            ].map((item) => (
              <div key={item.year} className="flex gap-6 items-start">
                <div className="shrink-0 w-20 text-center">
                  <span className="text-primary-darker font-bold text-lg">{item.year}</span>
                </div>
                <div className="h-8 w-px bg-primary/30 shrink-0" />
                <p className="text-gray-600 leading-relaxed pt-1">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-dark text-center mb-12">
          Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((val) => (
            <div
              key={val.title}
              className="backdrop-blur-md bg-white/50 border border-white/30 rounded-2xl p-8 hover:shadow-xl transition-all text-center"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <val.icon className="text-primary-darker" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">{val.title}</h3>
              <p className="text-gray-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/50 backdrop-blur-md py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="backdrop-blur-md bg-white/50 border border-white/30 rounded-2xl p-6 text-center hover:shadow-xl transition-all"
              >
                <div
                  className={`w-20 h-20 ${member.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <span className="text-white text-2xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-dark">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
