import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Shield,
  CreditCard,
  Monitor,
  AlertTriangle,
  Scale,
  ChevronRight,
  Mail,
  ExternalLink,
} from "lucide-react";

/* ── Section data ─────────────────────────────── */
const sections = [
  {
    id: "services",
    number: "01",
    title: "Services Provided",
    icon: FileText,
    accent: "blue",
    content: (
      <div className="space-y-5">
        <p className="text-slate-600 leading-relaxed">
          We provide the following categories of services:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              label: "A. Software Services",
              items: [
                "Software setup & deployment",
                "Monthly and annual subscriptions",
                "Add-on modules",
                "Custom software development",
              ],
            },
            {
              label: "B. Hardware Sales",
              items: [
                "POS systems",
                "Computer hardware",
                "Accessories & peripherals",
              ],
            },
          ].map((group) => (
            <div
              key={group.label}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <p className="text-sm font-semibold text-slate-800 mb-3">
                {group.label}
              </p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "payments",
    number: "02",
    title: "Payments",
    icon: CreditCard,
    accent: "emerald",
    content: (
      <ul className="space-y-3">
        {[
          "All prices are displayed in Sri Lankan Rupees (LKR).",
          "Payments are processed securely via Seylan Bank Online Payment Gateway.",
          "Full payment is required before service activation or hardware dispatch.",
          "Subscription services are billed in advance and renew automatically unless cancelled.",
        ].map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed"
          >
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "responsibilities",
    number: "03",
    title: "User Responsibilities",
    icon: Shield,
    accent: "amber",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm leading-relaxed">
          By using our services, you agree to:
        </p>
        <ul className="space-y-3">
          {[
            "Provide accurate billing information",
            "Not misuse or attempt to hack the system",
            "Use the software only for lawful business purposes",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "suspension",
    number: "04",
    title: "Service Suspension",
    icon: AlertTriangle,
    accent: "red",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm leading-relaxed">
          We reserve the right to suspend or terminate services if:
        </p>
        <ul className="space-y-3">
          {[
            "Payment fails or is declined",
            "Fraudulent or illegal activity is detected",
            "These terms are violated",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "ip",
    number: "05",
    title: "Intellectual Property",
    icon: Monitor,
    accent: "purple",
    content: (
      <p className="text-slate-600 text-sm leading-relaxed">
        All software, content, branding, and system features belong to{" "}
        <span className="font-semibold text-slate-800">
          Ceylon Innovation Services (PVT) LTD
        </span>{" "}
        and may not be copied or redistributed without written permission.
      </p>
    ),
  },
  {
    id: "liability",
    number: "06",
    title: "Limitation of Liability",
    icon: AlertTriangle,
    accent: "slate",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm leading-relaxed">
          We are not responsible for:
        </p>
        <ul className="space-y-3">
          {[
            "Loss of business due to internet issues",
            "Misuse of the system",
            "External technical failures beyond our control",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "law",
    number: "07",
    title: "Governing Law",
    icon: Scale,
    accent: "indigo",
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 text-sm leading-relaxed">
          These Terms are governed by the laws of the Democratic Socialist
          Republic of Sri Lanka, including:
        </p>
        <ul className="space-y-3">
          {[
            "Electronic Transactions Act No. 19 of 2006",
            "Consumer Affairs Authority Act",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
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
  red: {
    bg: "bg-red-500/10",
    text: "text-red-600",
    border: "border-red-200",
    dot: "bg-red-500",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-600",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },
  slate: {
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-200",
    dot: "bg-slate-500",
  },
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-600",
    border: "border-indigo-200",
    dot: "bg-indigo-500",
  },
};

/* ── Page ─────────────────────────────────────── */
const TermsAndConditionsPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("services");

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
            Terms &amp; Conditions
          </span>
        </div>
      </header>

      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden bg-[#0a0f1e] py-16 px-6">
        {/* Glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-600/20 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-600/15 blur-[80px]" />
        </div>
        {/* Grid */}
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-5">
            <FileText className="w-3 h-3" />
            Legal Document
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto">
            Welcome to BillTill.co, owned and operated by{" "}
            <span className="text-white font-medium">
              Ceylon Innovation Services (PVT) LTD
            </span>
            . Please read these terms carefully before using our services.
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
                      className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                        isActive ? cls.dot : "bg-slate-300"
                      }`}
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
                    transition={{ duration: 0.45, delay: idx * 0.04 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                  >
                    {/* Section header */}
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
                    {/* Section body */}
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
              className="rounded-2xl bg-gradient-to-br from-[#0a0f1e] to-[#111827] border border-white/10 p-8 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">
                Questions about these Terms?
              </h3>
              <p className="text-slate-400 text-sm mb-5">
                Our legal team is here to help.
              </p>
              <a
                href="mailto:legal@billtill.co"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-500/25"
              >
                <Mail className="w-4 h-4" />
                legal@billtill.co
              </a>
              <p className="mt-5 text-xs text-slate-500">
                Ceylon Innovation Services (PVT) LTD — Registered in Sri Lanka
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
