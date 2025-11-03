"use client";
import { MapPin, Phone, Mail } from "lucide-react";

export default function FooterContact() {
  const contacts = [
    {
      icon: <MapPin className="w-5 h-5 text-pink-400" />,
      text: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    },
    {
      icon: <Phone className="w-5 h-5 text-pink-400" />,
      text: "+84 123 456 789",
    },
    {
      icon: <Mail className="w-5 h-5 text-pink-400" />,
      text: "info@weddingparty.vn",
    },
  ];

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 ">Liên hệ</h3>
      <ul className="space-y-3 text-gray-300">
        {contacts.map((c, index) => (
          <li key={index} className="flex items-center gap-2">
            {c.icon}
            {c.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
