import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, CreditCard, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PaymentForm from '@/components/sections/PaymentForm';

const PaymentPage = () => {
    const navigate = useNavigate();

    // Hide the main navbar when on payment page
    useEffect(() => {
        const navbar = document.querySelector('nav');
        if (navbar) {
            navbar.style.display = 'none';
        }
        
        // Cleanup: restore navbar when leaving the page
        return () => {
            if (navbar) {
                navbar.style.display = '';
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Navigation Header */}
            <motion.nav 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-3 text-gray-700 hover:text-blue-900 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Home</span>
                        </button>
                        
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-gray-700">Secure Payment</span>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 blur-[100px] rounded-full" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 blur-[100px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto mb-16"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <CreditCard className="w-8 h-8 text-blue-700" />
                            </div>
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Complete Your
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700"> Registration</span>
                        </h1>
                        
                        <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Securely complete your bill-till registration with our trusted payment gateway. 
                            Your transaction is protected with industry-standard encryption.
                        </p>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center gap-6 mb-12">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Lock className="w-4 h-4 text-green-600" />
                                <span>256-bit SSL Encryption</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Shield className="w-4 h-4 text-green-600" />
                                <span>PCI DSS Compliant</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <CreditCard className="w-4 h-4 text-green-600" />
                                <span>Multiple Payment Options</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Payment Form Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl border border-white/50 p-8 md:p-12 shadow-2xl">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Information</h2>
                                <p className="text-gray-600">Fill in your details to proceed with payment</p>
                            </div>
                            
                            <PaymentForm selectedPlan="Pro" />
                        </div>
                    </motion.div>

                    {/* Additional Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-16 text-center"
                    >
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose bill-till?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <CreditCard className="w-6 h-6 text-blue-700" />
                                    </div>
                                    <h4 className="font-medium text-gray-900 mb-1">Easy Payments</h4>
                                    <p className="text-sm text-gray-600">Simple and secure payment processing</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Shield className="w-6 h-6 text-green-700" />
                                    </div>
                                    <h4 className="font-medium text-gray-900 mb-1">Secure Platform</h4>
                                    <p className="text-sm text-gray-600">Bank-level security for your data</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Lock className="w-6 h-6 text-purple-700" />
                                    </div>
                                    <h4 className="font-medium text-gray-900 mb-1">Privacy First</h4>
                                    <p className="text-sm text-gray-600">Your information is always protected</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <img
                                src="/colored-logo.png"
                                alt="bill-till Logo"
                                className="h-8 w-auto"
                            />
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            © 2024 bill-till. All rights reserved.
                        </p>
                        <div className="flex justify-center gap-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PaymentPage;
