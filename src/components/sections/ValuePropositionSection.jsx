import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../../translations/LanguageContext";
import {
  Zap,
  Shield,
  BarChart3,
  Cloud,
  CreditCard,
  Smartphone,
} from "lucide-react";

export const ValuePropositionSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const propositions = [
    {
      icon: BarChart3,
      title: t("value_prop1_title"),
      description: t("value_prop1_desc"),
      i18nTitle: "value_prop1_title",
      i18nDesc: "value_prop1_desc",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Zap,
      title: t("value_prop2_title"),
      description: t("value_prop2_desc"),
      i18nTitle: "value_prop2_title",
      i18nDesc: "value_prop2_desc",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      icon: Shield,
      title: t("value_prop3_title"),
      description: t("value_prop3_desc"),
      i18nTitle: "value_prop3_title",
      i18nDesc: "value_prop3_desc",
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  const additionalFeatures = [
    {
      icon: Cloud,
      label: t("value_feature_cloud"),
      i18n: "value_feature_cloud",
    },
    {
      icon: Smartphone,
      label: t("value_feature_mobile"),
      i18n: "value_feature_mobile",
    },
    {
      icon: CreditCard,
      label: t("value_feature_payments"),
      i18n: "value_feature_payments",
    },
  ];

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
            <span data-i18n="value_title">
              {t("value_title")}
            </span>
          </h2>
          <p
            className="text-sm lg:text-md px-5 text-muted-foreground"
            data-i18n="value_subtitle"
          >
            {t("value_subtitle")}
          </p>
        </motion.div>

        {/* Main Propositions */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {propositions.map((prop, index) => (
            <motion.div
              key={prop.i18nTitle}
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
                <h3
                  className="text-lg md:text-xl font-semibold text-foreground mb-3"
                  data-i18n={prop.i18nTitle}
                >
                  {prop.title}
                </h3>
                <p
                  className="text-muted-foreground leading-relaxed text-md"
                  data-i18n={prop.i18nDesc}
                >
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
              key={feature.i18n}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <feature.icon className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium" data-i18n={feature.i18n}>
                {feature.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
