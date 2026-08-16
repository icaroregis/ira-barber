"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";

interface BarbershopDetailsHeaderProps {
  imageUrl: string;
  name: string;
}

export function BarbershopDetailsHeader({
  imageUrl,
  name,
}: BarbershopDetailsHeaderProps) {
  return (
    <div className="relative h-[250px] w-full lg:h-[480px]">
      <Image
        src={imageUrl || "/banner-image.png"}
        alt={name}
        fill
        className="object-cover"
      />

      <div className="absolute top-4 left-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg border-none bg-[#141518]/60 hover:bg-[#141518]"
        >
          <Link href="/">
            <ChevronLeftIcon className="text-white" size={18} />
          </Link>
        </Button>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg border-none bg-[#141518]/60 hover:bg-[#141518]"
        >
          <MenuIcon className="text-white" size={18} />
        </Button>
      </div>
    </div>
  );
}
