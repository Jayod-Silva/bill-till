import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "../../translations/LanguageContext";

export const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const testimonials = [
    {
      id: 1,
      quote: t("test_q1"),
      author: "Corey Philips",
      role: t("test_role1"),
      avatar: "/testimonial-avatar.jpg",
      rating: 5,
      i18nQuote: "test_q1",
      i18nRole: "test_role1",
    },
    {
      id: 2,
      quote: t("test_q2"),
      author: "Jessica Martinez",
      role: t("test_role2"),
      avatar: "/testimonial-avatar.jpg",
      rating: 5,
      i18nQuote: "test_q2",
      i18nRole: "test_role2",
    },
    {
      id: 3,
      quote: t("test_q3"),
      author: "Robert Chen",
      role: t("test_role3"),
      avatar: "/testimonial-avatar.jpg",
      rating: 5,
      i18nQuote: "test_q3",
      i18nRole: "test_role3",
    },
  ];

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );

  const handleMouseMove = (event) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center "
        >
          <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight font-poppins text-left text-foreground mb-4">
            <span data-i18n="test_title_main">{t("test_title_main")}</span>
            <br /> <span data-i18n="test_title_sub">
              {t("test_title_sub")}
            </span>{" "}
            <span className="text-primary" data-i18n="test_title_highlight">
              {t("test_title_highlight")}
            </span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image and Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="flex flex-col lg:flex-row items-center justify-center bg-blue-100 rounded-2xl h-[400px] gap-6 mb-12 mt-12 shadow-2xl">
              {/* Main Image */}
              <div className="relative">
                <img
                  src="/test.png"
                  alt="Happy customer"
                  className="w-[350px] h-auto rounded-2x1 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3e%3crect width='600' height='400' fill='%23f8fafc'/%3e%3ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='system-ui' font-size='20' fill='%2364748b'%3eCustomer Testimonial Image%3c/text%3e%3c/svg%3e";
                  }}
                />

                {/* Satisfaction Card Overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute -bottom-6 md:-right-24 -right-10  bg-white rounded-2xl shadow-2xl p-6 border border-gray-100"
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      99%
                    </div>
                    <div
                      className="text-sm font-medium text-gray-600 mb-1"
                      data-i18n="test_satisfaction"
                    >
                      {t("test_satisfaction")}
                    </div>
                    <div
                      className="text-xs text-green-600 font-medium"
                      data-i18n="test_growing"
                    >
                      {t("test_growing")}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-foreground mb-2">
                  99K
                </div>
                <div
                  className="text-sm text-muted-foreground"
                  data-i18n="test_worldwide"
                >
                  {t("test_worldwide")}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-foreground mt-5 mb-2">
                  #2
                </div>
                <div
                  className="text-sm text-muted-foreground"
                  data-i18n="test_banking"
                >
                  {t("test_banking")}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Testimonial Card */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Avatar Navigation */}
            <div className={cn("flex items-center justify-end", "gap-2")}>
              {testimonials.map((testimonial, index) => (
                <div
                  className="-mr-4 relative group last:mr-0"
                  key={testimonial.id}
                  onMouseEnter={() => setHoveredIndex(testimonial.id)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <AnimatePresence mode="popLayout">
                    {hoveredIndex === testimonial.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.6 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 260,
                            damping: 10,
                          },
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.6 }}
                        style={{
                          translateX: translateX,
                          rotate: rotate,
                          whiteSpace: "nowrap",
                        }}
                        className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-foreground z-50 shadow-xl px-4 py-2"
                      >
                        <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
                        <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
                        <div className="font-bold text-background relative z-30 text-base">
                          {testimonial.author}
                        </div>
                        <div
                          className="text-muted-foreground text-xs"
                          data-i18n={testimonial.i18nRole}
                        >
                          {testimonial.role}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button
                    onClick={() => setCurrentIndex(index)}
                    onMouseMove={handleMouseMove}
                    className={cn(
                      "relative object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-background transition duration-500",
                    )}
                  >
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        const initials = testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("");
                        e.target.src = `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3e%3crect width='56' height='56' fill='%23e2e8f0'/%3e%3ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='system-ui' font-size='16' fill='%2364748b'%3e${initials}%3c/text%3e%3c/svg%3e`;
                      }}
                    />
                    {index === currentIndex && (
                      <motion.div
                        layoutId="activeAvatar"
                        className="absolute inset-0 rounded-full bg-primary/20"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Testimonial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-blue-40 to-indigo-50 rounded-3xl p-8 lg:p-10 border border-blue-100 shadow-xl"
              >
                {/* Quote Icon */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Quote className="w-12 h-12 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  className="text-md lg:text-xl text-gray-700 leading-relaxed mb-8"
                  data-i18n={testimonials[currentIndex].i18nQuote}
                >
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].author}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3e%3crect width='48' height='48' fill='%23e2e8f0'/%3e%3ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='system-ui' font-size='14' fill='%2364748b'%3eCP%3c/text%3e%3c/svg%3e";
                    }}
                  />
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonials[currentIndex].author}
                    </div>
                    <div
                      className="text-sm text-muted-foreground"
                      data-i18n={testimonials[currentIndex].i18nRole}
                    >
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
