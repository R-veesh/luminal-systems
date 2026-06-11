import { useLocation, Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function ThankYou() {
  const location = useLocation();
  const data = location.state as { plan: string; price: number; orderId: string; accountCreated: boolean; email: string } | null;

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
      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="text-primary-darker" size={40} />
      </div>
      <h1 className="text-4xl font-bold text-dark mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-600 mb-8">Thank you for your purchase.</p>

      {data.accountCreated && (
        <div className="backdrop-blur-md bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-8">
          <p className="text-primary-darker font-medium">
            Welcome! Your account has been created. Check <span className="font-bold">{data.email}</span> for login details.
          </p>
        </div>
      )}

      <div className="backdrop-blur-md bg-white/50 border border-white/30 rounded-2xl p-8 text-left space-y-4 mb-8">
        <div className="flex justify-between">
          <span className="text-gray-500">Order ID</span>
          <span className="font-medium text-dark">{data.orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Plan</span>
          <span className="font-medium text-dark">{data.plan}</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-4">
          <span className="font-semibold text-dark">Total Paid</span>
          <span className="font-bold text-xl text-primary-darker">${data.price}.00</span>
        </div>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-primary-darker text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-lg"
      >
        Back to Home
        <ArrowRight size={20} />
      </Link>
    </div>
  );
}
