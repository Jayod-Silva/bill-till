import React from "react";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../../translations/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    whoWeServe: [
      {
        name: t("footer_industries"),
        href: "/#industries",
        i18nKey: "footer_industries",
      },
      {
        name: t("footer_features"),
        href: "/#features",
        i18nKey: "footer_features",
      },
      {
        name: t("footer_pricing"),
        href: "/#pricing",
        i18nKey: "footer_pricing",
      },
      {
        name: t("footer_integrations"),
        href: "#",
        i18nKey: "footer_integrations",
      },
    ],
    company: [
      {
        name: t("footer_about_us"),
        href: "/company",
        i18nKey: "footer_about_us",
      },
      { name: t("footer_careers"), href: "#", i18nKey: "footer_careers" },
      { name: t("footer_blog"), href: "#", i18nKey: "footer_blog" },
      { name: t("footer_press"), href: "#", i18nKey: "footer_press" },
    ],
    resources: [
      {
        name: t("footer_documentation"),
        href: "#",
        i18nKey: "footer_documentation",
      },
      {
        name: t("footer_help_center"),
        href: "#",
        i18nKey: "footer_help_center",
      },
      {
        name: t("footer_api_reference"),
        href: "#",
        i18nKey: "footer_api_reference",
      },
      { name: t("footer_status"), href: "#", i18nKey: "footer_status" },
    ],
    legal: [
      {
        name: t("footer_privacy_policy"),
        href: "#",
        i18nKey: "footer_privacy_policy",
      },
      {
        name: t("footer_terms_of_service"),
        href: "#",
        i18nKey: "footer_terms_of_service",
      },
      {
        name: t("footer_cookie_policy"),
        href: "#",
        i18nKey: "footer_cookie_policy",
      },
      { name: t("footer_gdpr"), href: "#", i18nKey: "footer_gdpr" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="bg-foreground border-t border-blue-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-15 h-15 flex items-center justify-center">
                <img
                  src="/white-logo.png"
                  alt="Bill Till Logo"
                  className="w-[120px] h-full object-contain"
                />
              </div>
            </div>
            <p
              className="text-white text-sm leading-relaxed mb-6 max-w-xs"
              data-i18n="footer_tagline"
            >
              {t("footer_tagline")}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <Mail className="w-4 h-4" />
                <span>info@billtill.co</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <Phone className="w-4 h-4" />
                <span>0114 758 900</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <Phone className="w-4 h-4" />
                <span>077 723 6130 (24/7)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <MapPin className="w-4 h-4" />
                <span>680A Colombo Road, Kattuwa, Negombo, Sri Lanka</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3
              className="font-semibold text-white mb-4"
              data-i18n="footer_who_we_serve"
            >
              {t("footer_who_we_serve")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.whoWeServe.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-blue-200 hover:text-white transition-colors"
                    data-i18n={link.i18nKey}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="font-semibold text-white mb-4"
              data-i18n="footer_company"
            >
              {t("footer_company")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-blue-200 hover:text-white transition-colors"
                    data-i18n={link.i18nKey}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="font-semibold text-white mb-4"
              data-i18n="footer_resources"
            >
              {t("footer_resources")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-blue-200 hover:text-white transition-colors"
                    data-i18n={link.i18nKey}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="font-semibold text-white mb-4"
              data-i18n="footer_legal"
            >
              {t("footer_legal")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-blue-200 hover:text-white transition-colors"
                    data-i18n={link.i18nKey}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-blue-200">
            © {new Date().getFullYear()} Bill Till.{" "}
            <span data-i18n="footer_rights">{t("footer_rights")}</span>
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="w-9 h-9 rounded-lg bg-blue-700/50 flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-700/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
