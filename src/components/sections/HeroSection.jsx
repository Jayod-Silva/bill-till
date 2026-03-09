import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Play, Zap } from "lucide-react";

export const HeroSection = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white"
      style={{ minHeight: "80vh" }}
    >
      {/* Static background image layer */}
      <div className="absolute inset-0 w-full h-[102vh] ">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-2xl bg-no-repeat md:hidden"
          style={{
            backgroundImage: `url("/background.png")`,
            top: "8px",
            left: "8px",
            right: "8px",
          }}
        />

        {/* Desktop background override */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-2xl bg-no-repeat hidden md:block"
          style={{
            backgroundImage: `url("/background.png")`,
            top: "15px",
            left: "15px",
            right: "15px",
          }}
        />

        {/* Light mode overlay — fades image to white at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white z-10" />

        {/* Subtle primary glow blob */}
        {/* <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#0957D6] blur-[120px] z-10" /> */}
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-7xl mx-auto mt-32 md:mt-[180px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="inline-flex items-center gap-2 px-1.5 py-1 rounded-full border border-slate-200 bg-white backdrop-blur-sm shadow-sm mb-7 group cursor-pointer hover:border-blue-200 transition-colors duration-200"
        >
          <span className="flex items-center justify-center w-10 h-6 rounded-full bg-[#0957D6] text-white">
            <Zap className="w-3 h-3 fill-white" />
          </span>
          <span className="text-xs text-slate-600 font-medium pr-1">
            Lightning Fast Setup
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
          className="text-[42px] md:text-7xl lg:text-[4rem] font-semibold tracking-tight mb-6  "
        >
          Track, Analyze, and Grow Your <br />
          <span className="bg-[#0957D6] bg-clip-text text-transparent">
            Business Easy
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.4, 0, 0.2, 1] }}
          className="text-sm md:text-md text-slate-500 max-w-md mx-auto mb-3 leading-relaxed"
        >
          Simple to use, powerful to help your business grow, and priced
          affordably for everyone in retail
        </motion.p>

        {/* CTA Buttons */}
        <div className="mt-2 md:mt-10 flex items-center justify-center gap-3 text-sm mb-20">
          <button className="px-6 py-3 rounded-full bg-[#0957D6] text-white font-medium shadow-md hover:bg-black transition">
            Demo
          </button>

          <button
            onClick={() => {
              const pricingSection = document.getElementById("pricing");
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-6 py-3 rounded-full bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            View Pricing
          </button>
        </div>

        {/* Dashboard screenshot */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-5 overflow-hidden max-w-7xl mx-auto -mt-[45px] md:-mt-6 lg:w-[150%] md:w-[120%]  w-[100%]"
        >
          <img
            src="/device1.png"
            alt="Bill Till Dashboard"
            className="w-full h-full block object-contain"
            loading="eager"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3e%3crect width='800' height='450' fill='%23f8fafc'/%3e%3ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='system-ui' font-size='24' fill='%2364748b'%3eDashboard Preview%3c/text%3e%3c/svg%3e";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/10 to-white z-10" />
        </motion.div>
      </div>
    </section>
  );
};
