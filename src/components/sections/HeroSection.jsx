import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, ChevronRight, ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [email, setEmail] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Enhanced parallax effects with mobile detection
  const y1 = useTransform(scrollY, [0, 800], [0, isMobile ? 100 : 300]);
  const y2 = useTransform(scrollY, [0, 800], [0, isMobile ? 50 : 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 w-full h-full z-5"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-background z-10" />
        
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{
            backgroundImage: `url("/background1.png")`,
          }}
        />
        
        {/* Blue Curved Bottom Shape */}
        <div className="absolute top-[-20px] left-0 right-0 h-[500px] bg-gradient-to-b from-blue-400/50 to-transparent rounded-b-[100%] blur-2xl transform scale-x-150" />
        
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mt-[150px] md:mt-[500px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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

        
        {/* Dashboard Mockup with Enhanced Parallax */}
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
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