"use client";

import { Globe, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

/* Mock Language Hook */
const useLanguage = () => {
  const [language, setLanguage] = useState("en");
  const toggleLanguage = () =>
    setLanguage((l) => (l === "en" ? "si" : "en"));
  return { language, toggleLanguage };
};

export default function Navigation() {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const buyText = language === "en" ? "BUY" : "මිලදී ගන්න";

  const handleClick = (item) => {
    setActiveLink(item.id);
    setMenuOpen(false);
    
    // Special handling for shop link
    if (item.id === 'shop') {
      // Navigate to tech store
      window.history.pushState({}, '', '/shop');
      // Trigger a custom event to notify App component
      window.dispatchEvent(new CustomEvent('navigate', { detail: { path: '/shop' } }));
    } else if (item.id === 'pay') {
      // Navigate to payment page
      navigate('/payment');
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50' : ''
    }`}>
      <div className="w-full max-w-[1400px] mx-auto mt-4 px-3 sm:px-6">
        <div>
          <div className="flex items-center justify-between h-[68px] px-4 sm:px-6">

            {/* LOGO */}
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
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
                    activeLink === item.id
                      ? "text-blue-900"
                      : "text-black/90"
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

              <button
                onClick={handleBuyClick}
                className="bg-black/90 text-white h-9 px-8 rounded-full text-[11px] tracking-[0.25em] font-semibold hover:bg-black transition"
              >
                {buyText}
              </button>

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
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Account</p>
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

          {/* MOBILE MENU */}
          <div
            className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
              menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md" onClick={() => setMenuOpen(false)} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleClick(item)}
                    className="relative text-xl font-semibold tracking-[0.1em] font-poppins group text-white"
                  >
                    {item.label}

                    <span
                      className={`absolute left-0 -bottom-2 h-[2px] w-full scale-x-0 origin-left
                      bg-gradient-to-r from-white via-white/80 to-white
                      transition-transform duration-300
                      group-hover:scale-x-100
                      ${activeLink === item.id ? "scale-x-100" : ""}`}
                    />
                  </button>
                ))}

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={toggleLanguage}
                    className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/20 transition"
                  >
                    <Globe className="w-5 h-5 text-white" />
                  </button>

                  <button
                    onClick={handleBuyClick}
                    className="bg-white text-black h-12 px-10 rounded-full text-sm tracking-widest font-semibold hover:bg-white/90 transition"
                  >
                    {buyText}
                  </button>

                  {user && (
                    <>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/dashboard");
                        }}
                        className="bg-blue-900 text-white h-12 px-8 rounded-full text-sm tracking-widest font-semibold hover:bg-blue-800 transition flex items-center gap-3 w-full justify-center"
                      >
                        {user.profilePic ? (
                          <img
                            src={`http://localhost:3000${user.profilePic}`}
                            alt="Profile"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : null}
                        DASHBOARD
                      </button>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          logout();
                        }}
                        className="text-red-500 text-sm font-bold tracking-widest uppercase mt-4"
                      >
                        LOGOUT
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/20 transition"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
