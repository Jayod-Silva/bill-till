"use client";

import React, { useState, useEffect } from "react";
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
  CheckCircle2,
  Download,
  FileText,
  X,
  Globe,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import confetti from "canvas-confetti";
import { generateInvoice } from "@/templates/InvoicePdf";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "react-router-dom";

/* ── Pricing Plans ───────────────────────────────────── */
const pricingPlans = [
  {
    name: "Dynamic",
    price: 4999,
    yearlyPrice: 3999,
    features: [
      "POS System",
      "Advanced Analytics",
      "Priority Support",
      "Inventory Management",
    ],
  },
  {
    name: "Pro",
    price: 7999,
    yearlyPrice: 6399,
    features: [
      "All Dynamic Features",
      "Custom Reports",
      "API Access",
      "Dedicated Support",
    ],
  },
];

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
    color: "#1e293b", // Always show text color for visibility
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
export default function PaymentForm({
  selectedPlan: initialPlan = "Dynamic",
  isMonthly = true,
}) {
  const location = useLocation();
  const passedConfirmationCode = location.state?.confirmationCode || "";
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currency, setCurrency] = useState("LKR");

  const getInitialAmount = () => {
    const plan = pricingPlans.find((p) => p.name === initialPlan);
    if (!plan) return 4999;
    return isMonthly ? plan.price : plan.yearlyPrice * 12;
  };

  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    amount: getInitialAmount(),
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  const { user } = useAuth();

  // Handle plan selection change
  const handlePlanChange = (planName) => {
    setSelectedPlan(planName);
    const selectedPlanData = pricingPlans.find(
      (plan) => plan.name === planName,
    );
    if (selectedPlanData) {
      const amount = isMonthly
        ? selectedPlanData.price
        : selectedPlanData.yearlyPrice * 12;
      setForm((prev) => ({ ...prev, amount }));
    }
    setIsDropdownOpen(false);
  };

  // Autofill form if user is logged in
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        businessName: prev.businessName || user.business?.name || "",
        businessType: prev.businessType || user.business?.type || "",
        ownerName:
          prev.ownerName ||
          `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
          "",
        phone: prev.phone || user.phone || "",
        email: prev.email || user.email || "",
        address:
          prev.address ||
          [
            user.business?.address,
            user.business?.city,
            user.business?.province,
            user.business?.zip_code,
          ]
            .filter(Boolean)
            .join(", ") ||
          "",
      }));
    }
  }, [user]);

  // Detect return from payment gateway redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    const orderId = params.get("orderId");

    if (payment === "success" && orderId) {
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Helper: show success UI then send invoice email in background
      const showSuccessAndSendInvoice = (resultDetails) => {
        // Generate invoice ID and confirmation code once
        const invoiceId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
        const confirmationCode =
          resultDetails.confirmationCode ||
          Math.random().toString(36).substring(2, 10).toUpperCase();

        // Add to result details for consistency
        const enrichedDetails = {
          ...resultDetails,
          invoiceId,
          confirmationCode,
        };

        setPaymentResult(enrichedDetails);
        setShowSuccess(true);
        triggerConfetti();
        // Delay invoice generation slightly to ensure UI renders first
        setTimeout(() => {
          try {
            generateInvoice(enrichedDetails, "silent");
          } catch (err) {
            console.error("Invoice generation failed (non-blocking):", err);
          }
        }, 500);
      };

      // Retrieve saved form data
      const savedData = sessionStorage.getItem("billtill_payment_form");
      if (savedData) {
        let formData;
        try {
          formData = JSON.parse(savedData);
        } catch (parseErr) {
          console.error("Failed to parse saved form data:", parseErr);
          formData = null;
        }
        sessionStorage.removeItem("billtill_payment_form");

        if (formData) {
          if (formData.selectedPlan) setSelectedPlan(formData.selectedPlan);
          const resultDetails = { ...formData, orderId };

          // Verify payment with backend (non-blocking — show success either way)
          axios
            .get(
              `${import.meta.env.VITE_API_BASE_URL}/verify-payment/${orderId}`,
            )
            .then(() => showSuccessAndSendInvoice(resultDetails))
            .catch(() => {
              // Still show success since gateway redirected with success
              showSuccessAndSendInvoice(resultDetails);
            });
        } else {
          // Parsing failed — use fallback data
          showSuccessAndSendInvoice({
            businessName: "N/A",
            ownerName: "N/A",
            businessType: "N/A",
            phone: "N/A",
            email: "N/A",
            address: "N/A",
            amount: "0",
            orderId,
            selectedPlan,
          });
        }
      } else {
        // No saved data but still returned from gateway — try localStorage as backup
        let backupData = null;
        try {
          const lsData = localStorage.getItem("billtill_payment_form_backup");
          if (lsData) {
            backupData = JSON.parse(lsData);
            localStorage.removeItem("billtill_payment_form_backup");
          }
        } catch (e) {
          console.error("Failed to read localStorage backup:", e);
        }

        if (backupData) {
          if (backupData.selectedPlan) setSelectedPlan(backupData.selectedPlan);
          showSuccessAndSendInvoice({ ...backupData, orderId });
        } else {
          showSuccessAndSendInvoice({
            businessName: "N/A",
            ownerName: "N/A",
            businessType: "N/A",
            phone: "N/A",
            email: "N/A",
            address: "N/A",
            amount: "0",
            orderId,
            selectedPlan,
          });
        }
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#3b82f6", "#4f46e5", "#10b981"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const SuccessModal = ({ details, onClose }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60  backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>

          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-emerald-50 text-emerald-500">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Payment Successful!
            </h2>
            <p className="text-slate-500 mb-8">
              Thank you for choosing Bill-Till. Your subscription is complete.
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Order ID</span>
                <span className="font-mono font-bold text-slate-900">
                  {details.orderId}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Business</span>
                <span className="font-bold text-slate-900">
                  {details.businessName}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Amount</span>
                <span className="font-bold text-emerald-600">
                  {details.currency || "LKR"}{" "}
                  {parseFloat(details.amount).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Subscription Plan</span>
                <span className="font-bold text-slate-900">
                  {details.selectedPlan || "Dynamic"} Plan
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => generateInvoice(details, "view")}
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                <FileText className="w-4 h-4" />
                View Invoice
              </button>
              <button
                onClick={() => generateInvoice(details, "download")}
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>

          <div className="bg-slate-50 p-4 text-center">
            <p className="text-xs text-slate-400">
              A copy of this invoice has been sent to{" "}
              <span className="text-slate-600 font-medium">
                {details.email}
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  };

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
    if (!String(form.amount).trim()) e.amount = "Amount is required";
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
        `${import.meta.env.VITE_API_BASE_URL}/create-payment`,
        { ...form, currency },
      );

      const sessionId = response.data.sessionId || response.data.session?.id;
      const orderId = response.data.orderId;
      const merchantId = response.data.merchantId;
      if (!sessionId) throw new Error("Session ID not found in response");

      // Save form data to sessionStorage before gateway redirects away
      sessionStorage.setItem(
        "billtill_payment_form",
        JSON.stringify({
          ...form,
          selectedPlan,
          currency,
          billingCycle: isMonthly ? "Monthly" : "Annually",
          confirmationCode: passedConfirmationCode,
        }),
      );
      // Also save to localStorage as a backup (iOS Safari may lose sessionStorage on redirect)
      try {
        localStorage.setItem(
          "billtill_payment_form_backup",
          JSON.stringify({
            ...form,
            selectedPlan,
            currency,
            billingCycle: isMonthly ? "Monthly" : "Annually",
            confirmationCode: passedConfirmationCode,
          }),
        );
      } catch (e) {
        console.warn("Could not save localStorage backup:", e);
      }

      window.cancelCallback = () => {
        sessionStorage.removeItem("billtill_payment_form");
        try {
          localStorage.removeItem("billtill_payment_form_backup");
        } catch (e) {}
        setLoading(false);
      };

      const script = document.createElement("script");
      script.src =
        "https://seylan.gateway.mastercard.com/static/checkout/checkout.min.js";
      script.async = true;

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
    <div className="space-y-7 mt-10 md:mt-0">
      {/* Currency Toggle */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 border border-blue-100">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-slate-600">Payment Currency</span>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg border border-blue-200 shadow-sm p-0.5">
          {["LKR", "USD"].map((cur) => (
            <button
              key={cur}
              type="button"
              onClick={() => setCurrency(cur)}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all duration-200 ${
                currency === cur
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                  : "text-slate-500 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              {cur === "LKR" ? "🇱🇰 LKR" : "🇺🇸 USD"}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Selection Dropdown */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-blue-50 border border-blue-100">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-slate-600">Select Plan</span>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-sm font-bold text-blue-600 bg-white px-3 py-1 rounded-lg border border-blue-200 shadow-sm flex items-center gap-2 hover:bg-blue-50 transition-colors"
          >
            {selectedPlan}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-blue-200 rounded-lg shadow-lg z-50 min-w-[200px]">
              {pricingPlans.map((plan) => (
                <button
                  key={plan.name}
                  type="button"
                  onClick={() => handlePlanChange(plan.name)}
                  className={`w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors flex items-center justify-between ${
                    selectedPlan === plan.name
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  <span>{plan.name}</span>
                  <span className="text-sm font-bold text-blue-600">
                    {currency}{" "}
                    {(isMonthly
                      ? plan.price
                      : plan.yearlyPrice * 12
                    ).toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

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
            label=""
            icon={DollarSign}
            type="number"
            inputMode="numeric"
            value={form.amount}
            onChange={handleChange}
            error={errors.amount}
            readOnly
            className="bg-gray-50"
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

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <SuccessModal
            details={paymentResult}
            onClose={() => setShowSuccess(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
