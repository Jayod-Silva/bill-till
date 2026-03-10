"use client";

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { useAuth } from "@/context/AuthContext";
import { usePaymentStore } from "@/stores/usePaymentStore";

/* ── Pricing Plans ───────────────────────────────────── */
const pricingPlans = [
  {
    name: "Dynamic",
    monthlyPrice: 4999,
    annualPrice: 3999 * 12, // 47988
    features: [
      "POS System",
      "Advanced Analytics",
      "Priority Support",
      "Inventory Management",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 7999,
    annualPrice: 6399 * 12, // 76788
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
  "Retail Businesses",
  "Service Businesses",
  "Manufacturing",
  "Technology",
  "Healthcare",
  "Education",
  "Other",
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
  disable,
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
        value={value.toFixed ? value.toFixed(2) : value}
        inputMode={inputMode}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={lifted ? "" : ""}
        style={computedStyle}
        autoComplete="off"
        disabled={disable}
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
export default function PaymentForm({ selectedPlan: initialPlan = "Dynamic" }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currency, setCurrency] = useState("LKR");
  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    amount:
      pricingPlans.find((plan) => plan.name === initialPlan)?.monthlyPrice ||
      4999,
  });

  // Handle incoming selection from PricingSection
  useEffect(() => {
    if (location.state?.planName) {
      const { planName, isAnnual } = location.state;
      setSelectedPlan(planName);
      const cycle = isAnnual ? "Annual" : "Monthly";
      setBillingCycle(cycle);

      const planData = pricingPlans.find((p) => p.name === planName);
      if (planData) {
        setForm((prev) => ({
          ...prev,
          amount: isAnnual ? planData.annualPrice : planData.monthlyPrice,
        }));
      }
    }
  }, [location.state]);

  // Sync amount when plan or cycle changes
  useEffect(() => {
    const planData = pricingPlans.find((p) => p.name === selectedPlan);
    if (planData) {
      setForm((prev) => ({
        ...prev,
        amount:
          billingCycle === "Annual"
            ? planData.annualPrice
            : planData.monthlyPrice,
      }));
    }
  }, [selectedPlan, billingCycle]);

  const { showSuccess, setShowSuccess, paymentResult, setPaymentResult, paymentFailed, setPaymentFailed, failureMessage, setFailureMessage } = usePaymentStore();
  const { user } = useAuth();

  // Handle plan selection change
  const handlePlanChange = (planName) => {
    setSelectedPlan(planName);
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
        // Generate invoice ID once, but use existing confirmationCode if available
        const invoiceId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
        const confirmationCode =
          resultDetails.confirmationCode ||
          Math.random().toString(36).substring(2, 10).toUpperCase();

        // Add to result details for consistency
        const enrichedDetails = {
          ...resultDetails,
          invoiceId,
          confirmationCode,
          billingCycle: resultDetails.billingCycle || billingCycle,
        };

        setPaymentResult(enrichedDetails);
        setShowSuccess(true);
        triggerConfetti();
        // Delay invoice generation slightly to ensure UI renders first
        try {
          generateInvoice(enrichedDetails, "silent");
        } catch (err) {
          console.error("Invoice generation failed (non-blocking):", err);
        }
      };

      // Retrieve saved form data
      const savedData = sessionStorage.getItem("billtill_payment_form");
      let localFormData = null;
      try {
        if (savedData) {
          localFormData = JSON.parse(savedData);
          sessionStorage.removeItem("billtill_payment_form");
        } else {
          const lsData = localStorage.getItem("billtill_payment_form_backup");
          if (lsData) {
            localFormData = JSON.parse(lsData);
            localStorage.removeItem("billtill_payment_form_backup");
          }
        }
      } catch (e) {
        console.error("Failed to parse local storage data:", e);
      }

      // Verify payment with backend
      axios
        .get(
          `https://caritasconnect.ddns.net/billtill/api/verify-payment/${orderId}`,
        )
        .then((response) => {
          // Use backend's storedDetails as primary source, fallback to local data
          const apiDetails = response.data.storedDetails || {};
          const resultDetails = {
            ...localFormData,
            ...apiDetails,
            orderId,
            currency: apiDetails.currency || localFormData?.currency || "LKR",
            selectedPlan:
              apiDetails.selectedPlan ||
              localFormData?.selectedPlan ||
              selectedPlan,
          };

          if (resultDetails.selectedPlan)
            setSelectedPlan(resultDetails.selectedPlan);
          showSuccessAndSendInvoice(resultDetails);
        })
        .catch(() => {
          // Fallback if verification API fails but we have some local data
          const resultDetails = {
            businessName: "N/A",
            ownerName: "N/A",
            businessType: "N/A",
            phone: "N/A",
            email: "N/A",
            address: "N/A",
            amount: "0",
            ...localFormData,
            orderId,
            selectedPlan,
            currency: localFormData?.currency || "LKR",
          };
          showSuccessAndSendInvoice(resultDetails);
        });
    } else if (payment === "failure") {
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      setPaymentFailed(true);
      setFailureMessage("Your payment was cancelled or failed. Please try again.");
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
    // Use existing invoice ID from details or generate a new one
    const invoiceId =
      details.invoiceId || `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    const confirmationCode = details.confirmationCode || "N/A";

    // ── COLORS & STYLING ──
    const primaryColor = [7, 60, 148]; // #073C94
    const secondaryColor = [30, 41, 59]; // Slate-800
    const accentColor = [16, 185, 129]; // Emerald-500
    const grayText = [100, 116, 139]; // Slate-500

    // ── HEADER SECTION ──
    // Bill-Till Logo
    try {
      doc.addImage("/colored-logo.png", "PNG", 14, 15, 40, 20);
    } catch (error) {
      // Fallback to text if image fails to load
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text("Bill-Till", 14, 25);
    }

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

    // From (Sender) - User
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("FROM (SENDER)", 14, 65);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...secondaryColor);
    doc.text(details.businessName || "Valued Customer", 14, 72);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Name: ${details.ownerName}`, 14, 77);
    doc.text(`Address: ${details.address || "N/A"}`, 14, 82, { maxWidth: 80 });
    doc.text(`Phone: ${details.phone}`, 14, 87);
    doc.text(`Email: ${details.email}`, 14, 92);

    // To (Beneficiary) - Bill-Till
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("BILL TO (BENEFICIARY)", 110, 65);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...secondaryColor);
    doc.text("Bill-Till", 110, 72);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Bill-Till,", 110, 77);
    doc.text("680A Colombo Road,Kattuwa,Negombo, Sri Lanka ", 110, 82, {
      maxWidth: 80,
    });
    doc.text("Email: support@billtill.co", 110, 87);
    doc.text("Web: www.billtill.co", 110, 92);
    doc.text("Phone: 0114 758900", 110, 97);

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
    const cur = details.currency || "LKR";
    const amountVal = parseFloat(details.amount) || 0;
    const tableData = [
      [
        "01",
        "Software Subscription",
        `${details.selectedPlan || "Dynamic"} Plan`,
        "1",
        `${cur} ${amountVal.toLocaleString()}`,
        `${cur} ${amountVal.toLocaleString()}`,
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
        0: { halign: "center", cellWidth: 13 },
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
      `${cur} ${parseFloat(details.amount).toLocaleString()}`,
      175,
      finalY,
      {
        align: "right",
      },
    );

    doc.text("Tax (0%):", 140, finalY + 7);
    doc.text(`${cur} 0.00`, 175, finalY + 7, { align: "right" });

    doc.setDrawColor(226, 232, 240);
    doc.line(135, finalY + 10, 196, finalY + 10);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("Total Paid:", 140, finalY + 18);
    doc.text(
      `${cur} ${parseFloat(details.amount).toLocaleString()}`,
      185,
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
      "For any queries, please contact support@billtill.co or call +94 0114 758900",
      14,
      pageHeight - 23,
    );

    // ── ACTION ──
    if (action === "view") {
      window.open(doc.output("bloburl"), "_blank");
    } else if (action === "download") {
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
      formData.append(
        "billingCycle",
        details.billingCycle ||
        ((details.selectedPlan || "").toLowerCase().includes("annually")
          ? "Annual"
          : "Monthly"),
      );
      formData.append("currency", details.currency || "LKR");

      axios
        .post(
          "https://caritasconnect.ddns.net/billtill/api/send-invoice",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        )
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
    const handleClose = () => {
      onClose();
      setTimeout(() => {
        window.location.href = '/';
      }, 300);
    };

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
            onClick={handleClose}
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
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Billing Cycle</span>
                <span className="font-bold text-slate-900">
                  {details.billingCycle || "Monthly"}
                </span>
              </div>
              <div className="flex justify-between text-sm py-2 px-3 bg-blue-50/50 rounded-lg border border-blue-100/50 mt-1">
                <span className="text-slate-500 font-medium">
                  Activation Code
                </span>
                <span className="font-mono font-bold text-blue-600">
                  {details.confirmationCode}
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

  const FailureModal = ({ message, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
        setTimeout(() => {
          window.location.href = '/';
        }, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
      onClose();
      setTimeout(() => {
        window.location.href = '/';
      }, 300);
    };

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
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>

          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-red-50 text-red-500">
              <AlertCircle className="w-10 h-10" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Payment Failed
            </h2>
            <p className="text-slate-600 mb-8 font-medium">
              {message || "Your payment could not be processed. Please try again."}
            </p>

            <button
              onClick={handleClose}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-500/20"
            >
              Try Again
            </button>

            <p className="text-xs text-slate-400 mt-6">
              Redirecting to home in 5 seconds...
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
    else if (isNaN(Number(form.amount)) || Number(form.amount) < 1)
      e.amount = currency === "LKR" ? "Minimum amount is 1 LKR" : "Minimum amount is $1 USD";
    if (!form.address.trim()) e.address = "Business address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePayment = async () => {
    if (loading) return;
    if (!validate()) return;

    try {
      setLoading(true);

      const verifiedCode = localStorage.getItem("billtill_verified_code") || "";

      // Clean form data - only include defined values
      const cleanFormData = {
        ...form,
        currency,
        confirmationCode: verifiedCode,
        billingCycle,
        selectedPlan,
      };

      // Add optional user properties only if user is logged in
      if (user?.business?.province) cleanFormData.state = user.business.province;
      if (user?.business?.city) cleanFormData.city = user.business.city;

      const response = await axios.post(
        "https://caritasconnect.ddns.net/billtill/api/create-payment",
        cleanFormData,
      );

      const sessionId = response.data.sessionId || response.data.session?.id;
      const orderId = response.data.orderId;
      const merchantId = response.data.merchantId;
      if (!sessionId) throw new Error("Session ID not found in response");

      // Save form data to sessionStorage before gateway redirects away
      sessionStorage.setItem(
        "billtill_payment_form",
        JSON.stringify({ ...form, selectedPlan, currency }),
      );
      // Also save to localStorage as a backup (iOS Safari may lose sessionStorage on redirect)
      try {
        localStorage.setItem(
          "billtill_payment_form_backup",
          JSON.stringify({ ...form, selectedPlan, currency }),
        );
      } catch (e) {
        console.warn("Could not save localStorage backup:", e);
      }

      window.cancelCallback = () => {
        sessionStorage.removeItem("billtill_payment_form");
        try {
          localStorage.removeItem("billtill_payment_form_backup");
        } catch (e) { }
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
      console.error("❌ Payment Error:", err);

      // Generate helpful error message based on error type
      let errorMessage = "Payment failed. Please check your details and try again.";

      if (err.response?.status === 400) {
        errorMessage = "Invalid payment details. Please check all fields are filled correctly.";
      } else if (err.response?.status === 500) {
        errorMessage = "Gateway error. Please try again or contact support.";
      } else if (err.message?.includes("Network")) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (err.response?.data?.error?.message) {
        errorMessage = `Payment Error: ${err.response.data.error.message}`;
      }

      setErrors({
        submit: errorMessage,
      });
      setLoading(false);
    }
  };

  return (
    <div className="space-y-7 mt-2 md:mt-0">
      {/* Login Status Banner */}
      {/* <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex items-center justify-between px-4 py-3.5 rounded-xl border-2 ${user
            ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200"
            : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
          }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${user ? "bg-emerald-200 text-emerald-700" : "bg-blue-200 text-blue-700"
              }`}
          >
            {user ? <CheckCircle2 className="w-4 h-4" /> : <User className="w-4 h-4" />}
          </div>
          <div>
            {user ? (
              <p className="text-sm font-bold text-slate-900">
                ✓ Logged in as <span className="text-emerald-600">{user.first_name} {user.last_name}</span>
              </p>
            ) : (
              <p className="text-sm font-bold text-slate-900">
                Proceeding as <span className="text-blue-600">Guest</span>
              </p>
            )}
            <p className="text-xs text-slate-500 mt-0.5">
              {user ? "Your business details will be auto-filled" : "Please fill in all required details"}
            </p>
          </div>
        </div>
        {!user && (
          <a
            href="/login"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors whitespace-nowrap ml-4"
          >
            Login to Auto-fill →
          </a>
        )}
      </motion.div> */}

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
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all duration-200 ${currency === cur
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
            >
              {cur === "LKR" ? "🇱🇰 LKR" : "🇺🇸 USD"}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Selection & Billing Cycle */}
      <div className="flex flex-row items-center justify-between gap-2 px-3 sm:px-4 py-3 rounded-xl bg-blue-50/50 border border-blue-200 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20 hidden xs:flex">
            <CreditCard className="w-4 h-4" />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-sm font-bold text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-all min-w-[120px]"
            >
              {selectedPlan}
              <ChevronDown
                className={`w-4 h-4 transition-transform text-slate-400 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 min-w-[200px] overflow-hidden">
                {pricingPlans.map((plan) => (
                  <button
                    key={plan.name}
                    type="button"
                    onClick={() => handlePlanChange(plan.name)}
                    className={`w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors flex items-center justify-between ${selectedPlan === plan.name
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-600"
                      }`}
                  >
                    <span className="text-sm">{plan.name}</span>
                    <span className="text-xs font-bold text-blue-600 bg-blue-100/50 px-2 py-0.5 rounded-full">
                      {currency}{" "}
                      {(billingCycle === "Annual"
                        ? plan.annualPrice
                        : plan.monthlyPrice
                      ).toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 bg-white rounded-lg border border-slate-200 shadow-sm p-0.5 shrink-0">
          {["Monthly", "Annual"].map((cycle) => (
            <button
              key={cycle}
              type="button"
              onClick={() => setBillingCycle(cycle)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${billingCycle === cycle
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
            >
              {cycle === "Monthly" ? "Month" : "Annual"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Business Info ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <SectionLabel>Business Information</SectionLabel>
          {user && (
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
              ✓ Auto-filled
            </span>
          )}
        </div>
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
        <div className="flex items-center justify-between">
          <SectionLabel>Contact &amp; Payment Details</SectionLabel>
          {user && (
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
              ✓ Auto-filled
            </span>
          )}
        </div>
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
            icon={
              currency === "LKR"
                ? (props) => (
                  <span
                    {...props}
                    className={
                      props.className +
                      " font-bold text-[13px] flex items-center justify-center -ml-0.1"
                    }
                  >
                    LKR
                  </span>
                )
                : DollarSign
            }
            type="number"
            inputMode="numeric"
            value={form.amount}
            onChange={handleChange}
            error={errors.amount}
            disable={false}
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

      {/* Guest User Info Banner */}
      {/* {!user && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-blue-50 border border-blue-200"
        >
          <User className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
          <div className="text-xs text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-700 mb-1">Proceeding as Guest</p>
            <p>Please ensure all fields are correctly filled before proceeding to payment. <a href="/login" className="font-semibold text-blue-600 hover:underline">Login here</a> to auto-fill your details.</p>
          </div>
        </motion.div>
      )} */}

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

      {/* Failure Modal */}
      <AnimatePresence>
        {paymentFailed && (
          <FailureModal
            message={failureMessage}
            onClose={() => setPaymentFailed(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
