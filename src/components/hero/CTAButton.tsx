import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

type CTAVariant = "primary" | "secondary";

interface CTAButtonProps extends Omit<HTMLMotionProps<"button">, "size"> {
  variant?: CTAVariant;
  to?: string;
  href?: string;
  children: React.ReactNode;
}

const variantStyles: Record<CTAVariant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
  secondary:
    "bg-white/10 dark:bg-white/5 backdrop-blur-md text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-white/20 dark:hover:bg-white/10 hover:border-primary/30 hover:text-gray-900 dark:hover:text-white",
};

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ variant = "primary", to, href, className = "", children, ...props }, ref) => {
    const base =
      `inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-medium transition-all duration-300 ${variantStyles[variant]} ${className}`;

    if (to) {
      return (
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="inline-flex"
        >
          <Link to={to} className={base}>
            {children}
          </Link>
        </motion.div>
      );
    }

    if (href) {
      return (
        <motion.a
          href={href}
          className={base}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={base}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

CTAButton.displayName = "CTAButton";
