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
  const rafId = React.useRef<number | null>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const checkScroll = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  // throttla o handler de scroll para rodar no máximo 1x por frame
  const onScroll = React.useCallback(() => {
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      checkScroll();
      rafId.current = null;
    });
  }, [checkScroll]);

  React.useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", onScroll, { passive: true });
    checkScroll(); // checagem inicial

    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [onScroll, checkScroll]);

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

      <div
        ref={scrollRef}
        className="no-scrollbar flex w-full gap-5 overflow-x-auto scroll-smooth"
      >
        {children}
      </div>

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
