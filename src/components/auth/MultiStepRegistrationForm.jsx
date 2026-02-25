"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Building2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Lock,
  MapPin,
  Hash,
  Briefcase,
  ArrowRight,
  Sparkles,
  BarChart3,
  ShoppingCart,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Floating Label Input
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
        {/* Left icon */}
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

        {/* Input */}
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

        {/* Floating label */}
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute transition-all duration-200 origin-left",
            "text-slate-500 select-none",
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

        {/* Right element (e.g. show/hide password) */}
        {rightElement && (
          <div className="absolute right-3.5">{rightElement}</div>
        )}
      </div>

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

/* ─────────────────────────────────────────────
   Floating Label Select
───────────────────────────────────────────── */
const FloatingSelect = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  icon: Icon,
  children,
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
              "absolute left-3.5 transition-colors duration-200 pointer-events-none",
              focused ? "text-blue-500" : "text-slate-400"
            )}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}

        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full bg-transparent py-3.5 text-sm text-slate-800 outline-none appearance-none",
            Icon ? "pl-10 pr-8" : "px-4 pr-8",
            !value && "text-transparent"
          )}
        >
          {children}
        </select>

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

        {/* Chevron arrow */}
        <div className="pointer-events-none absolute right-3.5 text-slate-400">
          <ChevronRight className="w-4 h-4 rotate-90" />
        </div>
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
   Brand Left Panel
───────────────────────────────────────────── */
const features = [
  { icon: BarChart3, label: "Real-time Analytics", color: "bg-blue-500/20 text-blue-300" },
  { icon: ShoppingCart, label: "Smart POS System", color: "bg-purple-500/20 text-purple-300" },
  { icon: Shield, label: "Secure & Compliant", color: "bg-emerald-500/20 text-emerald-300" },
  { icon: Sparkles, label: "AI-powered Insights", color: "bg-amber-500/20 text-amber-300" },
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
      className="relative z-10 flex items-center gap-2.5"
    >
      <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
        <BarChart3 className="w-5 h-5 text-white" />
      </div>
      <span className="text-white font-bold text-lg tracking-tight">Bill Till</span>
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
        Manage your entire business from a single, beautiful platform. Payments, inventory, and analytics — all in one place.
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
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", color)}>
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
        "Bill Till transformed how we run our retail chain. The analytics alone have paid for themselves tenfold."
      </p>
      <div className="mt-3 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
          R
        </div>
        <div>
          <p className="text-white text-xs font-semibold">Ramesh Perera</p>
          <p className="text-slate-500 text-xs">CEO, StyleMart LK</p>
        </div>
      </div>
    </motion.div>
  </div>
);

/* ─────────────────────────────────────────────
   Step Indicator
───────────────────────────────────────────── */
const StepIndicator = ({ current, total }) => (
  <div className="flex items-center gap-0 mb-8">
    {Array.from({ length: total }).map((_, i) => {
      const done = i < current - 1;
      const active = i === current - 1;
      return (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500",
                done
                  ? "bg-blue-500 text-white"
                  : active
                  ? "bg-blue-500 text-white ring-4 ring-blue-500/20"
                  : "bg-slate-100 text-slate-400"
              )}
            >
              {done ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <span
              className={cn(
                "text-[10px] font-medium whitespace-nowrap transition-colors duration-300",
                active ? "text-blue-600" : done ? "text-slate-500" : "text-slate-400"
              )}
            >
              {i === 0 ? "Personal Info" : "Business Info"}
            </span>
          </div>
          {i < total - 1 && (
            <div className="flex-1 h-[2px] mx-3 mb-5 rounded overflow-hidden bg-slate-100">
              <motion.div
                className="h-full bg-blue-500 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: done ? 1 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </div>
          )}
        </React.Fragment>
      );
    })}
  </div>
);

/* ─────────────────────────────────────────────
   Success Screen
───────────────────────────────────────────── */
const SuccessScreen = () => {
  const particles = Array.from({ length: 18 });
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[420px] text-center overflow-hidden">
      {/* Confetti particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            backgroundColor: ["#3b82f6", "#6366f1", "#10b981", "#f59e0b", "#ec4899"][i % 5],
            left: `${10 + (i * 5) % 85}%`,
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
        <h2 className="text-2xl font-bold text-slate-800 mb-2">You're all set! 🎉</h2>
        <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto">
          Your account has been created. We'll be in touch shortly with your activation details.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200"
        >
          Back to Home <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const MultiStepRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    business_name: "",
    business_type: "",
    business_address: "",
    city: "",
    province: "",
    zip_code: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [direction, setDirection] = useState(1);

  const totalSteps = 2;

  const validateStep = (step) => {
    const e = {};
    if (step === 1) {
      if (!formData.first_name.trim()) e.first_name = "First name is required";
      if (!formData.last_name.trim()) e.last_name = "Last name is required";
      if (!formData.email.trim()) e.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        e.email = "Please enter a valid email";
      if (!formData.phone.trim()) e.phone = "Phone number is required";
      else if (!/^\+?[\d\s\-()]+$/.test(formData.phone))
        e.phone = "Please enter a valid phone number";
      if (!formData.password.trim()) e.password = "Password is required";
      else if (formData.password.length < 8)
        e.password = "Password must be at least 8 characters";
    } else if (step === 2) {
      if (!formData.business_name.trim()) e.business_name = "Business name is required";
      if (!formData.business_type.trim()) e.business_type = "Business type is required";
      if (!formData.business_address.trim()) e.business_address = "Business address is required";
      if (!formData.city.trim()) e.city = "City is required";
      if (!formData.province.trim()) e.province = "Province is required";
      if (!formData.zip_code.trim()) e.zip_code = "Zip code is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) setIsSubmitted(true);
      else {
        const data = await response.json();
        setErrors({ submit: data.message || "Registration failed. Please try again." });
      }
    } catch {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Slide variants */
  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4"
          >
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 mb-3">
                <User className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Personal Details</h2>
              <p className="text-slate-500 text-sm mt-0.5">Tell us a little about yourself</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FloatingInput
                id="first_name"
                name="first_name"
                label="First Name"
                placeholder="John"
                value={formData.first_name}
                onChange={handleInputChange}
                error={errors.first_name}
                icon={User}
              />
              <FloatingInput
                id="last_name"
                name="last_name"
                label="Last Name"
                placeholder="Doe"
                value={formData.last_name}
                onChange={handleInputChange}
                error={errors.last_name}
                icon={User}
              />
            </div>

            <FloatingInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              icon={Mail}
            />

            <FloatingInput
              id="phone"
              name="phone"
              type="tel"
              label="Phone Number"
              placeholder="+94 77 123 4567"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
              icon={Phone}
            />

            <FloatingInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Min. 8 characters"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              icon={Lock}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4"
          >
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 mb-3">
                <Building2 className="w-5 h-5 text-indigo-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Business Details</h2>
              <p className="text-slate-500 text-sm mt-0.5">Help us set up your business profile</p>
            </div>

            <FloatingInput
              id="business_name"
              name="business_name"
              label="Business Name"
              placeholder="Acme Corporation"
              value={formData.business_name}
              onChange={handleInputChange}
              error={errors.business_name}
              icon={Briefcase}
            />

            <FloatingSelect
              id="business_type"
              name="business_type"
              label="Business Type"
              value={formData.business_type}
              onChange={handleInputChange}
              error={errors.business_type}
              icon={Briefcase}
            >
              <option value="" disabled />
              <option value="retail">Retail</option>
              <option value="restaurant">Restaurant</option>
              <option value="service">Service</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </FloatingSelect>

            <FloatingInput
              id="business_address"
              name="business_address"
              label="Business Address"
              placeholder="123 Main Street"
              value={formData.business_address}
              onChange={handleInputChange}
              error={errors.business_address}
              icon={MapPin}
            />

            <div className="grid grid-cols-3 gap-3">
              <FloatingInput
                id="city"
                name="city"
                label="City"
                placeholder="Colombo"
                value={formData.city}
                onChange={handleInputChange}
                error={errors.city}
                icon={MapPin}
              />
              <FloatingSelect
                id="province"
                name="province"
                label="Province"
                value={formData.province}
                onChange={handleInputChange}
                error={errors.province}
              >
                <option value="" disabled />
                <option value="Western">Western</option>
                <option value="North Western">North Western</option>
                <option value="North Central">North Central</option>
                <option value="Central">Central</option>
                <option value="Sabaragamuwa">Sabaragamuwa</option>
                <option value="Eastern">Eastern</option>
                <option value="Uva">Uva</option>
                <option value="Southern">Southern</option>
                <option value="Northern">Northern</option>
              </FloatingSelect>
              <FloatingInput
                id="zip_code"
                name="zip_code"
                label="Zip Code"
                placeholder="10100"
                value={formData.zip_code}
                onChange={handleInputChange}
                error={errors.zip_code}
                icon={Hash}
              />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen">
        <BrandPanel />
        <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
          <div className="w-full max-w-md">
            <SuccessScreen />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <BrandPanel />

      {/* Right form panel */}
      <div className="flex-1 overflow-y-auto bg-slate-50 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[480px]">

          {/* Mobile brand bar */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-800 text-base">Bill Till</span>
            </div>
            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Home
            </button>
          </div>

          {/* Back to Home — desktop */}
          <button
            onClick={() => (window.location.href = "/")}
            className="hidden lg:inline-flex items-center gap-1.5 mb-6 text-sm text-slate-400 hover:text-slate-700 font-medium transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </button>

          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1">
              Get started for free
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight">
              Create your account
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:text-blue-600 font-medium transition-colors">
                Sign in
              </a>
            </p>
          </div>

          {/* Step indicator */}
          <StepIndicator current={currentStep} total={totalSteps} />

          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] border border-slate-100 p-6 sm:p-8">
            <AnimatePresence mode="wait" custom={direction}>
              {renderStep()}
            </AnimatePresence>

            {/* Submit error */}
            <AnimatePresence>
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errors.submit}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                      />
                      Creating account…
                    </>
                  ) : (
                    <>
                      Complete Registration <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-5 text-center text-xs text-slate-400">
            By registering you agree to our{" "}
            <a href="/terms" className="text-slate-500 hover:text-slate-700 underline underline-offset-2">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-slate-500 hover:text-slate-700 underline underline-offset-2">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultiStepRegistrationForm;
