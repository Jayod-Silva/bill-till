import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Phone, Globe, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Terms & Conditions</h1>
              <p className="text-sm text-slate-500">Bill Till Platform Usage Agreement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Agreement Overview
            </h2>
            <p className="text-slate-600 leading-relaxed">
              This Terms & Conditions agreement governs the use of the Bill Till platform and website (www.billtill.co) 
              operated by Ceylon Innovation Services (PVT) LTD. By accessing or using this website and its services, 
              you agree to comply with the following terms.
            </p>
          </motion.section>

          {/* Use of Website */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Use of Website</h2>
            <p className="text-slate-600 leading-relaxed">
              Users may access the Bill Till website and related services for lawful purposes only. By using this website, 
              you agree not to misuse the platform or attempt to gain unauthorized access to any part of the system, servers, or databases.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              Ceylon Innovation Services (PVT) LTD reserves the right to restrict or terminate access to users who violate these terms.
            </p>
          </motion.section>

          {/* Services */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Services</h2>
            <p className="text-slate-600 leading-relaxed">
              Bill Till is a digital platform designed to support businesses with point-of-sale operations, 
              billing, inventory management, reporting, and related services.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              We may modify, update, or discontinue any part of the service at any time without prior notice 
              in order to improve performance, security, or functionality.
            </p>
          </motion.section>

          {/* User Accounts */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">User Accounts</h2>
            <p className="text-slate-600 leading-relaxed">
              Some services may require users to register and create an account. Users are responsible for maintaining 
              the confidentiality of their login credentials and all activities performed through their accounts.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              Ceylon Innovation Services (PVT) LTD will not be responsible for losses caused by unauthorized use of user accounts.
            </p>
          </motion.section>

          {/* Data and Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Data and Information</h2>
            <p className="text-slate-600 leading-relaxed">
              Users may store business information within the Bill Till system, including sales records, 
              inventory data, and customer information.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              While we take reasonable steps to secure system data, users are responsible for maintaining 
              proper backups and ensuring the accuracy of information they enter into the system.
            </p>
          </motion.section>

          {/* Intellectual Property */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed">
              All software, designs, logos, and content related to the Bill Till platform are the intellectual 
              property of Ceylon Innovation Services (PVT) LTD.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              Users are granted a limited right to use the platform for business operations. Reproduction, resale, 
              or unauthorized distribution of the system is strictly prohibited.
            </p>
          </motion.section>

          {/* Third Party Links */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Third Party Links</h2>
            <p className="text-slate-600 leading-relaxed">
              The Bill Till website may contain links to external websites or services. These third-party sites 
              operate independently and have their own terms and policies.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              Ceylon Innovation Services (PVT) LTD is not responsible for the content or practices of such external websites.
            </p>
          </motion.section>

          {/* Limitation of Liability */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">
              Ceylon Innovation Services (PVT) LTD shall not be held responsible for any direct or indirect 
              loss, damage, or business interruption resulting from the use of the Bill Till platform or website.
            </p>
          </motion.section>

          {/* Changes to Terms */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Changes to These Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              Ceylon Innovation Services (PVT) LTD may update these Terms & Conditions at any time. 
              Updated versions will be posted on this page. Continued use of the website or services indicates 
              acceptance of the updated terms.
            </p>
          </motion.section>

          {/* Contact Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              Contact Information
            </h2>
            <div className="space-y-4">
              <p className="text-slate-600 leading-relaxed">
                If you have any questions regarding these Terms & Conditions, please contact:
              </p>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Ceylon Innovation Services (PVT) LTD</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span>680A Colombo Road, Kattuwa, Negombo, Sri Lanka</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>0114 758 900</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-600 hover:text-blue-700 underline">ceyloninnovation.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-center py-8"
          >
            <p className="text-sm text-slate-500">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
