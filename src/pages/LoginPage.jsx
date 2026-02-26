"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  ShieldCheck,
  Zap,
  LayoutDashboard,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";

/* ─────────────────────────────────────────────
   Floating Label Input (Reused from Registration)
───────────────────────────────────────────── */
const FloatingInput = ({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  error,
  icon: Icon,
  rightElement,
  placeholder,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value?.length > 0;

  return (
    <div className="relative">
      <div
        className={cn(
          "relative flex items-center rounded-xl border bg-white transition-all duration-200",
          focused
            ? "border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
            : error
            ? "border-red-400 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]"
            : "border-slate-200 hover:border-slate-300"
        )}
      >
        {Icon && (
          <div
            className={cn(
              "absolute left-3.5 transition-colors duration-200",
              focused ? "text-blue-500" : "text-slate-400"
            )}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={lifted ? placeholder : ""}
          className={cn(
            "peer w-full bg-transparent py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400",
            Icon ? "pl-10 pr-4" : "px-4",
            rightElement ? "pr-12" : ""
          )}
          {...rest}
        />

        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute transition-all duration-200 origin-left text-slate-500 select-none",
            Icon
              ? lifted
                ? "left-10 top-1.5 text-[10px] font-medium"
                : "left-10 top-1/2 -translate-y-1/2 text-sm"
              : lifted
              ? "left-4 top-1.5 text-[10px] font-medium"
              : "left-4 top-1/2 -translate-y-1/2 text-sm",
            lifted && (focused ? "text-blue-500" : "text-slate-400")
          )}
        >
          {label}
        </label>

        {rightElement && <div className="absolute right-3.5">{rightElement}</div>}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="mt-1.5 flex items-center gap-1 text-xs text-red-500"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Brand Side Panel
───────────────────────────────────────────── */
const BrandPanel = () => (
  <div className="relative hidden lg:flex flex-col justify-between w-[45%] min-h-screen overflow-hidden bg-[#0a0f1e] px-12 py-14">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-600/15 blur-[100px]" />
    </div>

    {/* Logo */}
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex items-center"
    >
      <img
        src="/white-logo.png"
        alt="Bill Till Logo"
        className="h-10 w-auto"
      />
    </motion.div>

    <div className="relative z-10">
      <h2 className="text-4xl font-bold text-white leading-tight mb-4">
        Welcome back to
        <br />
        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Bill Till.
        </span>
      </h2>
      <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-8">
        Access your dashboard, manage your sales, and keep track of your business growth seamlessly.
      </p>

      {/* Feature list */}
      <div className="space-y-4">
        {[
          { icon: LayoutDashboard, label: "Centralized Management" },
          { icon: Zap, label: "Real-time Syncing" },
          { icon: ShieldCheck, label: "Enterprise Security" },
        ].map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-center gap-3 text-slate-300"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Icon className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-sm font-medium">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>

    <div className="relative z-10 text-slate-500 text-xs">
      &copy; {new Date().getFullYear()} Bill Till. All rights reserved.
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   LoginPage Component
───────────────────────────────────────────── */
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Please enter a valid email";
    if (!formData.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const { data } = await api.post("/auth/login", formData);
      login(data.user, data.token);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      setErrors({ submit: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <BrandPanel />

      <div className="flex-1 overflow-y-auto bg-slate-50 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[440px]">
          {/* Mobile brand bar */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-800 text-base">Bill Till</span>
            </div>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="inline-flex items-center gap-1.5 mb-6 text-sm text-slate-400 hover:text-slate-700 font-medium transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </button>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight">
              Sign in
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              New to Bill Till?{" "}
              <a
                href="/register"
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Create an account
              </a>
            </p>
          </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] border border-slate-100 p-6 sm:p-8 space-y-5">
              {/* Global error alert */}
              <AnimatePresence>
                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errors.submit}
                  </motion.div>
                )}
              </AnimatePresence>

              <FloatingInput
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                icon={Mail}
              />

              <div className="space-y-1">
                <FloatingInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  icon={Lock}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />
                <div className="flex justify-end">
                  <a href="#" className="text-xs font-medium text-blue-500 hover:text-blue-600">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

          <p className="mt-8 text-center text-xs text-slate-400">
            Secure login with 256-bit AES encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
