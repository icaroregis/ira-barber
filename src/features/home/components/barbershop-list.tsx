"use client";

import { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BarbershopListProps {
  children: React.ReactNode;
}

export function BarbershopList({ children }: BarbershopListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  return (
    <div className="group relative w-full">
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pt-1 pb-4 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <Button
        size="icon"
        className="absolute top-1/2 -left-5 z-10 -translate-y-1/2 rounded-full border border-[#26272B] bg-[#1A1B1F] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-[#26272B]"
        onClick={scrollLeft}
      >
        <ChevronLeft size={20} />
      </Button>

      <Button
        size="icon"
        className="absolute top-1/2 -right-5 z-10 -translate-y-1/2 rounded-full border border-[#26272B] bg-[#1A1B1F] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-[#26272B]"
        onClick={scrollRight}
      >
        <ChevronRight size={20} />
      </Button>
    </div>
  );
}
