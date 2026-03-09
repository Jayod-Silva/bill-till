import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  KeyRound,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  BarChart3,
  ShoppingCart,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Brand Left Panel (reused from registration form design)
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
        <KeyRound className="w-3 h-3" />
        Secure Activation
      </div>

      <h2 className="text-4xl font-bold text-white leading-tight mb-4">
        Activate your
        <br />
        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          POS system now.
        </span>
      </h2>

      <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
        Enter the confirmation code sent to you by our team to activate your
        Bill Till POS system and get started.
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

/* ─────────────────────────────────────────────
   Single Code Input Field
───────────────────────────────────────────── */
const CodeInput = ({ value, onChange, error }) => {
  const handleChange = (e) => {
    const val = e.target.value.replace(/\s/g, ""); // Remove spaces
    onChange(val);
  };

  const getInputStyle = () => {
    const base = {
      width: "100%",
      height: "3.5rem",
      fontSize: "1.125rem",
      fontWeight: "500",
      borderRadius: "0.75rem",
      borderWidth: "2px",
      borderStyle: "solid",
      outline: "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
      color: "#1e293b",
      caretColor: "#3b82f6",
      padding: "0 1rem",
      boxSizing: "border-box",
    };

    if (value) {
      return {
        ...base,
        borderColor: "#3b82f6",
        backgroundColor: "#eff6ff",
        boxShadow: "0 0 0 3px rgba(59,130,246,0.18)",
      };
    }
    if (error) {
      return {
        ...base,
        borderColor: "#f87171",
        backgroundColor: "#fff",
        boxShadow: "0 0 0 3px rgba(239,68,68,0.12)",
      };
    }
    return { ...base, borderColor: "#94a3b8", backgroundColor: "#fff" };
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Enter confirmation code here"
        style={getInputStyle()}
        aria-label="Confirmation code"
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="mt-3 flex items-center gap-1 text-xs text-red-500"
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
   Success Screen
───────────────────────────────────────────── */
const SuccessScreen = ({ code }) => {
  const navigate = useNavigate();
  const particles = Array.from({ length: 18 });
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[420px] text-center overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            backgroundColor: [
              "#3b82f6",
              "#6366f1",
              "#10b981",
              "#f59e0b",
              "#ec4899",
            ][i % 5],
            left: `${10 + ((i * 5) % 85)}%`,
            top: "30%",
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: [0, -80 - (i % 5) * 20, 200],
            opacity: [1, 1, 0],
            rotate: [0, 180 + i * 30, 360],
            x: [(i % 3 === 0 ? -30 : 30) * (i % 2 === 0 ? 1 : -1)],
          }}
          transition={{
            duration: 1.4,
            delay: 0.2 + i * 0.06,
            ease: "easeOut",
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/30"
      >
        <CheckCircle2 className="w-10 h-10 text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Code Verified! 🎉
        </h2>
        <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto">
          Your confirmation code has been accepted. Your Bill Till POS system is
          now active.
        </p>
        <button
          onClick={() =>
            navigate("/payment", { state: { confirmationCode: code } })
          }
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200"
        >
          Proceed to Payment <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
const ConfirmationCodePage = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let hasError = false;
    // MOCK CODE FOR TESTING
    const MOCK_CODE = "#BT123456";

    if (!code || code.trim() === "") {
      setError("Please enter your confirmation code.");
      hasError = true;
    } else {
      setError("");
    }
    if (!agreed) {
      setAgreeError("You must agree to Terms & Conditions to proceed.");
      hasError = true;
    } else {
      setAgreeError("");
    }
    if (hasError) return;
    setIsSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 1200)); // simulate network

      if (code !== MOCK_CODE) {
        throw new Error(
          "Invalid confirmation code. For testing, use #BT123456.",
        );
      }

      setIsVerified(true);
      // Store verified code for use in PaymentForm
      localStorage.setItem("billtill_verified_code", code);
    } catch (err) {
      setError(err.message || "Invalid confirmation code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Brand Panel */}
      <BrandPanel />

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-6 py-14">
        <div className="w-full max-w-md">
          {isVerified ? (
            <SuccessScreen code={code} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="mb-8">
                {/* Back Button */}
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-4 group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span className="text-sm font-medium">Back to Home</span>
                </button>

                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 mb-5">
                  <KeyRound className="w-6 h-6 text-blue-500" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 mb-1">
                  Enter Confirmation Code
                </h1>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Enter confirmation code provided by the Bill Till team to
                  activate your POS system.
                </p>
              </div>

              {/* Code input */}
              <div className="mb-6">
                <CodeInput value={code} onChange={setCode} error={error} />
              </div>

              {/* Submit button */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200",
                  "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
                  "shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5",
                  "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-blue-500/25",
                )}
              >
                {isSubmitting ? (
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
                    Verifying…
                  </>
                ) : (
                  <>
                    Verify Code <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Terms & Conditions checkbox */}
              <div className="mt-4 space-y-1">
                <label className="flex items-start gap-3 cursor-pointer group select-none">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      id="agree-terms"
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        if (e.target.checked) setAgreeError("");
                      }}
                      className="sr-only"
                    />
                    <div
                      className={cn(
                        "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200",
                        agreed
                          ? "bg-blue-500 border-blue-500"
                          : agreeError
                            ? "border-red-400 bg-white"
                            : "border-slate-300 bg-white group-hover:border-blue-400",
                      )}
                    >
                      {agreed && (
                        <svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 12 10"
                          fill="none"
                        >
                          <path
                            d="M1 5l3.5 3.5L11 1"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-slate-600 leading-relaxed pt-0.5">
                    I have read and agree to{" "}
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 font-semibold hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Terms &amp; Conditions
                    </a>
                    ,and{" "}
                    <a
                      href="/return-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 font-semibold hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Return Policy
                    </a>{" "}
                    of Bill Till.
                  </span>
                </label>

                <AnimatePresence>
                  {agreeError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-1 text-xs text-red-500 pl-8"
                    >
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      {agreeError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCodePage;
