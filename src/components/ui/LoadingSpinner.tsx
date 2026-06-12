import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-10 h-10 bg-primary-darker rounded-xl flex items-center justify-center"
      >
        <span className="text-white font-bold text-sm">L</span>
      </motion.div>
      <motion.p
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-gray-400 text-sm"
      >
        Loading...
      </motion.p>
    </div>
  );
}
