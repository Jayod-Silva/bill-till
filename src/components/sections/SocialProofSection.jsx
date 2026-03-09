import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const logos = [
  { name: "Visa", src: "/visa.png", width: 90 },
  { name: "Master", src: "/master.svg", width: 60 },
  { name: "KOKO", src: "/koko.png", width: 100 },
];

const stats = [
  { value: "1K+", label: "Active Businesses", target: 1, suffix: "K+" },
  { value: "4.9★", label: "Customer Rating", target: 4.9, suffix: " ★" },
  { value: "99.9%", label: "Uptime Guarantee", target: 99.9, suffix: "%" },
  { value: "24/7", label: "Customer Support", target: 24, suffix: "/7" },
];

const CountingNumber = ({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}) => {
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
    // For whole numbers, don't show decimal places
    if (num >= 1 && num % 1 === 0) {
      return Math.floor(num).toString();
    }
    // For numbers less than 1 or with decimals, show at most 1 decimal place
    if (num < 1) {
      return num.toFixed(1);
    }
    return num.toFixed(1);
  };

  return (
    <span ref={ref}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

export const SocialProofSection = () => {
  return (
    <section className="py-10 md:py-16 bg-muted/30 border-b border-border">
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
            Trusted by leading businesses and integrated with top payment
            providers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-20">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className=" opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-15 w-auto object-contain"
                  style={{ maxWidth: logo.width }}
                />
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
              <div className="text-3xl lg:text-4xl font-bold text-[#0957D6] mb-1">
                <CountingNumber
                  target={stat.target}
                  suffix={stat.suffix}
                  prefix={stat.prefix || ""}
                  duration={4000}
                />
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
