import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { useLanguage } from "../../translations/LanguageContext";

export const PricingSection = () => {
  const { t } = useLanguage();
  const [isMonthly, setIsMonthly] = useState(true);
  const navigate = useNavigate();
  const switchRef = useRef(null);

  const plans = [
    {
      name: t("price_plan1_name"),
      i18nName: "price_plan1_name",
      price: "4,999",
      yearlyPrice: "3,999",
      period: t("price_per_month"),
      i18nPeriod: "price_per_month",
      features: [
        { label: t("price_plan1_f1"), i18n: "price_plan1_f1" },
        { label: t("price_plan1_f2"), i18n: "price_plan1_f2" },
        { label: t("price_plan1_f3"), i18n: "price_plan1_f3" },
        { label: t("price_plan1_f4"), i18n: "price_plan1_f4" },
        { label: t("price_plan1_f5"), i18n: "price_plan1_f5" },
        { label: t("price_plan1_f6"), i18n: "price_plan1_f6" },
        { label: t("price_plan1_f7"), i18n: "price_plan1_f7" },
        { label: t("price_plan1_f8"), i18n: "price_plan1_f8" },
      ],
      description: t("price_plan1_desc"),
      i18nDesc: "price_plan1_desc",
      buttonText: t("price_start_now"),
      i18nButton: "price_start_now",
      href: "/register",
      isPopular: false,
    },
    {
      name: t("price_plan2_name"),
      i18nName: "price_plan2_name",
      price: "7,999",
      yearlyPrice: "6,399",
      period: t("price_per_month"),
      i18nPeriod: "price_per_month",
      features: [
        { label: t("price_plan2_f1"), i18n: "price_plan2_f1" },
        { label: t("price_plan2_f2"), i18n: "price_plan2_f2" },
        { label: t("price_plan2_f3"), i18n: "price_plan2_f3" },
        { label: t("price_plan2_f4"), i18n: "price_plan2_f4" },
        { label: t("price_plan2_f5"), i18n: "price_plan2_f5" },
        { label: t("price_plan2_f6"), i18n: "price_plan2_f6" },
        { label: t("price_plan2_f7"), i18n: "price_plan2_f7" },
        { label: t("price_plan2_f8"), i18n: "price_plan2_f8" },
      ],
      description: t("price_plan2_desc"),
      i18nDesc: "price_plan2_desc",
      buttonText: t("price_start_now"),
      i18nButton: "price_start_now",
      href: "/register",
      isPopular: true,
    },
    {
      name: t("price_plan3_name"),
      i18nName: "price_plan3_name",
      price: t("price_custom"),
      i18nPrice: "price_custom",
      yearlyPrice: t("price_custom"),
      period: t("price_tailored"),
      i18nPeriod: "price_tailored",
      features: [
        { label: t("price_plan3_f1"), i18n: "price_plan3_f1" },
        { label: t("price_plan3_f2"), i18n: "price_plan3_f2" },
        { label: t("price_plan3_f3"), i18n: "price_plan3_f3" },
        { label: t("price_plan3_f4"), i18n: "price_plan3_f4" },
        { label: t("price_plan3_f5"), i18n: "price_plan3_f5" },
        { label: t("price_plan3_f6"), i18n: "price_plan3_f6" },
        { label: t("price_plan3_f7"), i18n: "price_plan3_f7" },
        { label: t("price_plan3_f8"), i18n: "price_plan3_f8" },
        { label: t("price_plan3_f9"), i18n: "price_plan3_f9" },
      ],
      description: t("price_plan3_desc"),
      i18nDesc: "price_plan3_desc",
      buttonText: t("price_get_in_touch"),
      i18nButton: "price_get_in_touch",
      href: "https://wa.me/94761869668?text=Hi!%20I'm%20interested%20in%20getting%20a%20tailored%20software%20solution%20for%20my%20business.%20Can%20you%20provide%20more%20information%20about%20your%20enterprise%20plans?",
      isPopular: false,
      isContact: true,
    },
  ];

  const handleToggle = (checked) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  const handleCTA = (plan) => {
    if (plan.href.startsWith("mailto:")) {
      window.location.href = plan.href;
    } else if (
      plan.i18nName === "price_plan1_name" ||
      plan.i18nName === "price_plan2_name"
    ) {
      navigate("/payment", {
        state: {
          planName: plan.i18nName === "price_plan1_name" ? "Dynamic" : "Pro",
          isAnnual: !isMonthly,
        },
      });
    } else {
      navigate(plan.href);
    }
  };

  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h2
            className="text-4xl font-bold tracking-tight"
            data-i18n="price_title"
          >
            {t("price_title")}
          </h2>
          <p
            className="text-muted-foreground text-sm md:text-md whitespace-pre-line"
            data-i18n="price_subtitle"
          >
            {t("price_subtitle")}
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-10">
          <label className="relative inline-flex items-center cursor-pointer">
            <Label>
              <Switch
                ref={switchRef}
                checked={!isMonthly}
                onCheckedChange={handleToggle}
                className="relative"
              />
            </Label>
          </label>
          <span className="ml-2 font-semibold">
            <span data-i18n="price_annual">{t("price_annual")}</span>{" "}
            <span className="text-primary" data-i18n="price_save">
              {t("price_save")}
            </span>
          </span>
        </div>

        {/* Pricing Cards - Desktop (with animations) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.i18nName}
              initial={{ y: 50, opacity: 1 }}
              whileInView={{
                y: plan.isPopular ? -20 : 0,
                opacity: 1,
                x: index === 2 ? -30 : index === 0 ? 30 : 0,
                scale: index === 0 || index === 2 ? 0.94 : 1.0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.6,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: 0.4,
                opacity: { duration: 0.5 },
              }}
              className={cn(
                "rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative",
                plan.isPopular ? "border-primary border-2" : "border-border",
                "flex flex-col",
                !plan.isPopular && "mt-5",
                index === 0 || index === 2
                  ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                  : "z-10",
                index === 0 && "origin-right",
                index === 2 && "origin-left",
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                  <Star className="text-primary-foreground h-4 w-4 fill-current" />
                  <span
                    className="text-primary-foreground ml-1 font-sans font-semibold"
                    data-i18n="price_popular"
                  >
                    {t("price_popular")}
                  </span>
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <p
                  className="text-base font-semibold text-muted-foreground"
                  data-i18n={plan.i18nName}
                >
                  {plan.name}
                </p>
                <div className="mt-6 flex items-center justify-center gap-x-2">
                  {plan.isContact ? (
                    <div className="text-center">
                      <span
                        className="text-3xl font-bold tracking-tight text-foreground"
                        data-i18n="price_custom"
                      >
                        {t("price_custom")}
                      </span>
                      <p
                        className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground mt-2"
                        data-i18n="price_tailored"
                      >
                        {t("price_tailored")}
                      </p>
                    </div>
                  ) : (
                    <>
                      <span className="text-5xl font-bold tracking-tight text-foreground">
                        LKR {isMonthly ? plan.price : plan.yearlyPrice}
                      </span>
                      <span
                        className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground"
                        data-i18n={plan.i18nPeriod}
                      >
                        / {plan.period}
                      </span>
                    </>
                  )}
                </div>

                {!plan.isContact && (
                  <p className="text-xs leading-5 mt-5 text-muted-foreground">
                    <span
                      data-i18n={isMonthly ? "price_monthly" : "price_yearly"}
                    >
                      {isMonthly ? t("price_monthly") : t("price_yearly")}
                    </span>
                  </p>
                )}

                <ul className="mt-5 gap-2 flex flex-col">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-left" data-i18n={feature.i18n}>
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <hr className="w-full my-4" />

                <Button
                  variant={plan.isPopular ? "default" : "outline"}
                  className={cn(
                    "w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                    "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground",
                    plan.isPopular
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground",
                  )}
                  onClick={() => handleCTA(plan)}
                  data-i18n={plan.i18nButton}
                >
                  {plan.buttonText}
                </Button>
                <p
                  className="mt-6 text-xs leading-5 text-muted-foreground"
                  data-i18n={plan.i18nDesc}
                >
                  {plan.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing Cards - Mobile (no animations) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
          {plans.map((plan, index) => (
            <div
              key={plan.i18nName}
              className={cn(
                "rounded-2xl border-[1px] p-6 bg-background text-center flex flex-col relative w-full max-w-full overflow-hidden",
                plan.isPopular ? "border-primary border-2" : "border-border",
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                  <Star className="text-primary-foreground h-4 w-4 fill-current" />
                  <span
                    className="text-primary-foreground ml-1 font-sans font-semibold"
                    data-i18n="price_popular"
                  >
                    {t("price_popular")}
                  </span>
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <p
                  className="text-base font-semibold text-muted-foreground"
                  data-i18n={plan.i18nName}
                >
                  {plan.name}
                </p>
                <div className="mt-6 flex items-center justify-center gap-x-2">
                  {plan.isContact ? (
                    <div className="text-center">
                      <span
                        className="text-3xl font-bold tracking-tight text-foreground"
                        data-i18n="price_custom"
                      >
                        {t("price_custom")}
                      </span>
                      <p
                        className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground mt-2"
                        data-i18n="price_tailored"
                      >
                        {t("price_tailored")}
                      </p>
                    </div>
                  ) : (
                    <>
                      <span className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        LKR {isMonthly ? plan.price : plan.yearlyPrice}
                      </span>
                      <span
                        className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground"
                        data-i18n={plan.i18nPeriod}
                      >
                        / {plan.period}
                      </span>
                    </>
                  )}
                </div>

                {!plan.isContact && (
                  <p className="text-xs leading-5 text-muted-foreground">
                    <span
                      data-i18n={isMonthly ? "price_monthly" : "price_yearly"}
                    >
                      {isMonthly ? t("price_monthly") : t("price_yearly")}
                    </span>
                  </p>
                )}

                <ul className="mt-5 gap-2 flex flex-col">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-left" data-i18n={feature.i18n}>
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <hr className="w-full my-4" />

                <Button
                  variant={plan.isPopular ? "default" : "outline"}
                  className={cn(
                    "w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                    "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground",
                    plan.isPopular
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground",
                  )}
                  onClick={() => handleCTA(plan)}
                  data-i18n={plan.i18nButton}
                >
                  {plan.buttonText}
                </Button>
                <p
                  className="mt-6 text-xs leading-5 text-muted-foreground"
                  data-i18n={plan.i18nDesc}
                >
                  {plan.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-12"
          data-i18n="price_trust_note"
        >
          {t("price_trust_note")}
        </motion.p>
      </div>
    </section>
  );
};
