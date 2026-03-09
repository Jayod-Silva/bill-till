import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useLenis } from "@/hooks/useLenis";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import { CheckCircle2, AlertCircle, X, FileText, Download } from "lucide-react";
import { usePaymentStore } from "@/stores/usePaymentStore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

// Home Page Component with Payment Handling
const HomePage = () => {
  // Initialize Lenis smooth scroll
  useLenis();
  const { showSuccess, setShowSuccess, paymentResult, setPaymentResult, paymentFailed, setPaymentFailed, failureMessage, setFailureMessage } = usePaymentStore();

  // Payment success/failure modal components
  const SuccessModal = ({ details, onClose }) => {
    const handleClose = () => {
      onClose();
      setTimeout(() => {
        window.location.href = '/';
      }, 300);
    };

    const generateInvoice = (detailsData, action = "download") => {

      // console.log("📄 Generating invoice for:", detailsData);

      const doc = new jsPDF();
      const invoiceId = detailsData.invoiceId || `INV-${Math.floor(100000 + Math.random() * 900000)}`;
      const confirmationCode = detailsData.confirmationCode || "N/A";

      const primaryColor = [7, 60, 148];
      const secondaryColor = [30, 41, 59];
      const accentColor = [16, 185, 129];
      const grayText = [100, 116, 139];

      try {
        doc.addImage("/colored-logo.png", "PNG", 14, 15, 40, 20);
      } catch {
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...primaryColor);
        doc.text("Bill-Till", 14, 25);
      }

      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...secondaryColor);
      doc.text("INVOICE", 140, 25);

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(`Invoice ID:`, 140, 35);
      doc.setFont("helvetica", "normal");
      doc.text(invoiceId, 170, 35);

      doc.setFont("helvetica", "bold");
      doc.text(`Date:`, 140, 40);
      doc.setFont("helvetica", "normal");
      doc.text(new Date().toLocaleDateString(), 170, 40);

      doc.setFont("helvetica", "bold");
      doc.text(`Status:`, 140, 45);
      doc.setTextColor(...accentColor);
      doc.text("PAID", 170, 45);
      doc.setTextColor(...secondaryColor);

      doc.setDrawColor(226, 232, 240);
      doc.line(14, 55, 196, 55);

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text("FROM (SENDER)", 14, 65);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(...secondaryColor);
      doc.text(detailsData.businessName || "Valued Customer", 14, 72);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Name: ${detailsData.ownerName}`, 14, 77);
      doc.text(`Address: ${detailsData.address || "N/A"}`, 14, 82, { maxWidth: 80 });
      doc.text(`Phone: ${detailsData.phone}`, 14, 87);
      doc.text(`Email: ${detailsData.email}`, 14, 92);

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text("BILL TO (BENEFICIARY)", 110, 65);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(...secondaryColor);
      doc.text("Bill-Till", 110, 72);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Bill-Till,", 110, 77);
      doc.text("680A Colombo Road,Kattuwa,Negombo, Sri Lanka ", 110, 82, {
        maxWidth: 80,
      });
      doc.text("Email: support@billtill.co", 110, 87);
      doc.text("Web: www.billtill.co", 110, 92);
      doc.text("Phone: 0114 758900", 110, 97);

      doc.setDrawColor(241, 245, 249);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, 105, 182, 25, 3, 3, "FD");

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...grayText);
      doc.text("Payment ID", 25, 115);
      doc.text("Confirmation Code", 85, 115);
      doc.text("Payment Method", 145, 115);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(...secondaryColor);
      doc.text(detailsData.orderId || "N/A", 25, 122);
      doc.text(confirmationCode, 85, 122);
      doc.text("Card Payment", 145, 122);

      const cur = detailsData.currency || "LKR";
      const amountVal = parseFloat(detailsData.amount) || 0;
      const tableData = [
        [
          "01",
          "Software Subscription",
          `${detailsData.selectedPlan}`,
          "1",
          `${cur} ${amountVal.toFixed(2)}`,
          `${cur} ${amountVal.toFixed(2)}`,
        ],
      ];

      autoTable(doc, {
        startY: 140,
        head: [["#", "Service", "Description", "Qty", "Unit Price", "Total"]],
        body: tableData,
        theme: "grid",
        headStyles: {
          fillColor: primaryColor,
          fontSize: 9,
          fontStyle: "bold",
          halign: "center",
        },
        styles: { fontSize: 9, cellPadding: 4 },
        columnStyles: {
          0: { halign: "center", cellWidth: 13 },
          3: { halign: "center", cellWidth: 15 },
          4: { halign: "right", cellWidth: 35 },
          5: { halign: "right", cellWidth: 35 },
        },
      });

      const finalY = doc.lastAutoTable.finalY + 15;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...grayText);
      doc.text("Subtotal:", 140, finalY);
      doc.text(`${cur} ${parseFloat(detailsData.amount).toFixed(2)}`, 175, finalY, { align: "right" });

      doc.text("Tax (0%):", 140, finalY + 7);
      doc.text(`${cur} 0.00`, 175, finalY + 7, { align: "right" });

      doc.setDrawColor(226, 232, 240);
      doc.line(135, finalY + 10, 196, finalY + 10);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text("Total Paid:", 140, finalY + 18);
      doc.text(`${cur} ${parseFloat(detailsData.amount).toFixed(2)}`, 185, finalY + 18, { align: "right" });

      const pageHeight = doc.internal.pageSize.height;
      doc.setDrawColor(226, 232, 240);
      doc.line(14, pageHeight - 40, 196, pageHeight - 40);

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...secondaryColor);
      doc.text("Thank you for your business!", 14, pageHeight - 33);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(...grayText);
      doc.text("This is a computer-generated document and does not require a physical signature.", 14, pageHeight - 28);
      doc.text("For any queries, please contact support@billtill.co or call +94 0114 758900", 14, pageHeight - 23);

      // ── ACTION ──
      if (action === "view") {
        window.open(doc.output("bloburl"), "_blank");
      } else if (action === "download") {
        doc.save(`BillTill_Invoice_${detailsData.orderId}.pdf`);
      }

      // ── SEND EMAIL IN BACKGROUND ──
      if (!detailsData._emailSent) {
        detailsData._emailSent = true;
        const pdfBlob = doc.output("blob");
        const filename = `BillTill_Invoice_${detailsData.orderId}.pdf`;
        const formData = new FormData();
        formData.append("invoice", pdfBlob, filename);
        formData.append("email", detailsData.email || "");
        formData.append("businessName", detailsData.businessName);
        formData.append("invoiceId", invoiceId);
        formData.append("orderId", detailsData.orderId || "");
        formData.append("confirmationCode", confirmationCode);
        formData.append("amount", detailsData.amount || "0");
        formData.append("plan", detailsData.selectedPlan);
        formData.append(
          "billingCycle",
          detailsData.billingCycle
        );
        formData.append("currency", detailsData.currency || "LKR");

        axios
          .post(
            "http://localhost:7075/api/send-invoice",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            },
          )
          .then(() => console.log("✅ Invoice email sent successfully"))
          .catch((err) =>
            console.error(
              "❌ Invoice email failed:",
              err?.response?.data || err.message,
            ),
          );
      }
    };

    generateInvoice(details, "");

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>

          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-emerald-50 text-emerald-500">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Payment Successful!
            </h2>
            <p className="text-slate-500 mb-8">
              Thank you for choosing Bill-Till. Your subscription is complete.
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Order ID</span>
                <span className="font-mono font-bold text-slate-900">
                  {details.orderId}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Business</span>
                <span className="font-bold text-slate-900">
                  {details.businessName || (details.description && details.description.split("-")[0]) || "N/A"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Amount</span>
                <span className="font-bold text-emerald-600">
                  {details.currency || "LKR"} {parseFloat(details.amount || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Subscription Plan</span>
                <span className="font-bold text-slate-900">
                  {details.selectedPlan || (details.description && details.description.split("-")[1]) || "Dynamic"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Billing Cycle</span>
                <span className="font-bold text-slate-900">
                  {details.billingCycle || (details.description && details.description.split("-")[2]) || "Monthly"}
                </span>
              </div>
              <div className="flex justify-between text-sm py-2 px-3 bg-blue-50/50 rounded-lg border border-blue-100/50 mt-1">
                <span className="text-slate-500 font-medium">
                  Activation Code
                </span>
                <span className="font-mono font-bold text-blue-600">
                  {details.confirmationCode || details.reference || "N/A"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => generateInvoice(details, "view")}
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                <FileText className="w-4 h-4" />
                View Invoice
              </button>
              <button
                onClick={() => generateInvoice(details, "download")}
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>

          <div className="bg-slate-50 p-4 text-center">
            <p className="text-xs text-slate-400">
              A copy of this invoice has been sent to{" "}
              <span className="text-slate-600 font-medium">
                {details.email && details.email !== "N/A" ? details.email : "(email not available)"}
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const FailureModal = ({ message, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
        setTimeout(() => {
          window.location.href = '/';
        }, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
      onClose();
      setTimeout(() => {
        window.location.href = '/';
      }, 300);
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>

          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-red-50 text-red-500">
              <AlertCircle className="w-10 h-10" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Payment Failed
            </h2>
            <p className="text-slate-600 mb-8 font-medium">
              {message || "Your payment could not be processed. Please try again."}
            </p>

            <button
              onClick={handleClose}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-500/20"
            >
              Try Again
            </button>

            <p className="text-xs text-slate-400 mt-6">
              Redirecting to home in 5 seconds...
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Handle payment return from gateway
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    const orderId = params.get("orderId");

    console.log("🔍 Payment detection: payment=", payment, "orderId=", orderId);

    if (payment === "success" && orderId) {
      window.history.replaceState({}, document.title, window.location.pathname);

      const apiUrl = `http://localhost:7075/api/verify-payment/${orderId}`;
      console.log("📡 Verifying payment with:", apiUrl);

      axios
        .get(apiUrl)
        .then((response) => {
          console.log("✅ Payment verified:", response.data);
          const apiDetails = response.data.storedDetails || response.data;
          const resultDetails = {
            ...apiDetails,
            orderId,
            currency: apiDetails.currency || "LKR",
          };
          setPaymentResult(resultDetails);
          setShowSuccess(true);
        })
        .catch((err) => {
          console.error("❌ Verify payment failed:", err.message);
          setPaymentResult({
            orderId,
            businessName: "N/A",
            email: "N/A",
            currency: "LKR",
            amount: "0",
            selectedPlan: "Dynamic",
            billingCycle: "Monthly"
          });
          setShowSuccess(true);
        });
    } else if (payment === "failure") {
      console.log("⚠️ Payment failed detected");
      window.history.replaceState({}, document.title, window.location.pathname);
      setPaymentFailed(true);
      setFailureMessage("Your payment was cancelled or failed. Please try again.");
    }
  }, [setShowSuccess, setPaymentResult, setPaymentFailed, setFailureMessage]);

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
      </main>

      <Footer />

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <SuccessModal
            details={paymentResult}
            onClose={() => setShowSuccess(false)}
          />
        )}
      </AnimatePresence>

      {/* Failure Modal */}
      <AnimatePresence>
        {paymentFailed && (
          <FailureModal
            message={failureMessage}
            onClose={() => setPaymentFailed(false)}
          />
        )}
      </AnimatePresence>
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
