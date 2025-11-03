"use client";
import { Heart, Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export default function FooterBrand() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Heart className="text-pink-500 w-6 h-6" />
        <span className="font-semibold text-xl">Wedding Paradise</span>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Chuyên tổ chức tiệc cưới sang trọng, đẳng cấp với dịch vụ trọn gói và menu đa dạng.
      </p>
      <div className="flex gap-4">
        <Link href="#" className="hover:text-pink-400 transition">
          <Facebook className="w-5 h-5" />
        </Link>
        <Link href="#" className="hover:text-pink-400 transition">
          <Instagram className="w-5 h-5" />
        </Link>
        <Link href="#" className="hover:text-pink-400 transition">
          <Youtube className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
