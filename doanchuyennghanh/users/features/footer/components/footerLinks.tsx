
"use client";
import Link from "next/link";

export default function FooterLinks() {
  const links = [
    "Về chúng tôi",
    "Gói tiệc cưới",
    "Thực đơn",
    "Dịch vụ",
    "Liên hệ",
  ];

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 ">Liên kết nhanh</h3>
      <ul className="space-y-2 text-gray-300">
        {links.map((item) => (
          <li key={item}>
            <Link href="#" className="hover:text-pink-400 transition">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
