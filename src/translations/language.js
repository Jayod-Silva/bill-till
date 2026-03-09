import { translations } from "./translations";

/**
 * Updates all elements with data-i18n attribute in the current document.
 * This is useful for elements not directly managed by React or for 
 * supporting legacy code as requested.
 * @param {string} lang - 'en', 'si', or 'ta'
 */
export const updateDOMTranslations = (lang) => {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const translation = translations[lang]?.[key];
    
    if (translation) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        if (el.placeholder) el.placeholder = translation;
      } else {
        el.textContent = translation;
      }
    }
  });
  
  // Update document direction if needed (not strictly needed for these languages)
  document.documentElement.lang = lang;
};
