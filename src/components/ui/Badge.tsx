import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "success";
}

const variantStyles = {
  primary: "bg-primary-darker text-white",
  accent: "bg-accent text-white",
  success: "bg-success text-white",
};

export default function Badge({ children, variant = "primary" }: BadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-block text-xs font-semibold px-4 py-1 rounded-full ${variantStyles[variant]}`}
    >
      {children}
    </motion.span>
  );
}
