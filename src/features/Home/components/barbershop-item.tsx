import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface Barbershop {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
}

interface BarbershopItemProps {
  barbershop: Barbershop;
}

function normalizeImageUrl(imageUrl: string) {
  const normalizedImageUrl = imageUrl.replaceAll("`", "").trim();
  return normalizedImageUrl || "/banner-image.png";
}

export function BarbershopItem({ barbershop }: BarbershopItemProps) {
  const imageUrl = normalizeImageUrl(barbershop.imageUrl);

  return (
    <Card className="flex h-auto w-[167px] min-w-[167px] flex-col rounded-2xl border-[#26272B] bg-[#1A1B1F] py-0 lg:h-[295px] lg:w-[220.8px] lg:min-w-[220.8px]">
      <CardContent className="flex h-full flex-1 flex-col p-0">
        <div className="p-1 pb-2">
          <div className="relative h-[159px] overflow-hidden rounded-2xl">
            <Image
              src={imageUrl}
              alt={barbershop.name}
              fill
              sizes="(min-width: 1024px) 221px, 167px"
              className="object-cover"
            />

            <div className="absolute top-1 left-1 flex items-center gap-1 rounded-2xl bg-[rgba(34,28,61,0.7)] px-2.5 py-1 backdrop-blur-[3px]">
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="text-xs font-bold text-white">5,0</span>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col px-3 pb-3">
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="w-full truncate text-base font-bold text-white">
              {barbershop.name}
            </h3>
            <p className="text-xs text-[#838896]">{barbershop.address}</p>
          </div>

          <Button className="mt-4 h-auto rounded-[10px] bg-[#26272B] px-4 py-2 text-sm font-bold text-white hover:bg-[#26272B]/90">
            <Link href={`/barbershopDetails/${barbershop.id}`}>
              {"Reservar"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
