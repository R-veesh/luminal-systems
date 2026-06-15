import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fadeInUp, staggerContainer, staggerItem } from "../lib/animations";

interface AuthProps {
  mode: "login" | "signup";
}

export default function Auth({ mode }: AuthProps) {
  const isLogin = mode === "login";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!isLogin && (!firstName.trim() || !lastName.trim())) {
      setError("First name and last name are required");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        const displayName = `${firstName.trim()} ${lastName.trim()}`;
        await signUpWithEmail(email, password, displayName);
      }
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        const msg = err.message
          .replace("Firebase: ", "")
          .replace(/\(auth\/[^)]+\)/g, "")
          .trim();
        setError(msg || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithGoogle();
      navigate("/");
    } catch {
      setError("Google sign-in failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-500">
            {isLogin ? "Sign in to your account to continue" : "Get started with your free account"}
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="glass rounded-2xl p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-error/10 border border-error/20 text-error text-sm rounded-xl px-4 py-3 mb-5"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
              </div>
              {isLogin && (
                <p className="text-xs text-gray-400 mt-1.5 text-right">
                  <Link to="#" className="hover:text-primary-darker transition-colors">Forgot password?</Link>
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                    placeholder="Re-enter password"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className="w-full bg-primary-darker text-white py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary-darker/25 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white/60 px-3 text-gray-400">or continue with</span>
            </div>
          </div>

          <motion.button
            onClick={handleGoogle}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white/50 hover:bg-white/80 hover:border-gray-300 transition-all text-sm font-medium text-gray-700"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </motion.button>
        </motion.div>

        <motion.p variants={staggerItem} className="text-center text-sm text-gray-500 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            to={isLogin ? "/signup" : "/login"}
            className="text-primary-darker font-medium hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
