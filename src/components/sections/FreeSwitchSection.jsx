import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Shield, TrendingUp, ArrowRight } from "lucide-react";
import { useLanguage } from "../../translations/LanguageContext";

export const FreeSwitchSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="free-switch"
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/freebg.png')" }}
    >
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl lg:text-6xl font-bold text-gray-900 px-10 md:px-0 mb-6"
            data-i18n="free_title"
          >
            {t("free_title")}
          </h2>
          <p
            className="text-md lg:text-lg text-gray-700 px-8 md:px-0 mb-8"
            data-i18n="free_desc"
          >
            {t("free_desc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mb-16 max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Check className="w-6 h-6 text-blue-600" />
            </div>
            <h3
              className="text-lg font-bold text-gray-900 mb-2"
              data-i18n="free_setup_title"
            >
              {t("free_setup_title")}
            </h3>
            <p
              className="text-sm text-gray-600 leading-relaxed"
              data-i18n="free_setup_desc"
            >
              {t("free_setup_desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3
              className="text-lg font-bold text-gray-900 mb-2"
              data-i18n="free_migration_title"
            >
              {t("free_migration_title")}
            </h3>
            <p
              className="text-sm text-gray-600 leading-relaxed"
              data-i18n="free_migration_desc"
            >
              {t("free_migration_desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3
              className="text-lg font-bold text-gray-900 mb-2"
              data-i18n="free_switching_title"
            >
              {t("free_switching_title")}
            </h3>
            <p
              className="text-sm text-gray-600 leading-relaxed"
              data-i18n="free_switching_desc"
            >
              {t("free_switching_desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <h3
              className="text-lg font-bold text-gray-900 mb-2"
              data-i18n="free_training_title"
            >
              {t("free_training_title")}
            </h3>
            <p
              className="text-sm text-gray-600 leading-relaxed"
              data-i18n="free_training_desc"
            >
              {t("free_training_desc")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <img
            src="/POS.png"
            alt="POS Device"
            className="max-w-full h-auto max-h-[400px] lg:max-h-[500px] object-contain mx-auto scale-150 lg:scale-150 -mb-5"
          />
        </motion.div>
      </div>
    </section>
  );
};
