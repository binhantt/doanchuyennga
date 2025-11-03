"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function NavbarCart() {
  return (
    <Link href="/cart" className="text-gray-700 hover:text-pink-500">
      <ShoppingCart className="w-5 h-5" />
    </Link>
  );
}
