import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/ui/LoadingSpinner";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Contact = lazy(() => import("./pages/Contact"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Checkout = lazy(() => import("./pages/Checkout"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Auth = lazy(() => import("./pages/Auth"));
const PaymentFailed = lazy(() => import("./pages/PaymentFailed"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminMessage = lazy(() => import("./pages/AdminMessage"));
const MyMessages = lazy(() => import("./pages/MyMessages"));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="how-it-works" element={<HowItWorks />} />
              <Route path="contact" element={<Contact />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="thank-you" element={<ThankYou />} />
              <Route path="login" element={<Auth mode="login" />} />
              <Route path="signup" element={<Auth mode="signup" />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/message/:id" element={<AdminMessage />} />
              <Route path="my-messages" element={<MyMessages />} />
              <Route path="payment-failed" element={<PaymentFailed />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
