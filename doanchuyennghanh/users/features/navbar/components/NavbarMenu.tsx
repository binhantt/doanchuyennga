"use client";

import Link from "next/link";
import { useState } from "react";
import { useNavbarMenu } from "../Hooks/useNavbarMenu";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

export default function NavbarMenu() {
  const { menus } = useNavbarMenu();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Menu */}
      <NavigationMenu.Root className="hidden lg:flex">
        <NavigationMenu.List className="flex space-x-1">
          {menus.map((item) => (
            <NavigationMenu.Item key={item.href}>
              <NavigationMenu.Link asChild>
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:bg-pink-50 ${
                    item.active
                      ? "text-pink-600 bg-pink-50 shadow-sm"
                      : "text-gray-700 hover:text-pink-600"
                  }`}
                >
                  {item.label}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-2 rounded-lg hover:bg-pink-50 transition-colors"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-pink-100 z-50">
          <div className="container mx-auto py-4">
            <div className="flex flex-col space-y-2">
              {menus.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    item.active
                      ? "text-pink-600 bg-pink-50"
                      : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}