import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  RotateCcw,
  Package,
  CreditCard,
  AlertCircle,
  Clock,
  ChevronRight,
  Mail,
  Globe,
  Phone,
} from "lucide-react";

/* ── Section data ─────────────────────────────── */
const sections = [
  {
    id: "software",
    number: "01",
    title: "Software Services",
    icon: Package,
    accent: "blue",
    content: (
      <div className="space-y-4">
        {[
          {
            label: "Setup & Deployment Fees",
            desc: "Non-refundable once access is granted or work has started.",
          },
          {
            label: "Subscription Payments",
            desc: "Non-refundable once that billing cycle begins. You may cancel before the next renewal date.",
          },
          {
            label: "Custom Development & Add-ons",
            desc: "Non-refundable once development or activation has started. Exceptional cases may be reviewed at management discretion.",
          },
        ].map(({ label, desc }) => (
          <div
            key={label}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
          >
            <p className="text-sm font-semibold text-slate-800 mb-1.5">
              {label}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "hardware",
    number: "02",
    title: "Hardware Returns",
    icon: RotateCcw,
    accent: "emerald",
    content: (
      <div className="space-y-5">
        <p className="text-slate-600 text-sm leading-relaxed">
          Refunds or replacements are available only if:
        </p>
        <ul className="space-y-3">
          {[
            "The item is defective",
            "The wrong item was delivered",
            "Item must be unused and in original condition",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">
            Return Conditions
          </p>
          <ul className="space-y-2">
            {[
              "Must report within 7 days of delivery",
              "Item must be unused and in original condition",
              "Proof of purchase is required",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-emerald-800"
              >
                <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "cancellation",
    number: "03",
    title: "Cancellation Policy",
    icon: AlertCircle,
    accent: "amber",
    content: (
      <ul className="space-y-3">
        {[
          "Subscriptions must be cancelled before next billing cycle.",
          "Setup and development services cannot be cancelled once started.",
          "Hardware orders can only be cancelled before dispatch.",
        ].map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed"
          >
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "refund",
    number: "04",
    title: "Refund Processing",
    icon: CreditCard,
    accent: "purple",
    content: (
      <div className="space-y-5">
        <ul className="space-y-3">
          {[
            "Approved refunds will be processed within 7–14 working days.",
            "Refunds will be credited via the original payment method.",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50 p-4">
          <Clock className="w-5 h-5 text-purple-500 shrink-0" />
          <p className="text-sm text-purple-800 font-medium">
            Processing time: 7 – 14 working days
          </p>
        </div>
      </div>
    ),
  },
];

const accentClasses = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-600",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-600",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },
};

/* ── Page ─────────────────────────────────────── */
const ReturnPolicyPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("software");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </button>
            <img
              src="/colored-logo.png"
              alt="Bill Till"
              className="h-7 w-auto"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">
            Refund &amp; Return Policy
          </span>
        </div>
      </header>

      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden bg-[#0a0f1e] py-16 px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-600/15 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-600/10 blur-[80px]" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-5">
            <RotateCcw className="w-3 h-3" />
            Legal Document
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Refund &amp; Return Policy
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto">
            Our commitment to fair, transparent policies for all software
            services, hardware sales, and subscriptions offered by{" "}
            <span className="text-white font-medium">
              Ceylon Innovation Services (PVT) LTD
            </span>
            .
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Last Updated: 2nd February 2026
          </p>
        </motion.div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">
                Contents
              </p>
              {sections.map(({ id, number, title, accent }) => {
                const isActive = activeSection === id;
                const cls = accentClasses[accent];
                return (
                  <button
                    key={id}
                    onClick={() =>
                      document
                        .getElementById(id)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-200 text-xs font-medium ${
                      isActive
                        ? `${cls.bg} ${cls.text}`
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${isActive ? cls.dot : "bg-slate-300"}`}
                    />
                    <span className="text-[10px] font-bold opacity-60 shrink-0">
                      {number}
                    </span>
                    {title}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Sections */}
          <div className="flex-1 space-y-6 min-w-0">
            {sections.map(
              ({ id, number, title, icon: Icon, accent, content }, idx) => {
                const cls = accentClasses[accent];
                return (
                  <motion.section
                    key={id}
                    id={id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.05 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                  >
                    <div
                      className={`flex items-center gap-4 px-6 py-5 border-b ${cls.border} bg-gradient-to-r from-white to-transparent`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl ${cls.bg} flex items-center justify-center shrink-0`}
                      >
                        <Icon className={`w-5 h-5 ${cls.text}`} />
                      </div>
                      <div className="flex items-baseline gap-2 min-w-0">
                        <span
                          className={`text-xs font-bold ${cls.text} opacity-60 shrink-0`}
                        >
                          {number}
                        </span>
                        <h2 className="text-base font-bold text-slate-800 truncate">
                          {title}
                        </h2>
                      </div>
                    </div>
                    <div className="px-6 py-5">{content}</div>
                  </motion.section>
                );
              },
            )}

            {/* Contact card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl bg-gradient-to-br from-[#0a0f1e] to-[#111827] border border-white/10 p-8"
            >
              <h3 className="text-white font-bold text-lg mb-1 text-center">
                Contact Us
              </h3>
              <p className="text-slate-400 text-sm mb-7 text-center">
                Reach out for any questions about returns or refunds.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: Globe,
                    label: "Website",
                    value: "billtill.co",
                    href: "https://www.billtill.co",
                    color: "text-blue-400",
                    bg: "bg-blue-500/10",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "ceyloninnovation@gmail.com",
                    href: "mailto:ceyloninnovation@gmail.com",
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/10",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+94 11 4 758 900",
                    href: "tel:+94114758900",
                    color: "text-purple-400",
                    bg: "bg-purple-500/10",
                  },
                ].map(({ icon: Icon, label, value, href, color, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition group text-center"
                  >
                    <div
                      className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}
                    >
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {label}
                    </p>
                    <p
                      className={`text-xs font-medium ${color} group-hover:underline break-all`}
                    >
                      {value}
                    </p>
                  </a>
                ))}
              </div>

              <p className="mt-6 text-center text-xs text-slate-600">
                Ceylon Innovation Services (PVT) LTD — Registered in Sri Lanka
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
