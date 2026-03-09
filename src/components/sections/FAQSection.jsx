import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "../../translations/LanguageContext";

export const FAQSection = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t("faq_q1"),
      answer: t("faq_a1"),
      i18nQ: "faq_q1",
      i18nA: "faq_a1",
    },
    {
      question: t("faq_q2"),
      answer: t("faq_a2"),
      i18nQ: "faq_q2",
      i18nA: "faq_a2",
    },
    {
      question: t("faq_q3"),
      answer: t("faq_a3"),
      i18nQ: "faq_q3",
      i18nA: "faq_a3",
    },
    {
      question: t("faq_q4"),
      answer: t("faq_a4"),
      i18nQ: "faq_q4",
      i18nA: "faq_a4",
    },
    {
      question: t("faq_q5"),
      answer: t("faq_a5"),
      i18nQ: "faq_q5",
      i18nA: "faq_a5",
    },
    {
      question: t("faq_q6"),
      answer: t("faq_a6"),
      i18nQ: "faq_q6",
      i18nA: "faq_a6",
    },
  ];

  return (
    <section className="py-14 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span data-i18n="faq_title_main">{t("faq_title_main")}</span>{" "}
            <span className="text-primary" data-i18n="faq_title_highlight">
              {t("faq_title_highlight")}
            </span>
          </h2>
          <p
            className="text-base lg:text-lg text-muted-foreground"
            data-i18n="faq_subtitle"
          >
            {t("faq_subtitle")}
            <a
              href="#"
              className="text-primary hover:underline ml-1"
              data-i18n="faq_contact"
            >
              {t("faq_contact")}
            </a>
            .
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
                  <AccordionTrigger
                    className="text-left font-medium text-foreground hover:text-primary py-5 [&[data-state=open]>svg]:rotate-180"
                    data-i18n={faq.i18nQ}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-muted-foreground pb-5 leading-relaxed"
                    data-i18n={faq.i18nA}
                  >
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
                  <AccordionTrigger
                    className="text-left font-medium text-foreground hover:text-primary py-5 [&[data-state=open]>svg]:rotate-180"
                    data-i18n={faq.i18nQ}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-muted-foreground pb-5 leading-relaxed"
                    data-i18n={faq.i18nA}
                  >
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
