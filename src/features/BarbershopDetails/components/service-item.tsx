import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  isRemoteImageUrl,
  normalizeImageUrl,
  type ServiceSerialized,
} from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceItemProps {
  service: ServiceSerialized;
}

export function ServiceItem({ service }: ServiceItemProps) {
  const imageUrl = normalizeImageUrl(service.imageUrl);

  return (
    <Card className="rounded-xl border-[#26272B] bg-[#1A1B1F]">
      <CardContent className="flex items-center gap-3 px-2">
        <div className="relative h-[110px] w-[110px] min-w-[110px] overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            alt={service.name}
            fill
            sizes="110px"
            unoptimized={isRemoteImageUrl(imageUrl)}
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold text-white">{service.name}</h3>
            <p className="line-clamp-2 text-xs text-[#838896]">
              {service.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-primary text-sm font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Button
              variant="secondary"
              className="h-9 rounded-lg bg-[#26272B] px-4 py-2 text-sm font-bold text-white hover:bg-[#26272B]/90"
            >
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
