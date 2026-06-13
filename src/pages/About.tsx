import { motion } from "framer-motion";
import { Target, Lightbulb, Users, Award, ArrowRight } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import SectionHeading from "../components/ui/SectionHeading";
import StatsCounter from "../components/ui/StatsCounter";
import { staggerContainer, staggerItem, fadeInLeft, fadeInRight } from "../lib/animations";
import { AnimatedSection } from "../lib/animations-components";
import { Link } from "react-router-dom";
import TeamSection from "../components/team/TeamSection";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We stay ahead of the curve, embracing emerging technologies to deliver forward-thinking solutions.",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "Your vision meets our expertise. We work hand-in-hand to ensure every project exceeds expectations.",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "We don't just meet standards — we set them. Quality is non-negotiable in everything we build.",
    gradient: "from-purple-400 to-pink-500",
  },
];

const timeline = [
  { year: "2020", event: "Luminal Systems was founded in Colombo with a team of 3." },
  { year: "2021", event: "Launched our first enterprise platform, serving 50+ clients." },
  { year: "2023", event: "Expanded globally with offices in Singapore and Dubai." },
  { year: "2025", event: "Reached 500+ successful projects and a team of 80+ experts." },
];

export default function About() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection variant={fadeInLeft}>
            <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-6">
              Our <span className="text-gradient">Mission</span>
            </h1>
            <p className="text-gray-500 leading-relaxed mb-4 text-lg">
              At Luminal Systems, we believe technology should illuminate
              possibilities — not complicate them. Our mission is to democratize
              high-quality digital experiences for businesses of every scale.
            </p>
            <p className="text-gray-500 leading-relaxed text-lg">
              From seed-stage startups to established enterprises, we provide the
              tools, expertise, and support needed to thrive in the digital
              landscape.
            </p>
          </AnimatedSection>

          <AnimatedSection variant={fadeInRight}>
            <div className="glass rounded-2xl p-8 flex items-center justify-center min-h-[300px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary-dark/20" />
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <Target size={80} className="text-primary-darker/40" />
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary-darker via-primary-dark to-dark py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(124,92,252,0.15)_0%,transparent_50%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            <StatsCounter to={500} suffix="+" label="Projects Delivered" />
            <StatsCounter to={80} suffix="+" label="Team Members" />
            <StatsCounter to={6} suffix="" label="Years of Excellence" />
            <StatsCounter to={50} suffix="+" label="Countries Served" />
          </motion.div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <SectionHeading title="Our Story" subtitle="From a small team in Colombo to a global digital agency." />
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary-dark hidden sm:block" />
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <AnimatedSection key={item.year} variant={fadeInLeft} delay={i * 0.1}>
                <div className="flex gap-8 items-start">
                  <div className="hidden sm:flex shrink-0 w-10 h-10 bg-primary-darker rounded-full items-center justify-center z-10 shadow-lg shadow-primary-darker/30">
                    <span className="text-white text-xs font-bold">{item.year.slice(2)}</span>
                  </div>
                  <div className="flex-1 glass rounded-2xl p-6">
                    <span className="text-primary-darker font-bold text-sm sm:hidden">{item.year} — </span>
                    <p className="text-gray-600 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <SectionHeading title="Core Values" subtitle="The principles that guide everything we build." />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {values.map((val) => (
            <motion.div key={val.title} variants={staggerItem}>
              <GlassCard className="p-8 text-center h-full">
                <div className={`w-16 h-16 bg-gradient-to-br ${val.gradient} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                  <val.icon className="text-white" size={30} />
                </div>
                <h3 className="text-xl font-semibold text-dark mb-3">{val.title}</h3>
                <p className="text-gray-500 leading-relaxed">{val.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <TeamSection />

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              Join Our Team
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
              We're always looking for talented people to join our mission.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-primary-darker text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary-darker/25"
            >
              Get in Touch
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
