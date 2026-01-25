import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { FreeSwitchSection } from './FreeSwitchSection';

const plans = [
  {
    name: 'Dynamic',
    description: 'Perfect for small businesses just getting started.',
    monthlyPrice: 29,
    yearlyPrice: 24,
    features: [
      'Up to 1,000 transactions/month',
      '1 Register',
      'Basic reporting',
      'Email support',
      'Standard integrations',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For growing businesses that need more power.',
    monthlyPrice: 79,
    yearlyPrice: 66,
    features: [
      'Unlimited transactions',
      'Up to 5 Registers',
      'Advanced analytics',
      'Priority support',
      'All integrations',
      'Inventory management',
      'Employee management',
      'Customer loyalty',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Custom solutions for large-scale operations.',
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      'Unlimited everything',
      'Unlimited registers',
      'Custom analytics',
      '24/7 dedicated support',
      'Custom integrations',
      'Multi-location management',
      'Advanced security',
      'SLA guarantees',
      'On-site training',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <>
      <style>{`
        @keyframes shine {
          0% { 
            background-position: 0% 0%;
            background-size: 100% 100%;
          }
          25% { 
            background-position: 100% 0%;
            background-size: 100% 100%;
          }
          50% { 
            background-position: 100% 100%;
            background-size: 100% 100%;
          }
          75% { 
            background-position: 0% 100%;
            background-size: 100% 100%;
          }
          100% { 
            background-position: 0% 0%;
            background-size: 100% 100%;
          }
        }
        .pro-plan-border {
          position: relative;
          background: linear-gradient(white, white) padding-box, 
                      linear-gradient(45deg, 
                        rgba(59, 130, 246, 0.1) 0%,
                        rgba(59, 130, 246, 1) 10%,
                        rgba(96, 165, 250, 1) 20%,
                        rgba(59, 130, 246, 0.1) 30%,
                        rgba(59, 130, 246, 0.1) 100%
                      ) border-box;
          border: 3px solid transparent;
          background-clip: padding-box, border-box;
          background-size: 300% 300%;
          animation: shine 4s linear infinite;
        }
        .pro-plan-border::before {
          content: '';
          position: absolute;
          inset: -3px;
          padding: 3px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(59, 130, 246, 0.3) 5%,
            rgba(96, 165, 250, 0.8) 10%,
            rgba(59, 130, 246, 1) 15%,
            rgba(96, 165, 250, 0.8) 20%,
            rgba(59, 130, 246, 0.3) 25%,
            transparent 30%,
            transparent 100%
          );
          border-radius: 1rem;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          animation: shine 3s linear infinite;
          background-size: 200% 100%;
        }
      `}</style>
      <section id="pricing" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-base lg:text-md text-muted-foreground mb-8">
              No hidden fees. No surprises. Choose the plan that fits your business.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <span className={`text-sm flex items-center gap-2 ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Yearly
                <span className="px-2 py-0.5 text-xs font-medium bg-success/10 text-success rounded-full">
                  Save 20%
                </span>
              </span>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15), 0 10px 15px -3px rgba(59, 130, 246, 0.08)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                className={`relative flex flex-col rounded-2xl border transition-all duration-400 ease-out cursor-pointer ${plan.popular ? 'border-transparent bg-card shadow-lg shadow-primary/5 pro-plan-border' : 'border-border bg-card hover:shadow-xl'}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-md">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8 flex-1">
                  {/* Plan Name */}
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-5 pt-0 mt-auto">
                  <Button
                    variant={plan.popular ? 'default' : 'outline'}
                    className="w-full px-10 py-2"
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </motion.div>
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

      {/* Free Switch Section */}
      <FreeSwitchSection />
    </>
  );
};