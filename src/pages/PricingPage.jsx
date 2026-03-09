import React, { useEffect } from "react";
import { PricingSection } from "@/components/sections/PricingSection";
import { Footer } from "@/components/layout/Footer";

export default function PricingPage() {
    // Ensure we scroll to top when visiting the separate page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <div className="pt-20">
                <PricingSection />
            </div>
            <Footer />
        </div>
    );
}
