"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Specifications", href: "#specs" },
    { name: "Support", href: "#support" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="/" className="text-2xl font-black tracking-tighter">
          <span className={isScrolled ? "text-dish-dark" : "text-white"}>DISH</span>
          <span className="text-dish-red">TV</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${isScrolled ? "text-slate-600 hover:text-dish-red" : "text-white/80 hover:text-white"}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://www.linkedin.com/in/surakshithdt"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-dish-red text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-dish-red/20"
          >
            Contact Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-dish-dark" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-dish-dark" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-dish-dark hover:text-dish-red"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://www.linkedin.com/in/surakshithdt"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-dish-red text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
