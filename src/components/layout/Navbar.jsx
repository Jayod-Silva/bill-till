"use client";

import {
  Globe,
  Menu,
  X,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

/* Mock Language Hook */
const useLanguage = () => {
  const [language, setLanguage] = useState("en");
  const toggleLanguage = () => setLanguage((l) => (l === "en" ? "si" : "en"));
  return { language, toggleLanguage };
};

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("shop");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("lenis-stopped");
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.classList.remove("lenis-stopped");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [menuOpen]);

  const navItems =
    language === "en"
      ? [
          { id: "shop", label: "Shop", href: "#shop" },
          { id: "pricing", label: "Pricng", href: "#pricing" },
          { id: "stories", label: "Our Solutions", href: "#section-4" },
          { id: "contact", label: "Contact", href: "#contact" },
          { id: "pay", label: "Pay Online", href: "#pay" },
        ]
      : [
          { id: "shop", label: "වෙළඳසැල", href: "#shop" },
          { id: "pricing", label: "මිල ගණන්", href: "#pricing" },
          { id: "stories", label: "අපේ විසඳුම්", href: "#section-4" },
          { id: "contact", label: "සම්බන්ධ වන්න", href: "#contact" },
          { id: "pay", label: "මාර්ගගත ගෙවීම", href: "#pay" },
        ];

  const buyText = language === "en" ? "Sign In" : "ඇසුම්ම කරන්න";

  const handleClick = (item) => {
    setActiveLink(item.id);
    setMenuOpen(false);

    // Special handling for shop link
    if (item.id === "shop") {
      // Navigate to tech store
      window.history.pushState({}, "", "/shop");
      // Trigger a custom event to notify App component
      window.dispatchEvent(
        new CustomEvent("navigate", { detail: { path: "/shop" } }),
      );
    } else if (item.id === "pay") {
      // Navigate to confirmation code page
      navigate("/confirm-code");
    } else {
      document.querySelector(item.href)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleBuyClick = () => {
    setMenuOpen(false);
    navigate("/register");
  };

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-full mx-auto transition-all duration-500 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] z-[100] ${
          scrolled
            ? "max-w-[1500px] md:max-w-[1500px]"
            : "max-w-md -mt-2 md:-mt-8 md:max-w-[1500px]"
        }`}
      >
        <div
          className={`px-8 py-3 md:py-4 transition-all duration-500 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
            scrolled
              ? "bg-white  shadow-lg -mt-6 md:-mt-7 rounded-b-3xl md:scale-[1.02]"
              : "-mt-2 md:mt-2 scale-[1]"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]"
              aria-label="Go to home"
            >
              <img
                src="/colored-logo.png"
                alt="Bill Till Logo"
                className="h-9 md:h-10 w-auto"
              />
            </button>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item)}
                  className={`relative group text-[14px] font-medium font-poppins transition-all duration-300 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]
                  ${
                    activeLink === item.id
                      ? "text-blue-600 scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:scale-105"
                  }`}
                >
                  {item.label}

                  <span
                    className={`absolute left-0 -bottom-2 h-[2px] w-full scale-x-0 origin-left
                    bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600
                    transition-all duration-500 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)]
                    group-hover:scale-x-110
                    ${activeLink === item.id ? "scale-x-100" : ""}`}
                  />
                </button>
              ))}
            </div>

            {/* DESKTOP ACTIONS */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="w-9 h-9 rounded-full border border-blue-900/50 flex items-center justify-center hover:scale-110 hover:bg-blue-900/20 transition-all duration-300 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]"
              >
                <Globe className="w-4 h-4 text-black" />
              </button>

              {!user && (
                <button
                  onClick={handleBuyClick}
                  className="bg-[#0957D6] text-white h-9 px-6 rounded-full text-[14px] font-semibold hover:bg-black hover:scale-105 transition-all font-poppins duration-300 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]"
                >
                  {buyText}
                </button>
              )}

              {/* USER PROFILE DROPDOWN */}
              {user && (
                <div className="relative ml-2">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-9 h-9 rounded-full border border-blue-900/50 overflow-hidden flex items-center justify-center hover:bg-blue-900/10 transition"
                  >
                    {user.profilePic ? (
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}${user.profilePic}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold">
                        {user.firstName?.charAt(0)}
                      </div>
                    )}
                  </button>

                  {dropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[110] animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                            Account
                          </p>
                          <p className="text-sm font-semibold text-blue-900 truncate">
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                        <Link
                          to="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-[11px] font-medium tracking-wider text-gray-700 hover:bg-blue-50 transition"
                        >
                          DASHBOARD
                        </Link>
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left block px-4 py-2 text-[11px] font-medium tracking-wider text-red-600 hover:bg-red-50 transition"
                        >
                          LOGOUT
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* MOBILE TOGGLE */}
            <button
              className="lg:hidden flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] lg:hidden"
          >
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3,
              }}
              className="absolute inset-x-0 top-0 bg-white rounded-b-2xl shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <img
                    src="/colored-logo.png"
                    alt="Bill-Till"
                    className="h-8 w-auto"
                  />
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      onClick={() => handleClick(item)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeLink === item.id
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{
                      delay: 0.4,
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    onClick={toggleLanguage}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    {language === "en" ? "EN" : "සිං"}
                  </motion.button>

                  {!user && (
                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      onClick={handleBuyClick}
                      className="w-full bg-black/90 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-black transition-colors"
                    >
                      {buyText}
                    </motion.button>
                  )}

                  {user && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{
                        delay: 0.4,
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="space-y-3"
                    >
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/dashboard");
                        }}
                        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        DASHBOARD
                      </button>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          logout();
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
                      >
                        LOGOUT
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
