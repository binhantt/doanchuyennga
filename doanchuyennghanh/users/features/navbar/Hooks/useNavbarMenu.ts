"use client";
import { usePathname } from "next/navigation";

export const useNavbarMenu = () => {
  // Lấy URL hiện tại
  const pathname = usePathname();

  // Danh sách menu
  const menus = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/products" },
    { label: "Giới thiệu", href: "/about" },
    { label: "Liên hệ", href: "/contact" },
  ];

  // Trả về danh sách menu có gắn cờ active
  const menusWithActive = menus.map((menu) => ({
    ...menu,
    active: pathname === menu.href,
  }));

  return { menus: menusWithActive };
};
