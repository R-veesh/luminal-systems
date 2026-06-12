import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Lottie from "lottie-react";
import { GlassCard } from "../components/ui/GlassCard";
import { staggerContainer, staggerItem } from "../lib/animations";
import animationData from "../assets/bad-payment.json";

export default function PaymentFailed() {
  const location = useLocation();
  const stored = sessionStorage.getItem("orderInfo");
  const parsed = stored ? JSON.parse(stored) : null;
  const data = location.state || parsed;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="mx-auto mb-6 w-64"
      >
        <Lottie animationData={animationData} loop={false} />
      </motion.div>

      {data?.accountCreated && data?.email && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-primary rounded-2xl p-5 mb-8"
        >
          <p className="text-primary-darker font-medium text-sm">
            Your account was created but payment did not go through. Check{" "}
            <span className="font-bold">{data.email}</span> for details.
          </p>
        </motion.div>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-4xl font-bold text-dark mb-3"
      >
        Payment Failed
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-500 text-lg mb-8"
      >
        Something went wrong with your payment. Please try again.
      </motion.p>

      {data && (
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
            <motion.div variants={staggerItem} className="flex items-center gap-2 bg-red-50 rounded-lg p-3 mt-2">
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <span className="text-sm text-red-700">Payment was not completed. No charges were made.</span>
            </motion.div>
          </GlassCard>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link
          to="/pricing"
          className="group inline-flex items-center gap-2 bg-primary-darker text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary-darker/25"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Try Again
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-gray-600 hover:text-primary-darker transition-colors"
        >
          Contact Support
        </Link>
      </motion.div>
    </div>
  );
}
