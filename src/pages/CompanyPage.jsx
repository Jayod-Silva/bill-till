import React from "react";
import { motion } from "framer-motion";
import { Building2, Rocket, Timer, ArrowLeft } from "lucide-react";
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

            <section className="pt-40 pb-20 relative overflow-hidden">
                <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0957D6]/10 text-[#0957D6] font-medium text-sm mb-6 border border-[#0957D6]/20"
                        >
                            <Rocket className="w-4 h-4" />
                            <span>Coming Soon</span>
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8">
                            We're shaping the <br />
                            <span className="text-[#0957D6]">future of retail.</span>
                        </h1>

                        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl relative overflow-hidden mb-12">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0957D6]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

                            <div className="flex flex-col items-center gap-6 relative z-10">
                                <div className="w-20 h-20 bg-[#0957D6]/10 rounded-2xl flex items-center justify-center">
                                    <Building2 className="w-10 h-10 text-[#0957D6]" />
                                </div>

                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Company Page</h2>
                                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                                    We're currently crafting our story. Stay tuned to learn about our mission,
                                    our team, and how we're empowering businesses across Sri Lanka and beyond.
                                </p>

                                <div className="flex items-center gap-4 py-4">
                                    <div className="flex items-center gap-2 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-400">
                                        <Timer className="w-5 h-5" />
                                        <span>Under Construction</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center gap-4 mt-4">
                                    <button
                                        onClick={() => navigate("/")}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#0957D6] text-white rounded-2xl font-bold shadow-lg shadow-[#0957D6]/20 hover:bg-black transition-all transform active:scale-95"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                        Back to Home
                                    </button>
                                    <button
                                        onClick={() => navigate("/contact")}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm"
                                    >
                                        Contact Us
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            {[
                                { label: "Founded", value: "2024" },
                                { label: "Team Members", value: "10+" },
                                { label: "Location", value: "Negombo" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/50">
                                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">{stat.label}</p>
                                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
