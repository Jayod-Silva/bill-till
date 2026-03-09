import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import axios from "axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://caritasconnect.ddns.net/billtill/api/contact",
        formData,
      );

      if (response.data.success) {
        alert("Message sent successfully! We will get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          business: "",
          message: "",
        });
      } else {
        throw new Error(response.data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert(
        "Failed to send message. Please try again or email us directly at info@billtill.co",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-[#0957D6]/20">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0957D6]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0957D6]/5 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 relative overflow-hidden">
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0957D6]/10 text-[#0957D6] font-medium text-sm mb-6 border border-[#0957D6]/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>We're here to help</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Let's build something{" "}
              <span className="text-[#0957D6]">together.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed px-4">
              Have questions about Bill Till? Our team is ready to assist you
              with support, custom solutions, or technical inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Contact Info - Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="xl:col-span-5 space-y-8"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8">Contact Information</h2>
                <div className="grid gap-4 sm:gap-6">
                  {/* Email Card */}
                  <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3 sm:gap-4 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0957D6]/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#0957D6]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base sm:text-lg mb-1">Email Us</h3>
                      <p className="text-slate-500 mb-2 text-sm sm:text-base">
                        Our support team response time is within 24 hours.
                      </p>
                      <a
                        href="mailto:info@billtill.co"
                        className="text-[#0957D6] font-medium hover:underline flex items-center gap-1 text-sm sm:text-base break-all"
                      >
                        info@billtill.co <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                      <div className="mt-2 text-xs text-slate-400">
                        Website: <a href="https://www.billtill.co" target="_blank" rel="noopener noreferrer" className="hover:underline">www.billtill.co</a>
                      </div>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3 sm:gap-4 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base sm:text-lg mb-1">Call Us</h3>
                      <p className="text-slate-500 mb-2 text-sm sm:text-base">
                        Mon-Fri from 9am to 6pm (IST).
                      </p>
                      <div className="flex flex-col gap-1">
                        <a
                          href="tel:+94114758900"
                          className="text-[#0957D6] font-medium hover:underline flex items-center gap-1 text-sm sm:text-base"
                        >
                          +94 11 475 8900 <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                        <a
                          href="tel:+94777236130"
                          className="text-[#0957D6] font-medium hover:underline flex items-center gap-1 text-sm sm:text-base"
                        >
                          +94 77 723 6130 (24/7) <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Office Card */}
                  <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3 sm:gap-4 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base sm:text-lg mb-1">Visit Us</h3>
                      <p className="text-slate-900 font-medium text-sm sm:text-base leading-relaxed">
                        Ceylon Innovation Services (PVT) LTD<br />
                        680A Colombo Road, Kattuwa,<br />
                        Negombo, Sri Lanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>


            </motion.div>

            {/* Contact Form - Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="xl:col-span-7"
            >
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0957D6]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

                <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8">Send a Message</h2>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6 relative z-10"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1 text-slate-700">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Bill Till"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0957D6]/20 focus:border-[#0957D6] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1 text-slate-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="info@billtill.co"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0957D6]/20 focus:border-[#0957D6] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1 text-slate-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+94 11 475 8900"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0957D6]/20 focus:border-[#0957D6] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1 text-slate-700">
                        Business Name
                      </label>
                      <input
                        type="text"
                        name="business"
                        value={formData.business}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0957D6]/20 focus:border-[#0957D6] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1 text-slate-700">
                      How can we help?
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your requirements..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0957D6]/20 focus:border-[#0957D6] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0957D6] text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg shadow-[#0957D6]/20 hover:bg-black hover:shadow-xl hover:shadow-[#0957D6]/10 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#0957D6]/10 blur-[100px] -z-10 rounded-full scale-90" />
            <div className="bg-white p-2 sm:p-3 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] min-h-[250px] sm:min-h-[300px] md:min-h-[400px]">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.05840658517!2d79.84688931150635!3d7.234178814464893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2cb6c28738405%3A0x9929b748309020af!2sCeylon%20Innovation%20Services%20(PVT)%20LTD!5e0!3m2!1sen!2slk!4v1773052598036!5m2!1sen!2slk"
                className="w-full h-full rounded-[1.2rem] sm:rounded-[1.5rem] md:rounded-[2rem] border-0 transition-all duration-700"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Map Overlay Label */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 bg-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-200 shadow-lg items-center gap-3 sm:gap-4 hidden sm:flex">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#0957D6] rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                  Location
                </p>
                <p className="font-bold text-sm sm:text-base">Ceylon Innovation Services (PVT) LTD</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
