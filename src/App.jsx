import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useLenis } from "@/hooks/useLenis";

// Layout Components

import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Section Components

import { HeroSection } from "@/components/sections/HeroSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { ValuePropositionSection } from "@/components/sections/ValuePropositionSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FAQSection } from "@/components/sections/FAQSection";

// Pages
import PaymentPage from "@/pages/PaymentPage";
import RegistrationPage from "@/pages/RegistrationPage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";

import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Home Page Component
const HomePage = () => {
  // Initialize Lenis smooth scroll
  useLenis();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <HeroSection />
        <SocialProofSection />
        <ValuePropositionSection />
        <IndustriesSection />
        <HowItWorksSection />
        <PricingSection />
        <FeaturesSection />
        <FAQSection />
        <TestimonialsSection />
        
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Toaster position="bottom-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
