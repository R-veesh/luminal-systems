import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary-darker text-white hover:bg-primary-dark shadow-lg shadow-primary-darker/25",
  secondary: "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20",
  outline: "border border-gray-300 text-gray-700 hover:border-primary hover:text-primary-darker hover:bg-primary/5",
  ghost: "text-gray-600 hover:text-primary-darker hover:bg-primary/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", to, loading, className = "", children, ...props }, ref) => {
    const base = `inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (to) {
      return (
        <Link to={to} className={base}>
          {children}
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={base}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
