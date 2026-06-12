import { motion } from "framer-motion";

interface Step {
  label: string;
}

interface ProgressStepsProps {
  steps: Step[];
  current: number;
}

export default function ProgressSteps({ steps, current }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((step, i) => {
        const isCompleted = i < current;
        const isActive = i === current;
        return (
          <div key={step.label} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  backgroundColor: isCompleted || isActive ? "#1F6F5F" : "#E5E7EB",
                  scale: isActive ? 1.1 : 1,
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              >
                {isCompleted ? (
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                ) : (
                  <span className={isActive ? "text-white" : "text-gray-400"}>{i + 1}</span>
                )}
              </motion.div>
              <span className={`text-xs font-medium hidden sm:block ${isActive ? "text-primary-darker" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <motion.div
                animate={{ backgroundColor: isCompleted ? "#1F6F5F" : "#E5E7EB" }}
                className="w-8 sm:w-12 h-0.5 rounded"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
