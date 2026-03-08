"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  CreditCard,
  Bell,
  LogOut,
  Camera,
  CheckCircle2,
  Clock,
  ExternalLink,
  History,
  LayoutDashboard,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";

/* ─────────────────────────────────────────────
   Profile Tab
───────────────────────────────────────────── */
const ProfileTab = ({ user }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-500" /> Personal Information
        </h3>
        <div className="space-y-3">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Full Name</span>
            <span className="text-sm font-medium text-slate-700">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Email Address</span>
            <span className="text-sm font-medium text-slate-700">
              {user?.email}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Phone Number</span>
            <span className="text-sm font-medium text-slate-700">
              {user?.phone || "—"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4 text-blue-500" /> Business Details
        </h3>
        <div className="space-y-3">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Business Name</span>
            <span className="text-sm font-medium text-slate-700">
              {user?.business?.name || "—"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Business Type</span>
            <span className="text-sm font-medium text-slate-700">
              {user?.business?.type || "—"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Location</span>
            <span className="text-sm font-medium text-slate-700">
              {user?.business
                ? `${user.business.city}, ${user.business.province}`
                : "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Subscription Tab
───────────────────────────────────────────── */
const SubscriptionTab = ({ subscriptions }) => {
  const active = subscriptions?.[0];
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Current Plan</h3>
          <p className="text-xs text-slate-500 mt-1">
            Manage your billing and subscription
          </p>
        </div>
        {active && (
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
            {active.status}
          </span>
        )}
      </div>
      <div className="p-6 space-y-6">
        {active ? (
          <>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800">
                  {active.planName}
                </h4>
                <p className="text-sm text-slate-500">
                  ${active.amount} / month • Renews on{" "}
                  {new Date(active.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors">
                Upgrade Plan
              </button>
              <button className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors">
                Manage Billing
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <CreditCard className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">
              No active subscription found
            </p>
            <a
              href="/payment"
              className="mt-4 inline-block px-4 py-2 rounded-lg bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition-colors"
            >
              Choose a Plan
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Payments Tab
───────────────────────────────────────────── */
const PaymentsTab = ({ payments }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    {payments?.length > 0 ? (
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50">
            {["Transaction ID", "Date", "Amount", "Status"].map((h) => (
              <th
                key={h}
                className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {payments.map((txn) => (
            <tr key={txn.id} className="hover:bg-slate-50/30 transition-colors">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700">
                    {txn.transactionId}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {txn.method || "Card"}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                {new Date(txn.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                ${txn.amount}
              </td>
              <td className="px-6 py-4">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-[10px] font-bold uppercase",
                    txn.status === "SUCCESS"
                      ? "text-green-600"
                      : "text-amber-600",
                  )}
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      txn.status === "SUCCESS"
                        ? "bg-green-500"
                        : "bg-amber-500",
                    )}
                  />
                  {txn.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="text-center py-12">
        <History className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 text-sm">No payment history yet</p>
      </div>
    )}
  </div>
);

/* ─────────────────────────────────────────────
   Notifications Tab
───────────────────────────────────────────── */
const NotificationsTab = ({ notifications }) =>
  notifications?.length > 0 ? (
    <div className="space-y-3">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex gap-4"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-800">
              {notif.title}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">{notif.message}</p>
            <span className="text-[10px] text-slate-400 mt-2 block">
              {new Date(notif.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-12">
      <Bell className="w-10 h-10 text-slate-300 mx-auto mb-3" />
      <p className="text-slate-500 text-sm">No new notifications</p>
    </div>
  );

/* ─────────────────────────────────────────────
   DashboardPage
───────────────────────────────────────────── */
const DashboardPage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const getProfilePicUrl = (path) => {
    if (!path)
      return `https://ui-avatars.com/api/?name=${encodeURIComponent((user?.firstName || "U") + " " + (user?.lastName || ""))}&background=3b82f6&color=fff`;
    if (path.startsWith("blob:") || path.startsWith("http")) return path;
    return `${import.meta.env.VITE_BACKEND_URL}${path}`;
  };

  const [activeTab, setActiveTab] = useState("profile");
  const [profilePic, setProfilePic] = useState(
    getProfilePicUrl(user?.profilePic),
  );
  const [uploading, setUploading] = useState(false);

  // Sync profilePic state when user object changes
  React.useEffect(() => {
    if (user?.profilePic) {
      setProfilePic(getProfilePicUrl(user.profilePic));
    }
  }, [user?.profilePic]);

  // These would come from sp_GetDashboardData in production
  const subscriptions = user?.subscriptions || [];
  const payments = user?.payments || [];
  const notifications = user?.notifications || [];

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "subscription", label: "Subscription", icon: CreditCard },
    { id: "payments", label: "Payments", icon: History },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const preview = URL.createObjectURL(file);
    setProfilePic(preview);

    const formData = new FormData();
    formData.append("profilePic", file);
    setUploading(true);

    try {
      const { data } = await api.post("/dashboard/profile-pic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newPicPath = data.profilePic;
      const fullUrl = `${import.meta.env.VITE_BACKEND_URL}${newPicPath}`;
      setProfilePic(fullUrl);
      updateUser({ profilePic: newPicPath });
    } catch (err) {
      console.error("Failed to upload profile pic:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col p-6 fixed inset-y-0">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div
            className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
            onClick={() => navigate("/")}
          >
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <span
            className="font-bold text-slate-800 cursor-pointer hover:text-blue-900 transition-colors"
            onClick={() => navigate("/")}
          >
            Bill Till
          </span>
        </div>

        <nav className="flex-1 space-y-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700",
              )}
            >
              <tab.icon
                className={cn(
                  "w-4 h-4",
                  activeTab === tab.id ? "text-blue-600" : "text-slate-400",
                )}
              />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Need Help?
            </p>
            <p className="text-xs text-slate-600 mb-3">
              Check our documentation or contact support.
            </p>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700">
              Help Center <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> Back to Website
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sm:px-10 sticky top-0 z-10">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-slate-800 capitalize">
              {activeTab}
            </h1>
            <p className="text-xs text-slate-400">Dashboard / {activeTab}</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("notifications")}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {notifications.filter((n) => !n.isRead).length > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
              )}
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-none">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">
                  {user?.role || "member"}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-slate-100 overflow-hidden shadow-sm">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 sm:p-10 max-w-5xl">
          {/* Profile hero */}
          {activeTab === "profile" && (
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 mb-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-2xl border-4 border-white/20 overflow-hidden shadow-2xl">
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg border border-slate-100 hover:scale-105 transition-transform"
                  >
                    {uploading ? (
                      <div className="w-3 h-3 border-2 border-blue-500/40 border-t-blue-500 rounded-full animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-white">
                    Hello, {user?.firstName || "there"}! 👋
                  </h2>
                  <p className="text-blue-100/80 text-sm mt-1">
                    Manage your profile and business settings.
                  </p>
                </div>
                <div className="sm:ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                  <ShieldCheck className="w-4 h-4 text-blue-300" />
                  <span className="text-xs font-semibold">
                    Verified Merchant
                  </span>
                </div>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "profile" && <ProfileTab user={user} />}
              {activeTab === "subscription" && (
                <SubscriptionTab subscriptions={subscriptions} />
              )}
              {activeTab === "payments" && <PaymentsTab payments={payments} />}
              {activeTab === "notifications" && (
                <NotificationsTab notifications={notifications} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around px-4 z-20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all",
              activeTab === tab.id
                ? "text-blue-600 bg-blue-50"
                : "text-slate-400",
            )}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-[10px] font-bold">{tab.label}</span>
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-red-400"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[10px] font-bold">Exit</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
