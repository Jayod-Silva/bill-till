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
    titleKey: "value_prop2_title",
    descKey: "value_prop2_desc",
    color: "amber",
  },
  {
    icon: Shield,
    titleKey: "value_prop3_title",
    descKey: "value_prop3_desc",
    color: "green",
  },
];

export const ValuePropositionSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            <span data-i18n="value_title">{t("value_title")}</span>{" "}
            <span className="text-blue-600">Bill Till</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 leading-relaxed"
            data-i18n="value_subtitle"
          >
            {t("value_subtitle")}
          </motion.p>
        </div>

        {/* Propositions Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {propositions.map((prop, index) => (
            <motion.div
              key={prop.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-blue-100 transition-all duration-300 group"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-${prop.color}-50`}
              >
                <prop.icon className={`w-7 h-7 text-${prop.color}-600`} />
              </div>
              <h3
                className="text-xl font-bold text-gray-900 mb-4"
                data-i18n={prop.titleKey}
              >
                {t(prop.titleKey)}
              </h3>
              <p
                className="text-gray-600 leading-relaxed"
                data-i18n={prop.descKey}
              >
                {t(prop.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-60"
        >
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            <span className="font-semibold" data-i18n="value_cloud">
              {t("value_cloud")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            <span className="font-semibold" data-i18n="value_mobile">
              {t("value_mobile")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="font-semibold" data-i18n="value_payments">
              {t("value_payments")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
