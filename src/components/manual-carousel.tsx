"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ManualCarouselProps {
  children: React.ReactNode;
  className?: string;
}

export function ManualCarousel({ children, className }: ManualCarouselProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const checkScroll = React.useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  React.useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll);
      // Check initially
      checkScroll();

      // Handle resize
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn("group relative w-full", className)}>
      {/* Botão Esquerdo */}
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon-sm"
          className="absolute top-1/2 -left-12 z-10 hidden -translate-y-1/2 rounded-full border-[#26272B] bg-[#1A1B1F] hover:bg-[#26272B] lg:flex"
          onClick={() => scroll("left")}
        >
          <ChevronLeftIcon className="text-white" />
        </Button>
      )}

      {/* Container de Scroll */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex w-full gap-5 overflow-x-auto scroll-smooth"
      >
        {children}
      </div>

      {/* Botão Direito */}
      {showRightArrow && (
        <Button
          variant="outline"
          size="icon-sm"
          className="absolute top-1/2 -right-12 z-10 hidden -translate-y-1/2 rounded-full border-[#26272B] bg-[#1A1B1F] hover:bg-[#26272B] lg:flex"
          onClick={() => scroll("right")}
        >
          <ChevronRightIcon className="text-white" />
        </Button>
      )}
    </div>
  );
}

export function ManualCarouselItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex-none", className)}>{children}</div>;
}
