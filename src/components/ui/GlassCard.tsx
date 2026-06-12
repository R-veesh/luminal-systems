import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type GlassVariant = "light" | "dark" | "primary";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: GlassVariant;
  glow?: boolean;
  gradientBorder?: boolean;
}

const variantStyles: Record<GlassVariant, string> = {
  light: "glass",
  dark: "glass-dark",
  primary: "glass-primary",
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ variant = "light", glow, gradientBorder, className = "", children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`rounded-2xl transition-all duration-300 ${variantStyles[variant]} ${glow ? "glow" : ""} ${gradientBorder ? "gradient-border" : ""} ${className}`}
        whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
