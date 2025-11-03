"use client";

import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";
import HeroButtons from "./HeroButtons";

export default function HeroSection() {
  return (
    <section
      className="relative w-full h-[90vh] flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1712314947761-a8d718bd8c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')",
      }}
    >
      {/* Overlay mờ */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Nội dung */}
      <div className="relative z-10 text-white px-4">
        <HeroTitle />
        <HeroDescription />
        <HeroButtons />
      </div>
    </section>
  );
}
