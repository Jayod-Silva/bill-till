import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { UtensilsCrossed, ShoppingCart, Shirt, Wine, Cpu, Wrench, ArrowRight, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const industries = [
  {
    icon: UtensilsCrossed,
    name: 'Restaurants',
    description: 'Complete POS solution for restaurants with table management, kitchen display systems, and split billing capabilities.',
    image: '/Promo6.png',
    features: ['Table Management', 'Kitchen Display', 'Split Billing', 'Menu Management'],
    color: 'from-orange-400 to-red-500',
    bgPattern: 'restaurant',
    stats: { users: '50K+', satisfaction: '98%', growth: '+25%' }
  },
  {
    icon: ShoppingCart,
    name: 'Supermarkets',
    description: 'Comprehensive supermarket management with inventory tracking, barcode scanning, and customer loyalty programs.',
    image: '/Promo5.png',
    features: ['Inventory Tracking', 'Barcode Support', 'Loyalty Programs', 'Scale Integration'],
    color: 'from-green-400 to-emerald-500',
    bgPattern: 'supermarket',
    stats: { users: '120K+', satisfaction: '96%', growth: '+32%' }
  },
  {
    icon: Shirt,
    name: 'Clothing Shops',
    description: 'Specialized POS for fashion retail with size tracking, seasonal inventory management, and customer preferences.',
    image: '/Promo7.png',
    features: ['Size & Color Tracking', 'Seasonal Inventory', 'Customer Profiles', 'Style Recommendations'],
    color: 'from-purple-400 to-pink-500',
    bgPattern: 'fashion',
    stats: { users: '35K+', satisfaction: '97%', growth: '+28%' }
  },
  {
    icon: Wine,
    name: 'Wine Stores',
    description: 'Tailored solution for wine shops with vintage tracking, age verification, and tasting event management.',
    image: '/Promo 4.png',
    features: ['Vintage Tracking', 'Age Verification', 'Tasting Events', 'Wine Club Management'],
    color: 'from-amber-400 to-orange-500',
    bgPattern: 'wine',
    stats: { users: '15K+', satisfaction: '99%', growth: '+18%' }
  },
  {
    icon: Cpu,
    name: 'Computer Shops',
    description: 'Advanced POS for computer retailers with warranty tracking, service management, and technical support integration.',
    image: '/Promo 3.png',
    features: ['Warranty Tracking', 'Service Management', 'Technical Support', 'Build Configuration'],
    color: 'from-blue-400 to-indigo-500',
    bgPattern: 'tech',
    stats: { users: '25K+', satisfaction: '95%', growth: '+22%' }
  },
  {
    icon: Wrench,
    name: 'Hardware Shops',
    description: 'Robust POS for hardware stores with bulk pricing, project tracking, and supplier management.',
    image: '/Promo 1.png',
    features: ['Bulk Pricing', 'Project Tracking', 'Supplier Management', 'Tool Rental'],
    color: 'from-gray-600 to-slate-700',
    bgPattern: 'hardware',
    stats: { users: '40K+', satisfaction: '94%', growth: '+20%' }
  },
];

const FloatingIcon = ({ icon: Icon, delay, duration }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [-20, 20],
        rotate: [-10, 10],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Icon className="w-4 h-4 text-primary/30" />
    </motion.div>
  );
};

const GlowingOrb = ({ position, delay }) => {
  return (
    <motion.div
      className={`absolute w-32 h-32 rounded-full ${position} opacity-20`}
      style={{
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)',
      }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 4,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const StatCard = ({ icon: Icon, value, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="text-xl font-bold text-foreground">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </div>
    </motion.div>
  );
};

export const IndustriesSection = () => {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section id="industries" className="py-24 lg:pt-32 lg:pb-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Icons */}
        {Array.from({ length: 8 }, (_, i) => (
          <FloatingIcon
            key={i}
            icon={industries[i % industries.length].icon}
            delay={i * 0.5}
            duration={3 + i * 0.5}
          />
        ))}
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Industry Solutions</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Built for every{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">industry</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Tailored solutions that transform businesses across all sectors. 
            Experience the power of specialized POS technology designed for your unique needs.
          </motion.p>
        </motion.div>

        {/* Zigzag Industry Items */}
        <div className="space-y-32 lg:space-y-48">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Connecting Line */}
              <motion.div
                className="hidden lg:block absolute top-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                style={{
                  left: index % 2 === 1 ? 'auto' : '0',
                  right: index % 2 === 1 ? '0' : 'auto',
                  width: '60%',
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              />

              {/* Image Section */}
              <motion.div
                className="flex-1 w-full relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-20 mix-blend-multiply`} />
                  
                  {/* Image */}
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating Icon Badge */}
                  <motion.div
                    className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-lg shadow-xl flex items-center justify-center"
                    animate={{
                      y: hoveredIndex === index ? [-5, 5] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: hoveredIndex === index ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <industry.icon className="w-8 h-8 text-primary" />
                  </motion.div>

                  {/* Industry Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                    <h3 className="text-3xl font-bold text-white mb-2">{industry.name}</h3>
                    <div className="flex gap-2">
                      {industry.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                  <StatCard icon={TrendingUp} value={industry.stats.growth} label="Growth" delay={0.1} />
                  <StatCard icon={Shield} value={industry.stats.satisfaction} label="Satisfaction" delay={0.2} />
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                className="flex-1 w-full space-y-6"
                initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
              >
                <div className="space-y-4">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${industry.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <industry.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                        {industry.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">{industry.stats.users} Active Users</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-3">
                    {industry.features.map((feature, featureIndex) => (
                      <motion.span
                        key={feature}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.1 + 0.5 }}
                        className={`px-4 py-2 text-sm font-medium bg-gradient-to-r ${industry.color} text-white rounded-full shadow-lg`}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};