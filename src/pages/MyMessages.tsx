import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle, Clock, Mail, Inbox } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import SectionHeading from "../components/ui/SectionHeading";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { staggerContainer, staggerItem } from "../lib/animations";
import { AnimatedSection } from "../lib/animations-components";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_BASE_URL || "/api";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: number;
  is_replied: number;
  reply_message: string | null;
  replied_at: string | null;
  created_at: string;
}

export default function MyMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (!user?.uid) return;
    const fetchMessages = async () => {
      try {
        const res = await fetch(API + "/my-messages.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_uid: user.uid }),
        });
        const data = await res.json();
        if (data.success) {
          setMessages(data.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [user?.uid]);

  if (!user) {
    return (
      <section className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <GlassCard className="p-8 text-center max-w-md">
          <Mail size={48} className="mx-auto mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Sign in to view your messages</h2>
          <p className="text-gray-500 mb-4">Please sign in to see your submitted messages and replies.</p>
          <a href="/login" className="inline-block bg-primary-darker text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
            Sign In
          </a>
        </GlassCard>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <SectionHeading
            title="My Messages"
            subtitle="View your submitted messages and responses from our team"
          />
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center mt-16">
            <LoadingSpinner />
          </div>
        ) : messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <GlassCard className="p-12 text-center">
              <Inbox size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No messages yet</h3>
              <p className="text-gray-400 mb-4">You haven't submitted any contact messages yet.</p>
              <a href="/contact" className="text-primary-darker font-medium hover:underline">
                Contact us →
              </a>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-12 space-y-4"
          >
            {messages.map((msg) => (
              <motion.div key={msg.id} variants={staggerItem}>
                <GlassCard className="overflow-hidden">
                  <button
                    onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-white/20 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-dark truncate">{msg.subject}</h3>
                        <div className="flex gap-2 shrink-0">
                          {msg.is_replied ? (
                            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                              <CheckCircle size={12} /> Replied
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                              <Clock size={12} /> Pending
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{msg.message}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-gray-400">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedId === msg.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={18} className="text-gray-400" />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedId === msg.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 space-y-4 border-t border-white/20 pt-4">
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Your Message</p>
                            <div className="bg-white/30 rounded-lg p-4 text-sm text-gray-700">
                              <p className="text-xs text-gray-400 mb-1">
                                {new Date(msg.created_at).toLocaleString()}
                              </p>
                              <p>{msg.message}</p>
                            </div>
                          </div>

                          {msg.is_replied && msg.reply_message && (
                            <div>
                              <p className="text-xs text-green-600 uppercase tracking-wider mb-1">Our Reply</p>
                              <div className="bg-green-50 rounded-lg p-4 text-sm text-gray-700 border border-green-200">
                                <p className="text-xs text-gray-400 mb-1">
                                  {msg.replied_at ? new Date(msg.replied_at).toLocaleString() : ""}
                                </p>
                                <p>{msg.reply_message}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
