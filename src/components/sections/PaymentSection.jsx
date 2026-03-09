import React from "react";
import { motion } from "framer-motion";
import PaymentForm from "./PaymentForm";
import { useLanguage } from "../../translations/LanguageContext";

export const PaymentSection = () => {
  const { t } = useLanguage();

  return (
    <section id="pay" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            data-i18n="pay_title"
          >
            {t("pay_title")}
          </h2>
          <p
            className="text-base lg:text-md text-muted-foreground"
            data-i18n="pay_desc"
          >
            {t("pay_desc")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PaymentForm />
        </motion.div>
      </div>
    </section>
  );
};
