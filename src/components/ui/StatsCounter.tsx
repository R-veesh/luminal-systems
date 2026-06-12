import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface StatsCounterProps {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export default function StatsCounter({ from = 0, to, suffix = "", prefix = "", label }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(from);
  const spring = useSpring(count, { stiffness: 60, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      count.set(to);
    }
  }, [isInView, count, to]);

  return (
    <div ref={ref} className="text-center">
      <motion.div className="text-4xl sm:text-5xl font-bold text-gradient">
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </motion.div>
      <p className="text-gray-500 text-sm mt-2">{label}</p>
    </div>
  );
}
