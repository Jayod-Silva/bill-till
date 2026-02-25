"use client";

import { Pricing } from "@/components/ui/pricing";

const demoPlans = [
  {
    name: "DYNAMIC",
    price: "29",
    yearlyPrice: "24",
    period: "per month",
    features: [
      "Up to 1,000 transactions/month",
      "1 Register",
      "Basic reporting",
      "Email support",
      "Standard integrations",
    ],
    description: "Perfect for small businesses just getting started.",
    buttonText: "Start Free Trial",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "79",
    yearlyPrice: "66",
    period: "per month",
    features: [
      "Unlimited transactions",
      "Up to 5 Registers",
      "Advanced analytics",
      "Priority support",
      "All integrations",
      "Inventory management",
      "Employee management",
      "Customer loyalty",
    ],
    description: "For growing businesses that need more power.",
    buttonText: "Start Free Trial",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "299",
    yearlyPrice: "239",
    period: "per month",
    features: [
      "Unlimited everything",
      "Unlimited registers",
      "Custom analytics",
      "24/7 dedicated support",
      "Custom integrations",
      "Multi-location management",
      "Advanced security",
      "SLA guarantees",
      "On-site training",
    ],
    description: "Custom solutions for large-scale operations.",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
  },
];

function PricingBasic() {
  return (
    <div className="flex justify-center items-center min-h-[800px]">
      <div className="w-full max-w-7xl">
        <Pricing 
          plans={demoPlans}
          title="Simple, Transparent Pricing"
          description="Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support."
        />
      </div>
    </div>
  );
}

export { PricingBasic };
