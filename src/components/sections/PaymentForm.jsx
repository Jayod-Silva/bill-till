"use client";

import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  DollarSign,
  Lock,
  Shield,
  CreditCard,
  AlertCircle,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

/* ── Business types ───────────────────────────────────── */
const businessTypes = [
  "Restaurants & Cafés",
  "Pastry Shops & Bakeries",
  "Shopping Malls",
  "Supermarkets",
  "Hardware Stores",
  "Vehicle Parts Shops",
  "Any Retail Business",
];

/* ── Inline-style helpers (bypass global * { border-color }) ── */
const baseFieldStyle = {
  width: "100%",
  height: "3.25rem",
  borderRadius: "0.75rem",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "#cbd5e1", // slate-300
  backgroundColor: "#ffffff",
  outline: "none",
  fontSize: "0.875rem",
  color: "#1e293b",
  WebkitTextFillColor: "#1e293b",
  caretColor: "#3b82f6",
  transition: "border-color 0.18s, box-shadow 0.18s",
  paddingLeft: "2.75rem", // room for icon
  paddingRight: "1rem",
  boxSizing: "border-box",
};

const focusedStyle = {
  borderColor: "#3b82f6",
  boxShadow: "0 0 0 3px rgba(59,130,246,0.16)",
};

const errorStyle = {
  borderColor: "#f87171",
  boxShadow: "0 0 0 3px rgba(239,68,68,0.12)",
};

const filledStyle = {
  borderColor: "#3b82f6",
  backgroundColor: "#f0f7ff",
};

/* ── FloatingField ────────────────────────────────────── */
const FloatingField = ({
  id,
  name,
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  error,
  inputMode,
}) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || (value && value.length > 0);

  const computedStyle = {
    ...baseFieldStyle,
    ...(focused ? focusedStyle : {}),
    ...(error && !focused ? errorStyle : {}),
    ...(value && !focused ? filledStyle : {}),
  };

  return (
    <div className="relative">
      {/* Icon */}
      <div
        className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
        style={{ color: focused ? "#3b82f6" : "#94a3b8" }}
      >
        <Icon className="w-4 h-4" />
      </div>

      {/* Input */}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        inputMode={inputMode}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={lifted ? "" : ""}
        style={computedStyle}
        autoComplete="off"
      />

      {/* Floating label */}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-10 transition-all duration-200 origin-left select-none"
        style={{
          top: lifted ? "0.375rem" : "50%",
          transform: lifted ? "translateY(0) scale(0.75)" : "translateY(-50%)",
          fontSize: lifted ? "0.75rem" : "0.875rem",
          fontWeight: lifted ? "600" : "400",
          color: focused ? "#3b82f6" : lifted ? "#94a3b8" : "#94a3b8",
        }}
      >
        {label}
      </label>

      {/* Error */}
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

/* ── FloatingSelect ───────────────────────────────────── */
const FloatingSelect = ({
  id,
  name,
  label,
  icon: Icon,
  value,
  onChange,
  error,
  children,
}) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || (value && value.length > 0);

  const computedStyle = {
    ...baseFieldStyle,
    appearance: "none",
    paddingRight: "2.5rem",
    ...(focused ? focusedStyle : {}),
    ...(error && !focused ? errorStyle : {}),
    ...(value && !focused ? filledStyle : {}),
    color: value ? "#1e293b" : "transparent",
  };

  return (
    <div className="relative">
      <div
        className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
        style={{ color: focused ? "#3b82f6" : "#94a3b8" }}
      >
        <Icon className="w-4 h-4" />
      </div>

      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={computedStyle}
      >
        <option value="" disabled />
        {children}
      </select>

      {/* Chevron */}
      <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
        <ChevronDown className="w-4 h-4" />
      </div>

      {/* Floating label */}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-10 transition-all duration-200 origin-left select-none"
        style={{
          top: lifted ? "0.375rem" : "50%",
          transform: lifted ? "translateY(0) scale(0.75)" : "translateY(-50%)",
          fontSize: lifted ? "0.75rem" : "0.875rem",
          fontWeight: lifted ? "600" : "400",
          color: focused ? "#3b82f6" : lifted ? "#94a3b8" : "#94a3b8",
        }}
      >
        {label}
      </label>

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

/* ── FloatingTextarea ─────────────────────────────────── */
const FloatingTextarea = ({
  id,
  name,
  label,
  icon: Icon,
  value,
  onChange,
  error,
}) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || (value && value.length > 0);

  const areaStyle = {
    ...baseFieldStyle,
    height: "auto",
    minHeight: "5.5rem",
    paddingTop: "1.75rem",
    paddingBottom: "0.75rem",
    resize: "none",
    ...(focused ? focusedStyle : {}),
    ...(error && !focused ? errorStyle : {}),
    ...(value && !focused ? filledStyle : {}),
  };

  return (
    <div className="relative">
      <div
        className="absolute left-3.5 top-[1.1rem] pointer-events-none transition-colors duration-200"
        style={{ color: focused ? "#3b82f6" : "#94a3b8" }}
      >
        <Icon className="w-4 h-4" />
      </div>

      <textarea
        id={id}
        name={name}
        rows={3}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={areaStyle}
      />

      <label
        htmlFor={id}
        className="pointer-events-none absolute left-10 transition-all duration-200 origin-left select-none"
        style={{
          top: lifted ? "0.45rem" : "1rem",
          transform: lifted ? "scale(0.75)" : "scale(1)",
          fontSize: lifted ? "0.75rem" : "0.875rem",
          fontWeight: lifted ? "600" : "400",
          color: focused ? "#3b82f6" : lifted ? "#94a3b8" : "#94a3b8",
        }}
      >
        {label}
      </label>

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

/* ── SectionLabel ─────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
    {children}
  </p>
);

/* ── Main Form ────────────────────────────────────────── */
export default function PaymentForm({ selectedPlan }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.businessName.trim()) e.businessName = "Business name is required";
    if (!form.businessType) e.businessType = "Please select a business type";
    if (!form.ownerName.trim()) e.ownerName = "Owner name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-()+]{7,}$/.test(form.phone))
      e.phone = "Enter a valid phone number";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.amount.trim()) e.amount = "Amount is required";
    else if (isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = "Enter a valid amount";
    if (!form.address.trim()) e.address = "Business address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePayment = async () => {
    if (loading) return;
    if (!validate()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "https://caritasconnect.ddns.net/billtill/api/create-payment",
        form,
      );

      const sessionId = response.data.sessionId || response.data.session?.id;
      if (!sessionId) throw new Error("Session ID not found in response");

      window.cancelCallback = () => setLoading(false);
      window.errorCallback = () => setLoading(false);
      window.completeCallback = () => setLoading(false);

      const script = document.createElement("script");
      script.src =
        "https://test-seylan.mtf.gateway.mastercard.com/static/checkout/checkout.min.js";
      script.async = true;
      script.setAttribute("data-error", "errorCallback");
      script.setAttribute("data-cancel", "cancelCallback");
      script.setAttribute("data-complete", "completeCallback");

      script.onload = () => {
        // @ts-ignore
        Checkout.configure({ session: { id: sessionId } });
        // @ts-ignore
        Checkout.showPaymentPage();
      };

      document.body.appendChild(script);
    } catch (err) {
      console.error(err);
      setErrors({
        submit: "Payment failed. Please check your details and try again.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="space-y-7">
      {/* Selected plan badge */}
      {selectedPlan && (
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-blue-50 border border-blue-100">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-slate-600">Selected Plan</span>
          </div>
          <span className="text-sm font-bold text-blue-600 bg-white px-3 py-1 rounded-lg border border-blue-200 shadow-sm">
            {selectedPlan}
          </span>
        </div>
      )}

      {/* ── Business Info ── */}
      <div className="space-y-4">
        <SectionLabel>Business Information</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FloatingField
            id="businessName"
            name="businessName"
            label="Business Name *"
            icon={Building2}
            value={form.businessName}
            onChange={handleChange}
            error={errors.businessName}
          />
          <FloatingField
            id="ownerName"
            name="ownerName"
            label="Owner Name *"
            icon={User}
            value={form.ownerName}
            onChange={handleChange}
            error={errors.ownerName}
          />
        </div>

        <FloatingSelect
          id="businessType"
          name="businessType"
          label="Business Type *"
          icon={Briefcase}
          value={form.businessType}
          onChange={handleChange}
          error={errors.businessType}
        >
          {businessTypes.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </FloatingSelect>

        <FloatingTextarea
          id="address"
          name="address"
          label="Business Address *"
          icon={MapPin}
          value={form.address}
          onChange={handleChange}
          error={errors.address}
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-100" />
        <span className="text-[11px] text-slate-400 font-medium">
          Contact &amp; Payment
        </span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      {/* ── Contact & Payment ── */}
      <div className="space-y-4">
        <SectionLabel>Contact &amp; Payment Details</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FloatingField
            id="phone"
            name="phone"
            label="Phone Number *"
            icon={Phone}
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <FloatingField
            id="amount"
            name="amount"
            label="Amount (LKR) *"
            icon={DollarSign}
            type="number"
            inputMode="numeric"
            value={form.amount}
            onChange={handleChange}
            error={errors.amount}
          />
        </div>

        <FloatingField
          id="email"
          name="email"
          label="Email Address *"
          icon={Mail}
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
      </div>

      {/* Submit error */}
      <AnimatePresence>
        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            {errors.submit}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA ── */}
      <button
        type="button"
        disabled={loading}
        onClick={handlePayment}
        className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white text-sm font-bold tracking-wide transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 disabled:opacity-55 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-blue-500/30"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)",
        }}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Processing Payment…
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Proceed to Secure Payment
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Security strip */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
        {[
          { icon: Lock, label: "256-bit SSL" },
          { icon: Shield, label: "PCI DSS Compliant" },
          { icon: CreditCard, label: "Seylan Bank Gateway" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 text-xs text-slate-400"
          >
            <Icon className="w-3.5 h-3.5 text-emerald-500" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
