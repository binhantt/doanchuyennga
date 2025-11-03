"use client";

import { Button } from "@/components/ui/button";
import { Heart, Utensils } from "lucide-react";
import { useHeroButtons } from "../hooks/useHeroButtons";

export default function HeroButtons() {
  const { handleViewPackages, handleExploreMenu } = useHeroButtons();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
      {/* Nút chính */}
      <Button
        onClick={handleViewPackages}
        className="group relative overflow-hidden rounded-full px-8 py-3 text-lg font-semibold 
                   text-white shadow-lg transition-all duration-300 ease-out 
                   bg-gradient-to-r from-pink-500 via-pink-600 to-rose-500
                   hover:scale-105 hover:shadow-pink-400/40"
      >
        <Heart className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
        Xem gói tiệc
      </Button>

      {/* Nút phụ */}
      <Button
        onClick={handleExploreMenu}
        variant="outline"
        className="rounded-full px-8 py-3 text-lg font-semibold text-white border-2 border-white/80
                   backdrop-blur-sm bg-white/10 transition-all duration-300
                   hover:bg-white hover:text-pink-600 hover:scale-105 hover:border-pink-500"
      >
        <Utensils className="w-5 h-5 mr-2" />
        Khám phá thực đơn
      </Button>
    </div>
  );
}
