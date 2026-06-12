import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Send, CheckCircle, Clock, MessageSquare } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_BASE_URL || "/api";

interface Contact {
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

export default function AdminMessage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [contact, setContact] = useState<Contact | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = user?.email;
    if (!email || !id) return;
    const fetchMessage = async () => {
      try {
        const res = await fetch(API + `/admin/contacts.php?id=${id}&limit=1`, {
          headers: { "X-Admin-Email": email },
        });
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setContact(data.data[0]);
          // Mark as read
          await fetch(API + "/admin/contacts.php", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-Admin-Email": email },
            body: JSON.stringify({ id: data.data[0].id, field: "is_read", value: 1 }),
          });
          data.data[0].is_read = 1;
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [id, user?.email]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = user?.email;
    if (!reply.trim() || !email || !contact) return;
    setSending(true);
    try {
      const res = await fetch(API + "/admin/reply.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Email": email },
        body: JSON.stringify({ id: contact.id, reply: reply.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setContact({ ...contact, is_replied: 1, reply_message: reply.trim(), replied_at: new Date().toISOString() });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-dark mb-4">Please sign in</h1>
        <p className="text-gray-500">You need to sign in to access the admin panel.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading...</div>;
  }

  if (!contact) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-dark mb-4">Message not found</h1>
        <button onClick={() => navigate("/admin")} className="text-primary-darker underline">Back to admin</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 text-gray-400 text-sm mb-8 hover:text-dark transition-colors group"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back to Messages
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <GlassCard className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-dark">{contact.name}</h2>
                  <a href={`mailto:${contact.email}`} className="text-primary-darker text-sm hover:underline">
                    {contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(contact.created_at).toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare size={12} />
                  {contact.is_replied ? "Replied" : "Awaiting reply"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <p className="text-sm font-semibold text-dark mb-2">{contact.subject}</p>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
          </div>

          {contact.is_replied && contact.reply_message && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-primary-darker mb-2">
                <CheckCircle size={16} />
                Your Reply
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{contact.reply_message}</p>
              {contact.replied_at && (
                <p className="text-xs text-gray-400 mt-2">{new Date(contact.replied_at).toLocaleString()}</p>
              )}
            </div>
          )}
        </GlassCard>

        {!contact.is_replied && (
          <GlassCard className="p-8">
            <h3 className="font-semibold text-dark mb-4 flex items-center gap-2">
              <Mail size={18} />
              Reply to {contact.name}
            </h3>

            {sent ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="text-white" size={32} />
                </motion.div>
                <p className="font-semibold text-dark mb-1">Reply Sent!</p>
                <p className="text-sm text-gray-500">Your reply has been sent to {contact.email}</p>
              </div>
            ) : (
              <form onSubmit={handleReply} className="space-y-4">
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-sm"
                  placeholder="Write your reply..."
                  required
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    Reply will be sent to {contact.email}
                  </p>
                  <motion.button
                    type="submit"
                    disabled={sending || !reply.trim()}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="inline-flex items-center gap-2 bg-primary-darker text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-all shadow-lg shadow-primary-darker/25 disabled:opacity-50 text-sm"
                  >
                    {sending ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Reply
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </GlassCard>
        )}
      </motion.div>
    </div>
  );
}
