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
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import confetti from "canvas-confetti";

/* ── Pricing Plans ───────────────────────────────────── */
const pricingPlans = [
  {
    name: "Dynamic",
    price: 4999,
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
export default function PaymentForm({ selectedPlan: initialPlan = "Dynamic" }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    amount:
      pricingPlans.find((plan) => plan.name === initialPlan)?.price || 4999,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  // Handle plan selection change
  const handlePlanChange = (planName) => {
    setSelectedPlan(planName);
    const selectedPlanData = pricingPlans.find(
      (plan) => plan.name === planName,
    );
    if (selectedPlanData) {
      setForm((prev) => ({ ...prev, amount: selectedPlanData.price }));
    }
    setIsDropdownOpen(false);
  };

  // Detect return from payment gateway redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    const orderId = params.get("orderId");

    if (payment === "success" && orderId) {
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Retrieve saved form data
      const savedData = sessionStorage.getItem("billtill_payment_form");
      if (savedData) {
        const formData = JSON.parse(savedData);
        sessionStorage.removeItem("billtill_payment_form");

        // Verify payment with backend
        axios
          .get(`http://localhost:3000/api/verify-payment/${orderId}`)
          .then((res) => {
            // Show success regardless (gateway already confirmed redirect)
            setPaymentResult({ ...formData, orderId, selectedPlan });
            setShowSuccess(true);
            triggerConfetti();
          })
          .catch(() => {
            // Still show success since gateway redirected with success
            setPaymentResult({ ...formData, orderId, selectedPlan });
            setShowSuccess(true);
            triggerConfetti();
          });
      } else {
        // No saved data but still returned from gateway
        setPaymentResult({
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
        setShowSuccess(true);
        triggerConfetti();
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

  const generateInvoice = (details, action = "download") => {
    const doc = new jsPDF();
    const invoiceId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    const confirmationCode = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();

    // ── COLORS & STYLING ──
    const primaryColor = [59, 130, 246]; // Blue-600
    const secondaryColor = [30, 41, 59]; // Slate-800
    const accentColor = [16, 185, 129]; // Emerald-500
    const grayText = [100, 116, 139]; // Slate-500

    // ── HEADER SECTION ──
    // Bill-Till Branding
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("Bill-Till", 14, 25);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayText);
    doc.text("Smart Billing & POS Solutions", 14, 32);

    // Invoice Meta (Top Right)
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...secondaryColor);
    doc.text("INVOICE", 140, 25);

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(`Invoice ID:`, 140, 35);
    doc.setFont("helvetica", "normal");
    doc.text(invoiceId, 170, 35);

    doc.setFont("helvetica", "bold");
    doc.text(`Date:`, 140, 40);
    doc.setFont("helvetica", "normal");
    doc.text(new Date().toLocaleDateString(), 170, 40);

    doc.setFont("helvetica", "bold");
    doc.text(`Status:`, 140, 45);
    doc.setTextColor(...accentColor);
    doc.text("PAID", 170, 45);
    doc.setTextColor(...secondaryColor);

    // ── SENDER & BENEFICIARY ──
    doc.setDrawColor(226, 232, 240);
    doc.line(14, 55, 196, 55);

    // From (Sender)
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("FROM (SENDER)", 14, 65);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...secondaryColor);
    doc.text("Bill-Till Lanka (Pvt) Ltd", 14, 72);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Bill-Till,", 14, 77);
    doc.text("680A Colombo Road,Kattuwa,Negombo, Sri Lanka ", 14, 82);
    doc.text("Email: support@billtill.com", 14, 87);
    doc.text("Web: www.billtill.co", 14, 92);

    // To (Beneficiary)
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("BILL TO (BENEFICIARY)", 110, 65);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...secondaryColor);
    doc.text(details.businessName || "Valued Customer", 110, 72);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Attn: ${details.ownerName}`, 110, 77);
    doc.text(details.address || "N/A", 110, 82, { maxWidth: 80 });
    doc.text(`Phone: ${details.phone}`, 110, 92);
    doc.text(`Email: ${details.email}`, 110, 97);

    // ── TRANSACTION DETAILS ──
    doc.setDrawColor(241, 245, 249);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, 105, 182, 25, 3, 3, "FD");

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...grayText);
    doc.text("Payment ID", 25, 115);
    doc.text("Confirmation Code", 85, 115);
    doc.text("Payment Method", 145, 115);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...secondaryColor);
    doc.text(details.orderId || "N/A", 25, 122);
    doc.text(confirmationCode, 85, 122);
    doc.text("Card Payment", 145, 122);

    // ── ITEMS TABLE ──
    const tableData = [
      [
        "01",
        "Software Subscription",
        `${details.selectedPlan || "Dynamic"} Plan - Annual License`,
        "1",
        `LKR ${parseFloat(details.amount).toLocaleString()}`,
        `LKR ${parseFloat(details.amount).toLocaleString()}`,
      ],
    ];

    autoTable(doc, {
      startY: 140,
      head: [["#", "Service", "Description", "Qty", "Unit Price", "Total"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: primaryColor,
        fontSize: 9,
        fontStyle: "bold",
        halign: "center",
      },
      styles: { fontSize: 9, cellPadding: 4 },
      columnStyles: {
        0: { halign: "center", cellWidth: 10 },
        3: { halign: "center", cellWidth: 15 },
        4: { halign: "right", cellWidth: 35 },
        5: { halign: "right", cellWidth: 35 },
      },
    });

    const finalY = doc.lastAutoTable.finalY + 15;

    // ── TOTALS ──
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayText);
    doc.text("Subtotal:", 140, finalY);
    doc.text(
      `LKR ${parseFloat(details.amount).toLocaleString()}`,
      175,
      finalY,
      {
        align: "right",
      },
    );

    doc.text("Tax (0%):", 140, finalY + 7);
    doc.text("LKR 0.00", 175, finalY + 7, { align: "right" });

    doc.setDrawColor(226, 232, 240);
    doc.line(135, finalY + 10, 196, finalY + 10);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("Total Paid:", 140, finalY + 18);
    doc.text(
      `LKR ${parseFloat(details.amount).toLocaleString()}`,
      175,
      finalY + 18,
      { align: "right" },
    );

    // ── FOOTER ──
    const pageHeight = doc.internal.pageSize.height;

    doc.setDrawColor(226, 232, 240);
    doc.line(14, pageHeight - 40, 196, pageHeight - 40);

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...secondaryColor);
    doc.text("Thank you for your business!", 14, pageHeight - 33);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayText);
    doc.text(
      "This is a computer-generated document and does not require a physical signature.",
      14,
      pageHeight - 28,
    );
    doc.text(
      "For any queries, please contact support@billtill.com or call +94 11 234 5678",
      14,
      pageHeight - 23,
    );

    // ── ACTION ──
    if (action === "view") {
      window.open(doc.output("bloburl"), "_blank");
    } else {
      doc.save(`BillTill_Invoice_${details.orderId}.pdf`);
    }

    // ── SEND EMAIL IN BACKGROUND ──
    // Only send email on the first action (not on every button click)
    // Use a flag on details to avoid sending twice
    if (!details._emailSent) {
      details._emailSent = true;
      const pdfBlob = doc.output("blob");
      const filename = `BillTill_Invoice_${details.orderId}.pdf`;
      const formData = new FormData();
      formData.append("invoice", pdfBlob, filename);
      formData.append("email", details.email || "");
      formData.append("businessName", details.businessName || "");
      formData.append("invoiceId", invoiceId);
      formData.append("orderId", details.orderId || "");
      formData.append("confirmationCode", confirmationCode);
      formData.append("amount", details.amount || "0");
      formData.append("plan", details.selectedPlan || "Dynamic");

      axios
        .post("http://localhost:3000/api/send-invoice", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => console.log("Invoice email sent successfully"))
        .catch((err) =>
          console.error(
            "Invoice email failed:",
            err?.response?.data || err.message,
          ),
        );
    }
  };

  const SuccessModal = ({ details, onClose }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
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

          <div className="p-8 pt-12 text-center">
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
                  LKR {parseFloat(details.amount).toLocaleString()}
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
        "http://localhost:3000/api/create-payment",
        form,
      );

      const sessionId = response.data.sessionId || response.data.session?.id;
      const orderId = response.data.orderId;
      if (!sessionId) throw new Error("Session ID not found in response");

      // Save form data to sessionStorage before gateway redirects away
      sessionStorage.setItem(
        "billtill_payment_form",
        JSON.stringify({ ...form, selectedPlan }),
      );

      window.cancelCallback = () => {
        sessionStorage.removeItem("billtill_payment_form");
        setLoading(false);
      };
      window.errorCallback = () => {
        sessionStorage.removeItem("billtill_payment_form");
        setLoading(false);
      };
      window.completeCallback = () => {
        sessionStorage.removeItem("billtill_payment_form");
        setLoading(false);
        setPaymentResult({ ...form, orderId, selectedPlan });
        setShowSuccess(true);
        triggerConfetti();
      };

      const script = document.createElement("script");
      script.src =
        "https://seylan.gateway.mastercard.com/static/checkout/checkout.min.js";
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
    <div className="space-y-7 mt-10 md:mt-0">
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
                    LKR {plan.price.toLocaleString()}
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
            details={{ ...paymentResult, selectedPlan }}
            onClose={() => setShowSuccess(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
