import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Shield, TrendingUp, Star, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { GlassCard } from "../components/ui/GlassCard";
import SectionHeading from "../components/ui/SectionHeading";
import StatsCounter from "../components/ui/StatsCounter";
import { staggerContainer, staggerItem, fadeInLeft, fadeInRight } from "../lib/animations";
import { AnimatedSection } from "../lib/animations-components";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized performance ensures your site loads in under 2 seconds, keeping visitors engaged.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    desc: "Enterprise-grade security baked into every layer of your application from day one.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "Conversion Focused",
    desc: "Data-driven UI/UX decisions that turn casual browsers into loyal customers.",
    color: "from-blue-400 to-indigo-500",
  },
];

function ScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const seenRef = useRef(false);
  const readyRef = useRef(false);
  const playedRef = useRef(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.readyState >= 1) readyRef.current = true;

    const onMeta = () => {
      readyRef.current = true;
      if (seenRef.current && !playedRef.current) {
        playedRef.current = true;
        vid.play();
        setPlaying(true);
      }
    };
    const onTime = () => {
      if (vid.duration) setProgress(vid.currentTime / vid.duration);
    };
    const onEnd = () => document.getElementById("video-next")?.scrollIntoView({ behavior: "smooth" });

    if (vid.readyState < 1) vid.addEventListener("loadedmetadata", onMeta);
    else onMeta();

    vid.addEventListener("timeupdate", onTime);
    vid.addEventListener("ended", onEnd);

    const onScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        if (playedRef.current || seenRef.current) {
          seenRef.current = false;
          playedRef.current = false;
          vid.pause();
          vid.currentTime = 0;
          setPlaying(false);
          setProgress(0);
        }
        return;
      }

      if (!seenRef.current) {
        seenRef.current = true;
        return;
      }

      if (readyRef.current && !playedRef.current) {
        playedRef.current = true;
        vid.play();
        setPlaying(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      vid.removeEventListener("loadedmetadata", onMeta);
      vid.removeEventListener("timeupdate", onTime);
      vid.removeEventListener("ended", onEnd);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const circleLen = 2 * Math.PI * 48;

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-transparent to-gray-50/50" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-dark"
        >
          <video
            ref={videoRef}
            src="/videos/promo.mp4"
            preload="auto"
            playsInline
            className="w-full h-full object-cover"
          />

          {!playing ? (
            <div className="absolute inset-0 flex items-center justify-center bg-dark/50">
              <div className="relative flex flex-col items-center gap-2">
                <svg width="112" height="112" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <circle
                    cx="56" cy="56" r="48"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="3"
                  />
                  <motion.circle
                    cx="56" cy="56" r="48"
                    fill="none"
                    stroke="rgb(37,99,235)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circleLen}
                    strokeDashoffset={circleLen * 0.75}
                    style={{ rotate: -90, transformOrigin: "center" }}
                    animate={{ strokeDashoffset: [circleLen * 0.75, circleLen * 0.65] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center z-10">
                  <Play size={28} className="text-white ml-1" />
                </div>
                <span className="text-white/80 text-xs font-medium tracking-wider uppercase z-10">
                  Scroll to Watch
                </span>
              </div>
            </div>
          ) : (
            <>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    style={{ scaleX: progress, transformOrigin: "left" }}
                  />
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <svg width="40" height="40">
                  <circle
                    cx="20" cy="20" r="17"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="20" cy="20" r="17"
                    fill="none"
                    stroke="rgb(37,99,235)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 17}
                    strokeDashoffset={2 * Math.PI * 17 * (1 - progress)}
                    style={{ rotate: -90, transformOrigin: "center" }}
                  />
                </svg>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "Luminal Systems transformed our online presence. Our traffic increased 3x in the first month.",
    author: "Sarah Chen",
    role: "CEO, TechVista",
    rating: 5,
  },
  {
    quote: "The team's attention to detail and technical expertise is unmatched. Highly recommend.",
    author: "Marcus Rivera",
    role: "CTO, CloudNine",
    rating: 5,
  },
  {
    quote: "From concept to launch, they delivered a world-class product on time and on budget.",
    author: "Aisha Patel",
    role: "Founder, DigiScale",
    rating: 5,
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div>
      <section ref={heroRef} className="relative overflow-hidden min-h-screen flex items-center">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/95 to-dark" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[128px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-[128px]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(111,207,151,0.1)_0%,transparent_50%)]" />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/20 pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-40 w-full"
        >
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
              <span className="text-xs text-gray-300 font-medium">Trusted by 500+ companies worldwide</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              Illuminate Your Digital{" "}
              <span className="text-gradient">Future</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl"
            >
              Luminal Systems delivers cutting-edge web solutions that transform
              businesses. From stunning marketing sites to full e-commerce
              ecosystems — we build what you need to grow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/pricing"
                className="group inline-flex items-center gap-2 bg-primary-darker text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-dark transition-all shadow-lg shadow-primary-darker/50 hover:shadow-xl hover:shadow-primary-darker/30"
              >
                View Plans
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 glass-dark text-white px-8 py-4 rounded-xl font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Scroll-driven promo video — place promo.mp4 in public/videos/ */}
      <ScrollVideo />

      <section id="video-next" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <SectionHeading
          title="Why Luminal Systems?"
          subtitle="We combine cutting-edge technology with proven design principles to deliver exceptional digital experiences."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={staggerItem}>
              <GlassCard className="p-8 h-full">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}>
                  <feature.icon className="text-white" size={26} />
                </div>
                <h3 className="text-xl font-semibold text-dark mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gradient-to-br from-primary-darker via-primary-dark to-dark py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(111,207,151,0.15)_0%,transparent_50%)]" />
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
            <StatsCounter to={50} suffix="+" label="Countries Served" />
            <StatsCounter to={99} suffix="%" label="Client Satisfaction" />
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection variant={fadeInLeft}>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-6">
              Built for{" "}
              <span className="text-gradient">Growth</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Every solution we build is engineered to scale with your business. From
              startups to enterprises, our technology stack grows with you.
            </p>
            <ul className="space-y-4">
              {[
                "Modern React/TypeScript architecture",
                "Cloud-native deployment ready",
                "SEO-optimized from day one",
                "24/7 monitoring and support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 bg-primary-darker rounded-full" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection variant={fadeInRight}>
            <div className="glass rounded-2xl p-1">
              <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary-dark/10 rounded-xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {["React", "TypeScript", "Node.js", "Firebase"].map((tech) => (
                    <div key={tech} className="glass rounded-xl px-4 py-3 text-center text-sm font-medium text-dark">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-gray-50/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Don't just take our word for it — hear from the businesses we've helped transform."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div key={t.author} variants={staggerItem}>
                <GlassCard className="p-8 h-full flex flex-col">
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm mb-6 flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {t.author.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-dark">{t.author}</p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
              Join hundreds of businesses that trust Luminal Systems for their
              digital presence.
            </p>
            <Link
              to="/pricing"
              className="group inline-flex items-center gap-2 bg-primary-darker text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary-darker/25 hover:shadow-xl hover:shadow-primary-darker/30"
            >
              Choose Your Plan
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
