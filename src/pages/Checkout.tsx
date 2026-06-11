import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { ArrowLeft, CreditCard, User } from "lucide-react";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const planData = location.state as { plan: { id: string; name: string; monthlyPrice: number; yearlyPrice: number }; yearly: boolean } | null;

  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "" });
  const [createAccount, setCreateAccount] = useState(false);
  const [processing, setProcessing] = useState(false);

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
    setProcessing(true);

    const orderId = "LUM-" + Date.now();

    // Simulate PayHere payment processing
    await new Promise((r) => setTimeout(r, 1500));

    // If account creation is opted in, register via Firebase
    let accountCreated = false;
    if (createAccount && form.email) {
      try {
        const password = "Temp@" + Math.random().toString(36).slice(-8);
        await createUserWithEmailAndPassword(auth, form.email, password);
        accountCreated = true;
      } catch {
        // Firebase registration failed silently
      }
    }

    setProcessing(false);
    navigate("/thank-you", {
      state: {
        plan: plan.name,
        price,
        orderId,
        accountCreated,
        email: form.email,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 text-sm mb-8 hover:text-dark transition-colors">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <h1 className="text-3xl font-bold text-dark mb-8">Checkout</h1>

          <div className="space-y-5">
            {(["name", "email", "address", "city", "zip"] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-dark mb-1.5 capitalize">{field === "zip" ? "ZIP Code" : field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>
            ))}

            <label className="flex items-center gap-3 cursor-pointer mt-4">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${createAccount ? "bg-primary-darker border-primary-darker" : "border-gray-300"}`}
                onClick={() => setCreateAccount(!createAccount)}
              >
                {createAccount && <span className="text-white text-xs">✓</span>}
              </div>
              <span className="text-sm text-gray-600">
                <User size={14} className="inline mr-1" />
                Create an account for later
              </span>
            </label>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="backdrop-blur-md bg-white/50 border border-white/30 rounded-2xl p-6 sticky top-24">
            <h3 className="font-semibold text-dark mb-4">Order Summary</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">{plan.name} Plan</span>
              <span className="text-sm font-medium">${price}/{yearly ? "yr" : "mo"}</span>
            </div>
            <div className="border-t border-gray-200 my-4 pt-4 flex justify-between items-center">
              <span className="font-semibold text-dark">Total</span>
              <span className="text-xl font-bold text-primary-darker">${price}.00</span>
            </div>
            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-primary-darker text-white py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary-darker/25 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
            >
              <CreditCard size={18} />
              {processing ? "Processing..." : `Pay $${price}.00`}
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">Secured via PayHere Sandbox</p>
          </div>
        </div>
      </div>
    </div>
  );
}
