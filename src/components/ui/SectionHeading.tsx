import { AnimatedSection } from "../../lib/animations-components";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  gradient?: boolean;
}

export default function SectionHeading({ title, subtitle, align = "center", gradient }: SectionHeadingProps) {
  return (
    <AnimatedSection className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
      <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${gradient ? "text-gradient" : "text-dark"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-500 max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full ${align === "center" ? "mx-auto" : ""}`} />
    </AnimatedSection>
  );
}
