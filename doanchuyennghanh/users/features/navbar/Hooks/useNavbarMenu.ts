"use client";
import { usePathname } from "next/navigation";

export const useNavbarMenu = () => {
  // Lấy URL hiện tại
  const pathname = usePathname();

  // Danh sách menu
  const menus = [
    { label: "Trang chủ", href: "/" },
    { label: "Gói Cưới", href: "/wedding-packages" },
    { label: "Dịch vụ", href: "/services" },
    { label: "Sản phẩm", href: "/products" },
    { label: "Giỏ hàng", href: "/cart" },
    { label: "Liên hệ", href: "/contact" },
  ];

  // Trả về danh sách menu có gắn cờ active
  const menusWithActive = menus.map((menu) => ({
    ...menu,
    active: pathname === menu.href,
  }));

  return { menus: menusWithActive };
};
