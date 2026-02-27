"use client";

import {
  Globe,
  Menu,
  X,
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

  // Scroll Lock for Mobile Menu
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
          { id: "shop", label: "SHOP", href: "#shop" },
          { id: "pricing", label: "PRICING", href: "#pricing" },
          { id: "stories", label: "OUR SOLUTIONS", href: "#section-4" },
          { id: "contact", label: "CONTACT", href: "#contact" },
          { id: "pay", label: "PAY ONLINE", href: "#pay" },
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
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
            : ""
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto mt-4 px-3 sm:px-6">
          <div>
            <div className="flex items-center justify-between h-[68px] px-4 sm:px-6">
              {/* LOGO */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                aria-label="Go to home"
              >
                <img
                  src="/colored-logo.png"
                  alt="Logo"
                  className="h-7 md:h-10 w-auto"
                />
              </button>

              {/* DESKTOP MENU */}
              <div className="hidden md:flex items-center gap-10">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleClick(item)}
                    className={`relative group text-[10px] font-medium tracking-[1.5px] font-poppins
                  ${
                    activeLink === item.id ? "text-blue-900" : "text-black/90"
                  }`}
                  >
                    {item.label}

                    <span
                      className={`absolute left-0 -bottom-2 h-[2px] w-full scale-x-0 origin-left
                    bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900
                    transition-transform duration-300
                    group-hover:scale-x-100
                    ${activeLink === item.id ? "scale-x-100" : ""}`}
                    />
                  </button>
                ))}
              </div>

              {/* DESKTOP ACTIONS */}
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={toggleLanguage}
                  className="w-9 h-9 rounded-full border border-blue-900/50 flex items-center justify-center hover:bg-blue-900/10 transition"
                >
                  <Globe className="w-4 h-4 text-black" />
                </button>

                {!user && (
                  <button
                    onClick={handleBuyClick}
                    className="bg-black/90 text-white h-9 px-8 rounded-full text-[11px] tracking-[0.25em] font-semibold hover:bg-black transition"
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
                          src={`http://localhost:3000${user.profilePic}`}
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
                className="md:hidden w-9 h-9 rounded-full border border-blue-900/50 flex items-center justify-center"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU (Portal to prevent stacking issues) */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <div className="md:hidden fixed inset-0 z-[9999] h-full w-full overflow-hidden touch-none">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl"
                  onClick={() => setMenuOpen(false)}
                />

                {/* Close Button Top Right */}
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors z-[10000]"
                >
                  <X size={36} strokeWidth={1} />
                </button>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className="relative flex flex-col h-full w-full py-20 px-10 z-[10000] pointer-events-none bg-gradient-to-br from-slate-900 via-black to-slate-900"
                >
                  {/* Logo Section */}
                  <div className="flex justify-center mb-16 opacity-80">
                    <img
                      src="/white-logo.png"
                      alt="Bill Till Logo"
                      className="h-10 w-auto"
                    />
                  </div>

                  {/* Navigation Links - Centered vertically */}
                  <div className="flex-1 flex flex-col items-center justify-center gap-12 pointer-events-auto">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                        onClick={() => handleClick(item)}
                        className="group relative text-3xl font-light tracking-[0.2em] text-white/70 hover:text-white transition-all font-serif"
                      >
                        {item.label}
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white/40 transition-all duration-300 group-hover:w-full" />
                      </motion.button>
                    ))}

                    {!user ? (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        onClick={handleBuyClick}
                        className="mt-8 px-12 py-4 rounded-full border border-white/20 bg-white/5 text-white text-xs font-black tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                      >
                        {buyText}
                      </motion.button>
                    ) : (
                      <div className="flex flex-col items-center gap-8 mt-8">
                        <button
                          onClick={() => {
                            setMenuOpen(false);
                            navigate("/dashboard");
                          }}
                          className="px-12 py-4 rounded-full bg-blue-600 text-white text-xs font-black tracking-[0.4em] uppercase hover:bg-blue-500 transition-all"
                        >
                          DASHBOARD
                        </button>
                        <button
                          onClick={() => {
                            setMenuOpen(false);
                            logout();
                          }}
                          className="text-red-400 text-[10px] font-black tracking-[0.5em] uppercase opacity-60 hover:opacity-100 transition-opacity"
                        >
                          LOGOUT
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Footer Section */}
                  <div className="flex flex-col items-center gap-10 pointer-events-auto mt-12">
                    <div className="flex items-center gap-12">
                      <button
                        onClick={toggleLanguage}
                        className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all"
                      >
                        <span className="text-xs font-black tracking-tighter">
                          {language === "en" ? "EN" : "සිං"}
                        </span>
                      </button>

                      <div className="flex items-center gap-6">
                        <button className="text-white/40 hover:text-white transition-colors">
                          <Facebook size={20} />
                        </button>
                        <button className="text-white/40 hover:text-white transition-colors">
                          <Instagram size={20} />
                        </button>
                        <button className="text-white/40 hover:text-white transition-colors">
                          <Linkedin size={20} />
                        </button>
                      </div>
                    </div>

                    <p className="text-[9px] text-white/20 tracking-[0.6em] uppercase font-bold">
                      Bill Till POS
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
