import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CreditCard,
  BarChart3,
  Users,
  Package,
  Bell,
  Globe,
  Smartphone,
  RefreshCw,
} from "lucide-react";
import { useLanguage } from "../../translations/LanguageContext";

export const FeaturesSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  const features = [
    {
      icon: CreditCard,
      title: t("feat_pay_title"),
      description: t("feat_pay_desc"),
      category: t("feat_cat_payments"),
      i18nTitle: "feat_pay_title",
      i18nDesc: "feat_pay_desc",
      i18nCat: "feat_cat_payments",
    },
    {
      icon: BarChart3,
      title: t("feat_ana_title"),
      description: t("feat_ana_desc"),
      category: t("feat_cat_analytics"),
      i18nTitle: "feat_ana_title",
      i18nDesc: "feat_ana_desc",
      i18nCat: "feat_cat_analytics",
    },
    {
      icon: Users,
      title: t("feat_staff_title"),
      description: t("feat_staff_desc"),
      category: t("feat_cat_management"),
      i18nTitle: "feat_staff_title",
      i18nDesc: "feat_staff_desc",
      i18nCat: "feat_cat_management",
    },
    {
      icon: Package,
      title: t("feat_inv_title"),
      description: t("feat_inv_desc"),
      category: t("feat_cat_inventory"),
      i18nTitle: "feat_inv_title",
      i18nDesc: "feat_inv_desc",
      i18nCat: "feat_cat_inventory",
    },
    {
      icon: Bell,
      title: t("feat_not_title"),
      description: t("feat_not_desc"),
      category: t("feat_cat_alerts"),
      i18nTitle: "feat_not_title",
      i18nDesc: "feat_not_desc",
      i18nCat: "feat_cat_alerts",
    },
    {
      icon: Globe,
      title: t("feat_loc_title"),
      description: t("feat_loc_desc"),
      category: t("feat_cat_scale"),
      i18nTitle: "feat_loc_title",
      i18nDesc: "feat_loc_desc",
      i18nCat: "feat_cat_scale",
    },
    {
      icon: Smartphone,
      title: t("feat_mob_title"),
      description: t("feat_mob_desc"),
      category: t("feat_cat_mobile"),
      i18nTitle: "feat_mob_title",
      i18nDesc: "feat_mob_desc",
      i18nCat: "feat_cat_mobile",
    },
    {
      icon: RefreshCw,
      title: t("feat_off_title"),
      description: t("feat_off_desc"),
      category: t("feat_cat_reliability"),
      i18nTitle: "feat_off_title",
      i18nDesc: "feat_off_desc",
      i18nCat: "feat_cat_reliability",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="pt-24 pb-24 lg:py-20 bg-muted/30"
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
          <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span data-i18n="feat_title_main">{t("feat_title_main")}</span>{" "}
            <span className="text-primary" data-i18n="feat_title_highlight">
              {t("feat_title_highlight")}
            </span>
          </h2>
          <p
            className="text-base lg:text-lg text-muted-foreground"
            data-i18n="feat_subtitle"
          >
            {t("feat_subtitle")}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.i18nTitle}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              style={{ y: index % 2 === 0 ? y1 : y2 }}
              className="group lg:block hidden" // Hide on mobile, show on desktop
            >
              <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-card transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex items-center gap-2 mb-2">
                  <h3
                    className="text-base font-semibold text-foreground"
                    data-i18n={feature.i18nTitle}
                  >
                    {feature.title}
                  </h3>
                </div>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  data-i18n={feature.i18nDesc}
                >
                  {feature.description}
                </p>

                {/* Category Tag */}
                <div className="mt-4">
                  <span
                    className="text-xs font-medium text-primary/70"
                    data-i18n={feature.i18nCat}
                  >
                    {feature.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Features Grid - No Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
          {features.map((feature, index) => (
            <div key={feature.i18nTitle} className="group">
              <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-card transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex items-center gap-2 mb-2">
                  <h3
                    className="text-base font-semibold text-foreground"
                    data-i18n={feature.i18nTitle}
                  >
                    {feature.title}
                  </h3>
                </div>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  data-i18n={feature.i18nDesc}
                >
                  {feature.description}
                </p>

                {/* Category Tag */}
                <div className="mt-4">
                  <span
                    className="text-xs font-medium text-primary/70"
                    data-i18n={feature.i18nCat}
                  >
                    {feature.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        ></motion.div>
      </div>
    </section>
  );
};
