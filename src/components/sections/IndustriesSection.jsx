
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Store, UtensilsCrossed, Building2, Heart, Scissors, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const industries = [
  {
    icon: Store,
    name: 'Retail',
    description: 'Inventory management, barcode scanning, and customer loyalty programs designed for retail excellence.',
    image: 'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=600&auto=format&fit=crop&q=80',
    features: ['Inventory Tracking', 'Barcode Support', 'Loyalty Programs'],
  },
  {
    icon: UtensilsCrossed,
    name: 'Restaurant',
    description: 'Table management, kitchen display systems, and split billing for seamless dining experiences.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
    features: ['Table Management', 'Kitchen Display', 'Split Billing'],
  },
  {
    icon: Building2,
    name: 'Hospitality',
    description: 'Room service, booking integration, and guest management for hotels and resorts.',
    image: 'https://images.unsplash.com/photo-1558959357-685f9c7ace7b?w=600&auto=format&fit=crop&q=80',
    features: ['Room Service', 'Booking Sync', 'Guest Profiles'],
  },
  {
    icon: Heart,
    name: 'Healthcare',
    description: 'HIPAA compliant payments, appointment scheduling, and patient record integration.',
    image: 'https://images.pexels.com/photos/5619462/pexels-photo-5619462.jpeg?w=600&auto=format&fit=crop',
    features: ['HIPAA Compliant', 'Scheduling', 'Patient Records'],
  },
  {
    icon: Scissors,
    name: 'Services',
    description: 'Appointment booking, service packages, and tip management for salons and spas.',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&auto=format&fit=crop&q=80',
    features: ['Appointments', 'Service Packages', 'Tip Management'],
  },
];

export const IndustriesSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="industries" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Built for every{' '}
              <span className="text-primary">industry</span>
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground">
              Tailored solutions for your specific business needs. From retail to healthcare, 
              we've got you covered.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative overflow-hidden">
        <motion.div 
          className="flex gap-6 px-4 sm:px-6 lg:px-8 pb-4 overflow-x-auto scrollbar-hide"
          style={{ x }}
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex-shrink-0 w-80 lg:w-96"
            >
              <div className="group h-full bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-background/90 backdrop-blur flex items-center justify-center">
                      <industry.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-semibold text-background">{industry.name}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {industry.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {industry.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Hint */}
        <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-muted/30 to-transparent pointer-events-none lg:hidden" />
      </div>
    </section>
  );
};