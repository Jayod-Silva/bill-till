import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        {/* Coming Soon Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-16 border border-gray-100"
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-8">
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>

          {/* Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Shop is</h1>

          <h2 className="text-5xl font-bold bg-gradient-to-r p-2 from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Coming Soon!
          </h2>

          <p className="text-md text-gray-600 max-w-md mx-auto leading-relaxed mb-8">
            We're working to bring you the best POS hardware and accessories.
            Our online shop will launch with exclusive deals and premium
            products.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
