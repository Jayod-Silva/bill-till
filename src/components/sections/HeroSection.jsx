import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, ChevronRight, ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [email, setEmail] = useState("");

  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[50vh] flex items-center justify-center pt-20 pb-16 overflow-hidden bg-white"
    >
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Blue Curved Bottom Shape */}
        <div className="absolute top-[-20px] left-0 right-0 h-[500px] bg-gradient-to-b from-blue-400/50 to-transparent rounded-b-[100%] blur-2xl transform scale-x-150" />
        
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url("/background1.png")`,
          }}
        />
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-30 animate-scroll-up"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='60' height='60' fill='none' stroke='rgb(59 130 246 / 0.3)' stroke-width='0.5'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e")`,
            animation: 'scrollUp 20s linear infinite',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-1.5 py-1.5 rounded-full border border-gray-400 backdrop-blur-sm mb-7 group cursor-pointer"
        >
          <span className="flex items-center justify-center w-12 h-6 rounded-full bg-primary text-[10px] font-bold text-white">
            NEW
          </span>
          <span className="text-xs text-muted-foreground">
            Bill Till 2.0 is now available
          </span>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-5"
        >
          <span className="block text-black pb-2">
            Future of Commerce
          </span>
          <span className="block text-black">
            In Your Hands
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-md md:text-md text-muted-foreground max-w-2xl mx-auto mb-5 leading-relaxed"
        >
          Transform your business with the POS system designed for modern retail.
          Beautifully simple, powerfully connected.
        </motion.p>

        
        {/* Dashboard Mockup */}
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative max-w-8xl mx-auto pb-20"
        >
          <div
            className="absolute left-1/2 w-[90%] pointer-events-none z-0"
            style={{
              top: "-23%",
              transform: "translateX(-50%)"
            }}
            aria-hidden="true"
          >
            <img
              src="https://i.postimg.cc/Ss6yShGy/glows.png"
              alt=""
              className="w-full h-auto"
              loading="eager"
            />
          </div>
          
          <div className="relative z-10">
            {/* Floating Feature Cards */}
            {/* <motion.div
              initial={{ opacity: 0, x: -100, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="absolute top-16 -left-32 w-[400px] h-32 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl p-4"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start gap-3 h-full">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>

                <div className="flex-1">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">99.9%</span>
                    <span className="block text-sm font-semibold text-gray-800 mb-1">Uptime</span>
                  </motion.div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xs text-gray-600 leading-tight"
                  >
                    Guaranteed reliability with enterprise-grade infrastructure
                  </motion.p>
                </div>
              </div>
            </motion.div> */}

            {/* <motion.div
              initial={{ opacity: 0, x: -100, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="absolute top-52 -left-20 w-64 h-32 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl p-4"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start gap-3 h-full">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                <div className="flex-1">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">24/7</span>
                    <span className="block text-sm font-semibold text-gray-800 mb-1">Support</span>
                  </motion.div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-xs text-gray-600 leading-tight"
                  >
                    Round-the-clock technical support from our expert team
                  </motion.p>
                </div>
              </div>
            </motion.div> */}

            {/* <motion.div
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05, rotateY: -5 }}
              className="absolute top-16 -right-32 w-64 h-32 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl p-4"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start gap-3 h-full">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </motion.div>
                <div className="flex-1">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">SSL</span>
                    <span className="block text-sm font-semibold text-gray-800 mb-1">Security</span>
                  </motion.div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-xs text-gray-600 leading-tight"
                  >
                    Bank-level encryption and security protocols
                  </motion.p>
                </div>
              </div>
            </motion.div> */}

            {/* <motion.div
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotateY: -5 }}
              className="absolute top-52 -right-20 w-64 h-32 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl p-4"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start gap-3 h-full">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                  className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </motion.div>
                <div className="flex-1">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">Fast</span>
                    <span className="block text-sm font-semibold text-gray-800 mb-1">Performance</span>
                  </motion.div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-xs text-gray-600 leading-tight"
                  >
                    Lightning-fast transactions and optimized speed
                  </motion.p>
                </div>
              </div>
            </motion.div> */}
            
            <img
              src="/hero.png"
              alt="Bill Till POS Dashboard"
              className="w-full h-auto rounded-lg"
              loading="eager"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3e%3crect width='800' height='450' fill='%23f8fafc'/%3e%3ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='system-ui' font-size='24' fill='%2364748b'%3eHero Image Placeholder%3c/text%3e%3c/svg%3e";
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}