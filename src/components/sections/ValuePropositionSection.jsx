import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Zap,
  Shield,
  BarChart3,
  Cloud,
  CreditCard,
  Smartphone,
} from "lucide-react";

const propositions = [
  {
    icon: BarChart3,
    title: "Access Anywhere",
    description:
      "Check your POS system anytime, anywhere with any device. Complete mobility and flexibility for modern business management.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Process transactions in milliseconds. No lag, no waiting, just seamless checkout experiences.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description:
      "End-to-end encryption, PCI DSS compliance, and fraud protection built into every transaction.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

const additionalFeatures = [
  { icon: Cloud, label: "Cloud-Based" },
  { icon: Smartphone, label: "Mobile Ready" },
  { icon: CreditCard, label: "All Payments" },
];

export const ValuePropositionSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="company"
      ref={sectionRef}
      className="py-16 md:py-24 lg:pt-32 lg:pb-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-5xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6">
            Why businesses choose{" "}
            <span className="text-primary">Bill Till</span>
          </h2>
          <p className="text-sm lg:text-md px-5 text-muted-foreground">
            Built for the modern era, our platform combines cutting-edge
            technology with intuitive design to deliver the ultimate POS
            experience.
          </p>
        </motion.div>

        {/* Main Propositions */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {propositions.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-card transition-all duration-300">
                <div
                  className={`w-14 h-14 rounded-xl ${prop.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <prop.icon className={`w-7 h-7 ${prop.color}`} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                  {prop.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-md">
                  {prop.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-border"
        >
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <feature.icon className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
