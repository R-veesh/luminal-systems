import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { ArrowLeft, CreditCard, User, Check } from "lucide-react";
import md5 from "blueimp-md5";
import { GlassCard } from "../components/ui/GlassCard";
import ProgressSteps from "../components/ui/ProgressSteps";
import { staggerContainer, staggerItem } from "../lib/animations";

const steps = [
  { label: "Billing" },
  { label: "Review" },
  { label: "Payment" },
];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const planData = location.state as { plan: { id: string; name: string; monthlyPrice: number; yearlyPrice: number }; yearly: boolean } | null;

  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "" });
  const [createAccount, setCreateAccount] = useState(false);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  if (!planData) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-dark mb-4">No Plan Selected</h1>
        <button onClick={() => navigate("/pricing")} className="text-primary-darker underline">View Plans</button>
      </div>
    );
  }

  const { plan, yearly } = planData;
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

  const handlePayment = async () => {
    setSubmitting(true);
    const orderId = "LUM-" + Date.now();
    const origin = window.location.origin;

    if (createAccount && form.email) {
      try {
        const password = "Temp@" + Math.random().toString(36).slice(-8);
        await createUserWithEmailAndPassword(auth, form.email, password);
      } catch {
        // Firebase registration failed silently
      }
    }

    sessionStorage.setItem("orderInfo", JSON.stringify({
      plan: plan.name,
      price,
      orderId,
      email: form.email,
    }));

    const amount = price.toFixed(2);
    const merchantId = import.meta.env.VITE_PAYHERE_MERCHANT_ID;
    const secret = import.meta.env.VITE_PAYHERE_SECRET;
    const hash = md5(merchantId + orderId + amount + "LKR" + "0" + secret).toUpperCase();

    const inputs = {
      merchant_id: merchantId,
      return_url: origin + "/thank-you?order=" + orderId,
      cancel_url: origin + "/pricing",
      notify_url: origin + "/api/payment-notify",
      order_id: orderId,
      items: `${plan.name} - ${yearly ? "Yearly" : "Monthly"}`,
      currency: "LKR",
      amount,
      first_name: form.name.split(" ")[0] || "Customer",
      last_name: form.name.split(" ").slice(1).join(" ") || " ",
      email: form.email,
      phone: "0771234567",
      address: form.address,
      city: form.city,
      country: "Sri Lanka",
      hash,
    };

    const f = document.createElement("form");
    f.method = "POST";
    f.action = "https://sandbox.payhere.lk/pay/checkout";
    f.style.display = "none";

    for (const [name, value] of Object.entries(inputs)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      f.appendChild(input);
    }

    document.body.appendChild(f);
    f.submit();
  };

  const isValid = form.name && form.email && form.address && form.city && form.zip;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 text-sm mb-8 hover:text-dark transition-colors group">
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back
      </button>

      <ProgressSteps steps={steps} current={step} />

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="grid md:grid-cols-5 gap-8"
      >
        <div className="md:col-span-3">
          {step === 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 variants={staggerItem} className="text-3xl font-bold text-dark mb-8">Billing Information</motion.h1>
              <div className="space-y-4">
                {(["name", "email", "address", "city", "zip"] as const).map((field) => (
                  <motion.div key={field} variants={staggerItem}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 capitalize">
                      {field === "zip" ? "ZIP Code" : field}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                      required
                    />
                  </motion.div>
                ))}
              </div>

              <motion.label variants={staggerItem} className="flex items-center gap-3 cursor-pointer mt-6">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${createAccount ? "bg-primary-darker border-primary-darker" : "border-gray-300"}`}
                  onClick={() => setCreateAccount(!createAccount)}
                >
                  {createAccount && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-white text-xs"
                    >
                      <Check size={12} />
                    </motion.span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  <User size={14} className="inline mr-1.5" />
                  Create an account for later
                </span>
              </motion.label>

              <motion.button
                variants={staggerItem}
                onClick={() => setStep(1)}
                disabled={!isValid}
                whileHover={{ scale: isValid ? 1.01 : 1 }}
                whileTap={{ scale: isValid ? 0.99 : 1 }}
                className="mt-8 w-full bg-primary-darker text-white py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-all shadow-lg shadow-primary-darker/25 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue to Review
              </motion.button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 variants={staggerItem} className="text-3xl font-bold text-dark mb-6">Review Order</motion.h1>
              <motion.div variants={staggerItem} className="space-y-4 glass rounded-2xl p-6 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-dark">{form.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium text-dark">{form.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Address</span>
                  <span className="font-medium text-dark">{form.address}, {form.city} {form.zip}</span>
                </div>
              </motion.div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(0)}
                  className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:border-gray-300 transition-all"
                >
                  Edit
                </button>
                <motion.button
                  onClick={() => setStep(2)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex-[2] bg-primary-darker text-white py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-all shadow-lg shadow-primary-darker/25"
                >
                  Continue to Payment
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 variants={staggerItem} className="text-3xl font-bold text-dark mb-4">Complete Payment</motion.h1>
              <motion.p variants={staggerItem} className="text-gray-500 mb-8">
                You'll be redirected to PayHere's secure checkout to complete your payment.
              </motion.p>
              <motion.button
                variants={staggerItem}
                onClick={handlePayment}
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.01 }}
                whileTap={{ scale: submitting ? 1 : 0.99 }}
                className="w-full bg-primary-darker text-white py-4 rounded-xl font-medium hover:bg-primary-dark transition-all shadow-lg shadow-primary-darker/25 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <CreditCard size={20} />
                    Pay ${price}.00 via PayHere
                  </>
                )}
              </motion.button>
              <p className="text-xs text-gray-400 text-center mt-4">Secured via PayHere Sandbox</p>
            </motion.div>
          )}
        </div>

        <div className="md:col-span-2">
          <GlassCard className="p-6 sticky top-24">
            <h3 className="font-semibold text-dark mb-5">Order Summary</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-sm">{plan.name} Plan</span>
              <span className="text-sm font-medium">${price}/{yearly ? "yr" : "mo"}</span>
            </div>
            <div className="space-y-2 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${price}.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="text-success">$0.00</span>
              </div>
            </div>
            <div className="border-t border-gray-200 my-4 pt-4 flex justify-between items-center">
              <span className="font-semibold text-dark">Total</span>
              <motion.span
                key={price}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-xl font-bold text-primary-darker"
              >
                ${price}.00
              </motion.span>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
}
