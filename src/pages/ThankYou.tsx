import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Lottie from "lottie-react";
import { GlassCard } from "../components/ui/GlassCard";
import { staggerContainer, staggerItem } from "../lib/animations";
import animationData from "../assets/payment-ok.json";

export default function ThankYou() {
  const location = useLocation();
  const stored = sessionStorage.getItem("orderInfo");
  const parsed = stored ? JSON.parse(stored) : null;
  const data = location.state || parsed;

  if (!data) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-dark mb-4">Order Not Found</h1>
        <Link to="/pricing" className="text-primary-darker underline">View Plans</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="mx-auto mb-6 w-48 h-48"
      >
        <Lottie animationData={animationData} loop={false} />
      </motion.div>

      {data.accountCreated && data.email && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-primary rounded-2xl p-5 mb-8"
        >
          <p className="text-primary-darker font-medium text-sm">
            Welcome! Your account has been created. Check{" "}
            <span className="font-bold">{data.email}</span> for login details.
          </p>
        </motion.div>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-4xl font-bold text-dark mb-3"
      >
        Payment Successful!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-500 text-lg mb-8"
      >
        Thank you for your purchase. Your journey starts now.
      </motion.p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        transition={{ delay: 0.8 }}
      >
        <GlassCard className="p-8 text-left space-y-4 mb-8">
          <motion.div variants={staggerItem} className="flex justify-between">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium text-dark font-mono text-sm">{data.orderId}</span>
          </motion.div>
          <motion.div variants={staggerItem} className="flex justify-between">
            <span className="text-gray-500">Plan</span>
            <span className="font-medium text-dark">{data.plan}</span>
          </motion.div>
          <motion.div variants={staggerItem} className="flex justify-between border-t border-gray-100 pt-4">
            <span className="font-semibold text-dark">Total Paid</span>
            <motion.span
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="font-bold text-2xl text-gradient"
            >
              ${data.price}.00
            </motion.span>
          </motion.div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <Link
          to="/"
          className="group inline-flex items-center gap-2 bg-primary-darker text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary-darker/25"
        >
          Back to Home
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
}
