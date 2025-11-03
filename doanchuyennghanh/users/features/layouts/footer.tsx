"use client";

import { FooterBrand, FooterLinks , FooterServices , FooterContact } from "../footer";

export default function Footer() {
  return (
    <footer className="bg-[#0a0213] text-white py-14 px-6 md:px-20 border-t border-white/10">
      <div className="grid md:grid-cols-4 gap-10 max-w-7xl ">
        <FooterBrand />
        <FooterLinks />
        <FooterServices />
        <FooterContact />
      </div>

      <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-400 text-sm">
        © 2025 <span className="text-pink-400 font-medium">Wedding Paradise</span>. All rights reserved.
      </div>
    </footer>
  );
}
