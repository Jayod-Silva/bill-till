import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Rocket,
  ArrowLeft,
  CheckCircle,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
  Award,
  Globe,
  Zap,
  Shield,
  BarChart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";

export default function CompanyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-[#0957D6]/20">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0957D6]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0957D6]/5 blur-[120px] rounded-full" />
      </div>

      {/* Who We Are Section */}
      <section className="py-20 mt-20">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-2xl">
                <img
                  src="/Promo6.png"
                  alt="Team Collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#0957D6] rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white hidden md:flex">
                <Users className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0957D6]/10 text-[#0957D6] font-semibold text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-[#0957D6] animate-pulse"></span>
                GET TO KNOW US
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
                Who We Are
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Ceylon Innovation Services (PVT) LTD is a technology-driven
                company focused on building modern software solutions that help
                businesses operate smarter and more efficiently. Since 2017, we
                have been delivering innovative systems that simplify business
                processes, improve productivity, and support sustainable growth
                across multiple industries.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                Our solutions are designed with a strong focus on usability,
                reliability, and scalability, enabling businesses to adapt to
                the evolving digital landscape and remain competitive in today's
                global marketplace.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {[
                  "Modern Software",
                  "Improved Productivity",
                  "Reliability",
                  "Simplified Processes",
                  "Usability",
                  "Scalability",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0957D6] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Years of Experience", value: "7+" },
              { icon: Award, label: "Projects Delivered", value: "50+" },
              { icon: Globe, label: "Happy Clients", value: "100+" },
              { icon: Target, label: "Team Members", value: "15+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#0957D6]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-[#0957D6]" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Subtle backgrounds */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent" />

        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Our Vision:{" "}
              <span className="text-[#0957D6]">Empowering Tomorrow</span>
            </h2>

            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Our vision is to empower businesses through accessible,
              intelligent, and scalable technology solutions. We believe that
              modern software should be powerful, practical, and easy to use.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {[
              {
                icon: Lightbulb,
                title: "Accessible Technology",
                description:
                  "Powerful, practical, easy to use software that levels the playing field for all businesses.",
              },
              {
                icon: Zap,
                title: "Intelligent Solutions",
                description:
                  "Innovative thinking paired with efficient design to produce better decision-making tools.",
              },
              {
                icon: TrendingUp,
                title: "Scalable Growth",
                description:
                  "Adapting to the digital landscape with systems that grow alongside your business success.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#0957D6]/10 transition-all duration-500 group text-center"
              >
                <div className="w-20 h-20 bg-[#0957D6]/10 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 group-hover:bg-[#0957D6] transition-all duration-500">
                  <feature.icon className="w-10 h-10 text-[#0957D6] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bill Till Section */}
      <section className="py-24 bg-[#0A0F1E] relative overflow-hidden">
        {/* Grid Pattern Background */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#0957D6 1.5px, transparent 1.5px), linear-gradient(90deg, #0957D6 1.5px, transparent 1.5px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Decorative Glows */}
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#0957D6]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-[#0957D6]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0957D6]/20 text-blue-300 font-semibold text-sm border border-[#0957D6]/30 mx-auto">
              <Rocket className="w-4 h-4" />
              NEXT GENERATION ERP & POS
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              A New Beginning with{" "}
              <span className="text-[#0957D6]">Bill Till</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative">
                <img
                  src="/device2.png"
                  alt="Bill Till ERP Dashboard"
                  className="w-full h-auto scale-[130%] md:scale-[160%] -translate-x-[40%] md:-translate-x-[50%] origin-left"
                />
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#0957D6]/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#0957D6]/20 rounded-full blur-2xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 space-y-8 lg:pl-12"
            >
              <p className="text-lg text-slate-400 leading-relaxed">
                As part of our mission to support business growth, Ceylon
                Innovation Services (PVT) LTD introduces Bill Till — a modern
                ERP and POS platform designed specifically for the Small and
                Medium Enterprise (SME) sector.
              </p>

              <p className="text-lg text-slate-400 leading-relaxed">
                Bill Till provides businesses with a powerful yet affordable
                system to manage sales, inventory, customers, and operations
                through a streamlined and user-friendly platform.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                {[
                  { icon: BarChart, label: "Sales & Analytics" },
                  { icon: Shield, label: "Inventory Control" },
                  { icon: Users, label: "Customer Relations" },
                  { icon: TrendingUp, label: "Business Growth" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0957D6]/50 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-[#0957D6]" />
                    </div>
                    <span className="text-slate-200 font-semibold">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ceylon Innovation Logo Section */}
      <section className="py-20 border-t border-slate-100">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-8 md:gap-12 group hover:shadow-2xl transition-all duration-500">
              <div className="relative">
                <img
                  src="/CI-logo.png"
                  alt="Ceylon Innovation Services"
                  className="h-20 w-auto group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute -inset-4 bg-[#0957D6]/5 blur-xl rounded-full -z-10" />
              </div>
              <div className="text-center md:text-left">
                <div className="text-sm font-bold text-[#0957D6] uppercase tracking-[0.2em] mb-2">
                  Powered by
                </div>
                <div className="text-3xl font-bold text-slate-900 tracking-tight">
                  Ceylon Innovation Services
                </div>
                <div className="text-lg text-slate-500 font-medium">
                  (PVT) LTD
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
