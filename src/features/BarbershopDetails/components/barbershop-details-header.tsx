"use client";

import Image from "next/image";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface BarbershopDetailsHeaderProps {
  imageUrl: string;
  name: string;
}

export function BarbershopDetailsHeader({
  imageUrl,
  name,
}: BarbershopDetailsHeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

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
          onClick={handleBackClick}
        >
          <ChevronLeftIcon className="text-white" size={18} />
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
