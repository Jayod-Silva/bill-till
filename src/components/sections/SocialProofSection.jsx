import React from "react";
import { motion } from "framer-motion";
import { Users, Star, Shield, Headset } from "lucide-react";
import { useLanguage } from "@/translations/LanguageContext";

const partners = [
  { name: "Stripe", logo: "/stripe.png" },
  { name: "Visa", logo: "/visa.png" },
  { name: "Mastercard", logo: "/mastercard.png" },
  { name: "Payhere", logo: "/payhere.png" },
  { name: "Commercial Bank", logo: "/comb.png" },
  { name: "Sampath Bank", logo: "/sampath.png" },
];

export const SocialProofSection = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: "5,000+",
      label: t("social_active_businesses"),
      key: "social_active_businesses",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: t("social_customer_rating"),
      key: "social_customer_rating",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      icon: Shield,
      value: "99.9%",
      label: t("social_uptime"),
      key: "social_uptime",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Headset,
      value: "24/7",
      label: t("social_support"),
      key: "social_support",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partner Logos */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-sm font-medium text-muted-foreground mb-12 uppercase tracking-widest"
            data-i18n="social_trusted"
          >
            {t("social_trusted")}
          </motion.p>

          <div className="relative">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
              {partners.map((partner) => (
                <motion.img
                  key={partner.name}
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 md:h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 rounded-3xl bg-gray-50/50 border border-gray-100/50 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 group"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}
              >
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div
                className="text-sm font-medium text-muted-foreground"
                data-i18n={stat.key}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
