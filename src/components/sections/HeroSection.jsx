import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight, Play } from 'lucide-react';

export const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ── Parallax transforms (reverted to original logic) ──
  const y1 = useTransform(scrollY, [0, 800], [0, isMobile ? 100 : 300]);
  const y2 = useTransform(scrollY, [0, 800], [0, isMobile ? 50 : 150]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Parallax background image layer ── */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("/background1.png")` }}
        />

        {/* Light mode overlay — fades image to white at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white z-10" />

        {/* Soft top vignette */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/60 to-transparent z-10" />

        {/* Subtle primary glow blob */}
        <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-400/10 blur-[120px] z-10" />
      </motion.div>

      {/* ── Hero content ── */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-7xl mx-auto mt-[150px] md:mt-[500px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="inline-flex items-center gap-2 px-1.5 py-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm mb-7 group cursor-pointer hover:border-blue-200 transition-colors duration-200"
        >
          <span className="flex items-center justify-center w-12 h-6 rounded-full bg-blue-500 text-[10px] font-bold text-white tracking-wide">
            NEW
          </span>
          <span className="text-xs text-slate-600 font-medium pr-1">
            Bill Till 2.0 is now available
          </span>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.06] mb-6 text-slate-900"
        >
          Future of Commerce
          <br />
          <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            In Your Hands
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.4, 0, 0.2, 1] }}
          className="text-base md:text-lg text-slate-500 max-w-xl mx-auto mb-9 leading-relaxed"
        >
          Transform your business with the POS system designed for modern retail.
          Beautifully simple, powerfully connected.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-16"
        >
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </a>

          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 text-sm font-semibold shadow-sm hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
              <Play className="w-3 h-3 text-blue-500 ml-0.5" />
            </div>
            Watch demo
          </button>
        </motion.div>

        {/* ── Dashboard mockup — second parallax layer ── */}
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-5xl mx-auto pb-20"
        >
          {/* Glow behind the image */}
          <div
            className="absolute left-1/2 w-[90%] pointer-events-none z-0"
            style={{ top: "-23%", transform: "translateX(-50%)" }}
            aria-hidden="true"
          >
            <img
              src="https://i.postimg.cc/Ss6yShGy/glows.png"
              alt=""
              className="w-full h-auto"
              loading="eager"
            />
          </div>

          {/* Dashboard screenshot */}
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_32px_80px_-12px_rgba(59,130,246,0.18),0_8px_32px_-4px_rgba(0,0,0,0.1)] border border-slate-100">
            <img
              src="/hero.png"
              alt="Bill Till POS Dashboard"
              className="w-full h-auto block"
              loading="eager"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3e%3crect width='800' height='450' fill='%23f8fafc'/%3e%3ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='system-ui' font-size='24' fill='%2364748b'%3eDashboard Preview%3c/text%3e%3c/svg%3e";
              }}
            />

            {/* Subtle bottom fade on the image */}
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};