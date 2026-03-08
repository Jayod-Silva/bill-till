import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Shield,
  CreditCard,
  BarChart3,
  ShoppingCart,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentForm from "@/components/sections/PaymentForm";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Brand Left Panel (Replicated from Registration)
───────────────────────────────────────────── */
const features = [
  {
    icon: BarChart3,
    label: "Real-time Analytics",
    color: "bg-blue-500/20 text-blue-300",
  },
  {
    icon: ShoppingCart,
    label: "Smart POS System",
    color: "bg-purple-500/20 text-purple-300",
  },
  {
    icon: Shield,
    label: "Secure & Compliant",
    color: "bg-emerald-500/20 text-emerald-300",
  },
  {
    icon: Sparkles,
    label: "AI-powered Insights",
    color: "bg-amber-500/20 text-amber-300",
  },
];

const BrandPanel = () => (
  <div className="relative hidden lg:flex flex-col justify-between w-[45%] min-h-screen overflow-hidden bg-[#0a0f1e] px-12 py-14">
    {/* Background glow blobs */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-600/15 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-400/10 blur-[80px]" />
    </div>

    {/* Grid texture overlay */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />

    {/* Logo */}
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex items-center"
    >
      <img src="/white-logo.png" alt="Bill Till Logo" className="h-10 w-auto" />
    </motion.div>

    {/* Main copy */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative z-10"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
        <Sparkles className="w-3 h-3" />
        Trusted by 2,000+ businesses
      </div>

      <h2 className="text-4xl font-bold text-white leading-tight mb-4">
        The future of
        <br />
        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          commerce is here.
        </span>
      </h2>

      <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
        Manage your entire business from a single, beautiful platform. Payments,
        inventory, and analytics — all in one place.
      </p>

      {/* Feature pills */}
      <div className="mt-8 flex flex-col gap-3">
        {features.map(({ icon: Icon, label, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            className="flex items-center gap-3"
          >
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                color,
              )}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-slate-300 text-sm font-medium">{label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* Testimonial */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="relative z-10 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <p className="text-slate-300 text-sm leading-relaxed italic">
        "Bill Till transformed how we run our retail chain. The analytics alone
        have paid for themselves tenfold."
      </p>
    </motion.div>
  </div>
);

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the main navbar when on payment page
  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      navbar.style.display = "none";
    }

    // Cleanup: restore navbar when leaving the page
    return () => {
      if (navbar) {
        navbar.style.display = "";
      }
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#fcfcfd]">
      {/* Left Panel - Brand (Visible on LG up) */}
      <BrandPanel />

      {/* Right Panel - Form (Always visible) */}
      <div className="flex-1 relative flex flex-col items-center justify-center px-6 py-12 lg:px-20 lg:py-24 overflow-y-auto">
        {/* Floating "Back to Home" button */}
        <button
          onClick={() => navigate("/")}
          className="group absolute top-8 left-8 lg:left-20 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 font-medium transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Home
        </button>

        <div className="w-full max-w-2xl mt-10 md:mt-0">
          {/* Header Section */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1">
              Secure payment
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight">
              Complete Your Registration
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Provide your payment information to activate your account.
            </p>
          </div>

          {/* Form container matching registration page style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] border border-slate-100 p-6 sm:p-8"
          >
            {/* The original PaymentForm component */}
            <PaymentForm
              selectedPlan={location.state?.selectedPlan || "Pro"}
              isMonthly={
                location.state?.isMonthly !== undefined
                  ? location.state.isMonthly
                  : true
              }
            />
          </motion.div>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-slate-400">
            Need help? Contact our support at{" "}
            <a
              href="mailto:support@billtill.com"
              className="text-slate-500 hover:text-slate-700 underline underline-offset-2"
            >
              support@billtill.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
