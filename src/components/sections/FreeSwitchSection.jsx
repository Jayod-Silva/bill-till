import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Shield, TrendingUp, ArrowRight } from "lucide-react";

export const FreeSwitchSection = () => {
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
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 px-10 md:px-0 mb-6">
            Switch to BillTill for Free
          </h2>
          <p className="text-md lg:text-lg text-gray-700 px-8 md:px-0 mb-8">
            No hidden fees. No setup costs. No system switching charges. Make
            the move to a better POS system without breaking the bank.
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Zero Setup Fees
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              No charges for initial setup and configuration of your new POS
              system
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Free Data Migration
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We'll migrate your existing data at no cost with zero downtime
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No Switching Charges
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Completely free transition from your current POS system
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
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Free Training
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Complimentary staff training to ensure smooth adoption
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
