import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Search, ChevronLeft, ChevronRight, MessageSquare, Eye, Filter } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { staggerContainer, staggerItem } from "../lib/animations";
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

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!user?.email) return;
    let active = true;
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page), limit: "20" });
        if (search) params.set("search", search);
        if (status) params.set("status", status);

        const email = user.email;
        if (!email) return;
        const res = await fetch(API + "/admin/contacts.php?" + params, {
          headers: { "X-Admin-Email": email },
        });
        const data = await res.json();
        if (!active) return;
        if (data.success) {
          setContacts(data.data);
          setTotal(data.total);
          setPages(data.pages);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchContacts();
    return () => { active = false; };
  }, [page, search, status, user?.email, refreshKey]);

  const toggleStatus = async (id: number, field: "is_read" | "is_replied", value: number) => {
    const email = user?.email;
    if (!email) return;
    await fetch(API + "/admin/contacts.php", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Admin-Email": email },
      body: JSON.stringify({ id, field, value }),
    });
    setRefreshKey(k => k + 1);
  };

  const timeAgo = (date: string) => {
    const ms = new Date().getTime() - new Date(date).getTime();
    const mins = Math.max(0, Math.floor(ms / 60000));
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-dark mb-4">Please sign in</h1>
        <p className="text-gray-500">You need to sign in to access the admin panel.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">{total} total messages</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Mail size={16} />
          <span>{user.email}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm appearance-none"
          >
            <option value="">All messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="unreplied">Unreplied</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading...</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Mail size={40} className="mx-auto mb-4 opacity-30" />
          <p>No messages found</p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-3"
        >
          {contacts.map((c) => (
            <motion.div key={c.id} variants={staggerItem}>
              <GlassCard
                className="p-5 cursor-pointer"
                onClick={() => navigate(`/admin/message/${c.id}`)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        c.is_read ? "bg-gray-400" : "bg-primary-darker"
                      }`}>
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-semibold text-dark text-sm">{c.name}</span>
                        <span className="text-gray-400 text-xs ml-2">{c.email}</span>
                      </div>
                      <span className="text-gray-400 text-xs ml-auto shrink-0">{timeAgo(c.created_at)}</span>
                    </div>
                    <p className="text-sm font-medium text-dark mb-1">{c.subject}</p>
                    <p className="text-sm text-gray-500 truncate">{c.message}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleStatus(c.id, "is_read", c.is_read ? 0 : 1); }}
                      className={`p-2 rounded-lg transition-colors ${
                        c.is_read ? "bg-primary/20 text-primary-darker" : "text-gray-400 hover:bg-gray-100"
                      }`}
                      title={c.is_read ? "Mark unread" : "Mark read"}
                    >
                      <Eye size={16} />
                    </button>
                    <div className={`p-2 rounded-lg ${c.is_replied ? "bg-primary/20 text-primary-darker" : "text-gray-300"}`}>
                      <MessageSquare size={16} />
                    </div>
                  </div>
                </div>
                {c.is_replied && c.reply_message && (
                  <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500">
                    <span className="text-primary-darker font-medium text-xs">Replied</span>
                    <p className="truncate mt-0.5">{c.reply_message}</p>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-gray-500">
            Page {page} of {pages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(pages, p + 1))}
            disabled={page === pages}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
