"use client";

import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  variant?: "mobile" | "desktop";
  className?: string;
}

export default function SearchBar({
  variant = "mobile",
  className,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") ?? "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const inputClass =
    variant === "mobile"
      ? "h-9 border-[#26272B] bg-[#1A1B1F] text-sm placeholder:text-[#838896]"
      : "h-11 border-none bg-[#26272B] text-base text-white placeholder:text-[#838896]";
  const buttonClass =
    variant === "mobile"
      ? "bg-primary hover:bg-primary/90 h-9 w-9 rounded-lg"
      : "bg-primary hover:bg-primary/90 h-11 w-11 shrink-0 rounded-lg";
  const placeholder = variant === "mobile" ? "Buscar" : "Buscar Barbearias";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = searchTerm.trim();
        if (!trimmed) return;
        router.push(
          `/searchForBarbershops?search=${encodeURIComponent(trimmed)}`,
        );
      }}
      className={className ?? "flex items-center gap-2"}
    >
      <Input
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
      <Button
        type="submit"
        size="icon"
        className={buttonClass}
        aria-label="Buscar"
      >
        <SearchIcon size={20} />
      </Button>
    </form>
  );
}
