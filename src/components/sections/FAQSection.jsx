
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How long does it take to set up Bill Till?',
    answer: 'Most businesses are up and running within 10 minutes. Simply create an account, add your products, and start accepting payments. Our setup wizard guides you through every step, and our support team is available 24/7 if you need help.',
  },
  {
    question: 'What payment methods does Bill Till support?',
    answer: 'Bill Till supports all major credit and debit cards (Visa, Mastercard, American Express, Discover), mobile payments (Apple Pay, Google Pay, Samsung Pay), contactless payments, and cash. We also integrate with popular payment processors like Stripe and Square.',
  },
  {
    question: 'Can I use Bill Till offline?',
    answer: 'Yes! Bill Till works seamlessly offline. All transactions are stored locally and automatically sync when your internet connection is restored. You\'ll never miss a sale due to connectivity issues.',
  },
  {
    question: 'Is my data secure with Bill Till?',
    answer: 'Absolutely. We use bank-level security with end-to-end encryption, are PCI DSS compliant, and employ multiple layers of protection including fraud detection, secure authentication, and regular security audits. Your data is always safe with us.',
  },
  {
    question: 'Can I manage multiple locations?',
    answer: 'Yes, our Pro and Enterprise plans support unlimited locations. You\'ll have a centralized dashboard to view sales, inventory, and performance across all your stores in real-time. Each location can have its own settings while maintaining consistent branding.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'We offer email support for Starter plans, priority support with live chat for Pro plans, and 24/7 dedicated phone support with a personal account manager for Enterprise customers. All plans include access to our comprehensive knowledge base and video tutorials.',
  }
];

export const FAQSection = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently asked{' '}
            <span className="text-primary">questions</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground">
            Everything you need to know about Bill Till. Can't find the answer you're looking for? 
            <a href="#" className="text-primary hover:underline ml-1">Contact our support team</a>.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/20 data-[state=open]:shadow-card transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5 [&[data-state=open]>svg]:rotate-180">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => (
                <AccordionItem
                  key={index + Math.ceil(faqs.length / 2)}
                  value={`item-${index + Math.ceil(faqs.length / 2)}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/20 data-[state=open]:shadow-card transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5 [&[data-state=open]>svg]:rotate-180">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
