import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const logos = [
  { name: 'Master', width: 80 },
  { name: 'Visa', width: 90 },
  { name: 'KOKO', width: 100 },,
];

const stats = [
  { value: '50K+', label: 'Active Businesses', target: 50, suffix: 'K+' },
  { value: '$2.5B+', label: 'Transactions Processed', target: 2.5, suffix: 'B+', prefix: '$' },
  { value: '99.9%', label: 'Uptime Guarantee', target: 99.9, suffix: '%' },
  { value: '24/7', label: 'Customer Support', target: 24, suffix: '/7' },
];

const CountingNumber = ({ target, suffix = '', prefix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const startTime = Date.now();
      const endTime = startTime + duration;

      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const currentCount = target * easeOutQuart;
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    }
  }, [isInView, target, duration]);

  const formatNumber = (num) => {
    if (num % 1 === 0) {
      return Math.floor(num).toString();
    }
    return num.toFixed(1);
  };

  return (
    <span ref={ref}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export const SocialProofSection = () => {
  return (
    <section className="py-16 bg-muted/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground mb-8">
            Trusted by leading businesses and integrated with top payment providers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <div 
                  className="h-8 flex items-center justify-center text-foreground font-semibold text-[16px]"
                  style={{ width: logo.width }}
                >
                  {logo.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">
                <CountingNumber 
                  target={stat.target} 
                  suffix={stat.suffix} 
                  prefix={stat.prefix || ''}
                  duration={2000}
                />
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};