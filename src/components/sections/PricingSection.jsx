import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

const plans = [
  {
    name: "Dynamic",
    price: "4,999",
    yearlyPrice: "3,999",
    period: "per month",
    features: [
      "Item Registry",
      "⁠Customer Registry with Loyalty Scheme",
      "⁠POS",
      "GRN (Basic)",
      "Debtor Management (Basic)",
      "Creditor Management (Basic)",
      "Stock and Inventory (Basic)",
      "For Hospitality Only(KOT/BOT) Management",
    ],
    description: "Perfect for small businesses just getting started.",
    buttonText: "Start Now",
    href: "/register",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "7,999",
    yearlyPrice: "6,399",
    period: "per month",
    features: [
      "POS with Multi Terminal Connectivity",
      "⁠Real-time Sales Dashboard",
      "24x7 on call support",
      "GRN (Advance)",
      "Debtor Management (advance)",
      "Creditor Management (Advance)",
      "Stock and Inventory (Advance)",
      "⁠Production Module(For Hospitality Only)",
    ],
    description: "For growing businesses that need more power.",
    buttonText: "Start Now",
    href: "/register",
    isPopular: true,
  },
  {
    name: "Contact Our Team",
    price: "Custom",
    yearlyPrice: "Custom",
    period: "tailored",
    features: [
      "Custom solutions for enterprise needs",
      "Dedicated account manager",
      "Custom integrations",
      "Priority 24/7 support",
      "Multi-location management",
      "Advanced security features",
      "Custom reporting",
      "White-label options",
      "API access and developer support",
    ],
    description: "Get a personalized solution for your business.",
    buttonText: "Get in Touch",
    href: "https://wa.me/94761869668?text=Hi!%20I'm%20interested%20in%20getting%20a%20tailored%20software%20solution%20for%20my%20business.%20Can%20you%20provide%20more%20information%20about%20your%20enterprise%20plans?",
    isPopular: false,
    isContact: true,
  },
];

export const PricingSection = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const navigate = useNavigate();
  const switchRef = useRef(null);

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
    } else if (plan.name === "Dynamic" || plan.name === "Pro") {
      navigate("/payment", {
        state: { planName: plan.name, isAnnual: !isMonthly },
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
          <h2 className="text-4xl font-bold tracking-tight ">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-sm md:text-md whitespace-pre-line">
            Choose the plan that works for you All plans include access to our
            platform, lead generation tools, and dedicated support.
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
            Annual billing <span className="text-primary">(Save 20%)</span>
          </span>
        </div>

        {/* Pricing Cards - Desktop (with animations) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
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
                  <span className="text-primary-foreground ml-1 font-sans font-semibold">
                    Popular
                  </span>
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <p className="text-base font-semibold text-muted-foreground">
                  {plan.name}
                </p>
                <div className="mt-6 flex items-center justify-center gap-x-2">
                  {plan.isContact ? (
                    <div className="text-center">
                      <span className="text-3xl font-bold tracking-tight text-foreground">
                        Custom
                      </span>
                      <p className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground mt-2">
                        tailored solution
                      </p>
                    </div>
                  ) : (
                    <>
                      <span className="text-5xl font-bold tracking-tight text-foreground">
                        LKR {isMonthly ? plan.price : plan.yearlyPrice}
                      </span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                        / {plan.period}
                      </span>
                    </>
                  )}
                </div>

                {!plan.isContact && (
                  <p className="text-xs leading-5 mt-5 text-muted-foreground">
                    {isMonthly ? "billed monthly" : "billed annually"}
                  </p>
                )}

                <ul className="mt-5 gap-2 flex flex-col">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-left">{feature}</span>
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
                >
                  {plan.buttonText}
                </Button>
                <p className="mt-6 text-xs leading-5 text-muted-foreground">
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
              key={plan.name}
              className={cn(
                "rounded-2xl border-[1px] p-6 bg-background text-center flex flex-col relative w-full max-w-full overflow-hidden",
                plan.isPopular ? "border-primary border-2" : "border-border",
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                  <Star className="text-primary-foreground h-4 w-4 fill-current" />
                  <span className="text-primary-foreground ml-1 font-sans font-semibold">
                    Popular
                  </span>
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <p className="text-base font-semibold text-muted-foreground">
                  {plan.name}
                </p>
                <div className="mt-6 flex items-center justify-center gap-x-2">
                  {plan.isContact ? (
                    <div className="text-center">
                      <span className="text-3xl font-bold tracking-tight text-foreground">
                        Custom
                      </span>
                      <p className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground mt-2">
                        tailored solution
                      </p>
                    </div>
                  ) : (
                    <>
                      <span className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        LKR {isMonthly ? plan.price : plan.yearlyPrice}
                      </span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                        / {plan.period}
                      </span>
                    </>
                  )}
                </div>

                {!plan.isContact && (
                  <p className="text-xs leading-5 text-muted-foreground">
                    {isMonthly ? "billed monthly" : "billed annually"}
                  </p>
                )}

                <ul className="mt-5 gap-2 flex flex-col">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-left">{feature}</span>
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
                >
                  {plan.buttonText}
                </Button>
                <p className="mt-6 text-xs leading-5 text-muted-foreground">
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
        >
          Switch to BillTill for free. No system switching fees.
        </motion.p>
      </div>
    </section>
  );
};
