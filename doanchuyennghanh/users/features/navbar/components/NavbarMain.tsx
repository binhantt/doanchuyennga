"use client";

import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";
import NavbarCart from "./NavbarCart";

export default function NavbarMain() {
  return (
    <nav className="bg-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <NavbarLogo />
        <NavbarMenu />
        <NavbarCart />
      </div>
    </nav>
  );
}
