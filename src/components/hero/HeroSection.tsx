import { useCallback, useMemo, useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ArrowRight, Sparkles } from "lucide-react";
import { CTAButton } from "./CTAButton";
import AnimatedLiquidBackground from "./AnimatedLiquidBackground";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function HeroSection() {
  const mousePosition = useMemo(() => ({ x: 0, y: 0 }), []);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
        rafRef.current = null;
      });
    },
    [mousePosition],
  );

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-surface via-white dark:via-gray-900 to-gray-50"
    >
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 20 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <EffectComposer>
              <Bloom
                intensity={0.3}
                luminanceThreshold={0.1}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
            </EffectComposer>
          </Suspense>
          <AnimatedLiquidBackground mousePosition={mousePosition} />
        </Canvas>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={staggerItem}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary-darker">
              Powered by Luminal AI
            </span>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="text-[clamp(2.5rem,6vw,5rem)] font-heading font-bold leading-[1.08] tracking-tight mb-6"
          >
            <span className="text-gradient">
              Intelligence That Flows With You
            </span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Build, automate, and scale with AI designed to think naturally and
            adapt to your business.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <CTAButton to="/signup" variant="primary">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </CTAButton>
            <CTAButton to="/services" variant="secondary">
              Explore Features
            </CTAButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-gray-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
