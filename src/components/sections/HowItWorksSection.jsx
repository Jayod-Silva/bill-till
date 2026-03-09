import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Settings, Rocket, TrendingUp } from "lucide-react";
import { useLanguage } from "../../translations/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export const HowItWorksSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  const steps = [
    {
      number: "01",
      icon: Download,
      title: t("how_step1_title"),
      description: t("how_step1_desc"),
      i18nTitle: "how_step1_title",
      i18nDesc: "how_step1_desc",
    },
    {
      number: "02",
      icon: Settings,
      title: t("how_step2_title"),
      description: t("how_step2_desc"),
      i18nTitle: "how_step2_title",
      i18nDesc: "how_step2_desc",
    },
    {
      number: "03",
      icon: Rocket,
      title: t("how_step3_title"),
      description: t("how_step3_desc"),
      i18nTitle: "how_step3_title",
      i18nDesc: "how_step3_desc",
    },
    {
      number: "04",
      icon: TrendingUp,
      title: t("how_step4_title"),
      description: t("how_step4_desc"),
      i18nTitle: "how_step4_title",
      i18nDesc: "how_step4_desc",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each step as it comes into view
      steps.forEach((_, index) => {
        gsap.fromTo(
          `.step-${index}`,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: `.step-${index}`,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 overflow-hidden relative"
    >
      {/* Background Pattern with Radial Fade */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='60' height='60' fill='none' stroke='rgb(37 99 235 / 0.4)' stroke-width='0.5'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e")`,
          maskImage:
            "radial-gradient(circle at center, black 10%, transparent 100%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-5xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span data-i18n="how_title">
              {t("how_title").split("4 simple steps")[0]}
            </span>
            <span className="text-primary" data-i18n="how_title">
              {t("how_title").includes("4 simple steps")
                ? "4 simple steps"
                : ""}
            </span>
            <span data-i18n="how_title">
              {t("how_title").split("4 simple steps")[1] ||
                (t("how_title").includes("4 simple steps")
                  ? ""
                  : t("how_title"))}
            </span>
          </h2>
          <p
            className="text-base lg:text-lg text-muted-foreground"
            data-i18n="how_subtitle"
          >
            {t("how_subtitle")}
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Progress Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
            <motion.div
              ref={lineRef}
              className="w-full bg-primary origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`step-${index} lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center ${
                  index !== steps.length - 1 ? "lg:pb-24" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div
                    className={`${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"} text-center lg:text-left`}
                  >
                    <span className="text-sm font-medium text-primary mb-2 block">
                      <span data-i18n="how_step">{t("how_step")}</span>{" "}
                      {step.number}
                    </span>
                    <h3
                      className="text-2xl font-bold text-foreground mb-3"
                      data-i18n={step.i18nTitle}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-muted-foreground leading-relaxed"
                      data-i18n={step.i18nDesc}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Icon/Visual */}
                <div
                  className={`mt-6 lg:mt-0 ${
                    index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div
                    className={`flex ${index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"} justify-center`}
                  >
                    <div className="relative">
                      {/* Circle with Icon */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-accent border border-border flex items-center justify-center shadow-card"
                      >
                        <step.icon className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
                      </motion.div>
                      {/* Number Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
