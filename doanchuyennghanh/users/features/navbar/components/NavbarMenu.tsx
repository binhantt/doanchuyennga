"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useNavbarMenu } from "../Hooks/useNavbarMenu";

export default function NavbarMenu() {
  const { menus } = useNavbarMenu();

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-4">
        {menus.map((item) => (
          <NavigationMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} focus-visible:ring-0 focus:outline-none hover:border-none ${
                  item.active
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
