import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FreeSwitchSection = () => {
  return (
    <section id="free-switch" className="py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full mb-8 shadow-lg shadow-primary/25">
            <Sparkles className="w-6 h-6" />
            <span className="text-base font-bold">FREE SYSTEM SWITCH</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Switch to BillTill for Free
          </h2>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-8">
            No hidden fees. No setup costs. No system switching charges. 
            Make the move to a better POS system without breaking the bank.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Zero Setup Fees</h3>
              <p className="text-sm text-muted-foreground">No charges for initial setup and configuration</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Free Data Migration</h3>
              <p className="text-sm text-muted-foreground">We'll migrate your existing data at no cost</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Switching Charges</h3>
              <p className="text-sm text-muted-foreground">Completely free transition from your current system</p>
            </motion.div>
          </div>

          <Button
            size="lg"
            className="px-10 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
            onClick={() => window.open('https://wa.me/1234567890?text=Hi! I want to know more about switching to BillTill for free.', '_blank')}
          >
            Get Started on WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
