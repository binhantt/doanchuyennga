"use client";

import NavbarTop from "./NavbarTop";
import NavbarMain from "./NavbarMain";

export default function Navbar() {
  return (
    <header className="relative">
      <NavbarTop />
      <NavbarMain />
    </header>
  );
}