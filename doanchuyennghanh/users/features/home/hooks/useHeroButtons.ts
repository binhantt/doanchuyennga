"use client";

import { useRouter } from "next/navigation";

export const useHeroButtons = () => {
  const router = useRouter();

  const handleViewPackages = () => {
    router.push("/packages");
  };

  const handleExploreMenu = () => {
    router.push("/menu");
  };

  return { handleViewPackages, handleExploreMenu };
};
