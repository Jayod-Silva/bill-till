import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("billtill_language");
      return saved || "en";
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("billtill_language", language);
    // Trigger DOM-based update for data-i18n attributes
    if (typeof window !== "undefined") {
      import("./language").then(({ updateDOMTranslations }) => {
        updateDOMTranslations(language);
      });
    }
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
