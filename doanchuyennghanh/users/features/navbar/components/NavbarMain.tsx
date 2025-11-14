"use client";

import { useState, useEffect } from "react";
import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";
import NavbarCart from "./NavbarCart";
import NavbarSearch from "./NavbarSearch";

export default function NavbarMain() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-white/95 backdrop-blur-sm sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'shadow-lg border-b border-pink-100' : 'shadow-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <NavbarLogo />
          <NavbarMenu />
          <div className="flex items-center space-x-2">
            {/* Search */}
            <NavbarSearch />
            
            {/* Cart */}
            <NavbarCart />
            
            {/* CTA Button */}
            <a
              href="/contact"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-full hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Liên hệ
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}