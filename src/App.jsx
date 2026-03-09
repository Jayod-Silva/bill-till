import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
// import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FreeSwitchSection } from "@/components/sections/FreeSwitchSection";
import { FAQSection } from "@/components/sections/FAQSection";

// Pages
import PaymentPage from "@/pages/PaymentPage";
import RegistrationPage from "@/pages/RegistrationPage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ConfirmationCodePage from "@/pages/ConfirmationCodePage";
import TermsAndConditionsPage from "@/pages/TermsAndConditionsPage";
import ReturnPolicyPage from "@/pages/ReturnPolicyPage";
import ShopPage from "@/pages/ShopPage";
import ContactPage from "@/pages/ContactPage";
import CompanyPage from "@/pages/CompanyPage";
import PricingPage from "@/pages/PricingPage";

import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/translations/LanguageContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Home Page Component
const HomePage = () => {
  // Initialize Lenis smooth scroll
  useLenis();
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <SocialProofSection />
        <ValuePropositionSection />
        <IndustriesSection />
        <HowItWorksSection />
        <PricingSection />
        <FreeSwitchSection />
        <FeaturesSection />
        <FAQSection />
        {/* <TestimonialsSection /> */}
      </main>

      <Footer />
    </div>
  );
};

const NavigationWrapper = () => {
  const location = useLocation();
  const hideNavbarPaths = [
    "/register",
    "/login",
    "/confirm-code",
    "/terms-and-conditions",
    "/return-policy",
    "/dashboard",
  ];

  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  return <Navbar />;
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <NavigationWrapper />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/confirm-code" element={<ConfirmationCodePage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditionsPage />}
            />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
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
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
