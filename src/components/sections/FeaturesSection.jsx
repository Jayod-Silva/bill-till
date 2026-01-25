
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  CreditCard,
  BarChart3,
  Users,
  Package,
  Bell,
  Globe,
  Smartphone,
  RefreshCw,
  Lock,
  Palette,
  Layers,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: CreditCard,
    title: 'Multi-Payment Support',
    description: 'Accept cards, mobile payments, cash, and custom payment methods with ease.',
    category: 'Payments',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Live dashboards showing sales, trends, and performance metrics at a glance.',
    category: 'Analytics',
  },
  {
    icon: Users,
    title: 'Staff Management',
    description: 'Track hours, manage permissions, and monitor employee performance.',
    category: 'Management',
  },
  {
    icon: Package,
    title: 'Smart Inventory',
    description: 'Automatic stock alerts, supplier management, and multi-location tracking.',
    category: 'Inventory',
  },
  {
    icon: Bell,
    title: 'Instant Notifications',
    description: 'Real-time alerts for low stock, large sales, and important business events.',
    category: 'Alerts',
  },
  {
    icon: Globe,
    title: 'Multi-Location',
    description: 'Manage all your stores from one dashboard with centralized reporting.',
    category: 'Scale',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Full functionality on any device - tablet, phone, or desktop terminal.',
    category: 'Mobile',
  },
  {
    icon: RefreshCw,
    title: 'Offline Mode',
    description: 'Keep selling even without internet. Syncs automatically when back online.',
    category: 'Reliability',
  },
  
];

export const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section id="features" ref={sectionRef} className="py-24 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything you need to{' '}
            <span className="text-primary">run your business</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground">
            Powerful features designed to streamline operations, increase sales, 
            and provide insights that drive growth.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              style={{ y: index % 2 === 0 ? y1 : y2 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-card transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300\">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Category Tag */}
                <div className="mt-4">
                  <span className="text-xs font-medium text-primary/70">
                    {feature.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
        </motion.div>
      </div>
    </section>
  );
};
