"use client";

import { NavbarMain, NavbarTop } from "../navbar/index";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-all duration-300">
      <NavbarTop />
      <NavbarMain />
    </header>
  );
}
