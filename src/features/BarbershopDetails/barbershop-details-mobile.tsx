import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ServiceItem } from "./components/service-item";
import { CopyPhoneItem } from "./components/copy-phone-item";

import {
  isRemoteImageUrl,
  normalizeImageUrl,
  type BarbershopSerialized,
} from "@/lib/utils";

import { ChevronLeftIcon, MenuIcon, MapPinIcon, StarIcon } from "lucide-react";

interface BarbershopDetailsMobileProps {
  barbershop: BarbershopSerialized;
}

export default function BarbershopDetailsMobile({
  barbershop,
}: BarbershopDetailsMobileProps) {
  const imageUrl = normalizeImageUrl(barbershop.imageUrl);

  return (
    <div className="flex min-h-screen flex-col bg-[#141518]">
      <main className="flex-1">
        {/* HEADER */}
        <div className="relative h-[250px] w-full">
          <Image
            src={imageUrl}
            alt={barbershop.name}
            fill
            sizes="100vw"
            unoptimized={isRemoteImageUrl(imageUrl)}
            className="object-cover"
          />

          <div className="absolute top-4 left-4 z-10">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg border-none bg-[#141518]/60 hover:bg-[#141518]"
              asChild
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

        <div className="mx-auto max-w-[1440px]">
          {/* INFO */}
          <div className="flex flex-col gap-3 border-b border-solid border-[#26272B] px-5 pt-6 pb-6">
            <h1 className="text-xl font-bold text-white">{barbershop.name}</h1>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="text-primary" size={16} />
                <p className="text-sm text-white">{barbershop.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon className="text-primary fill-primary" size={16} />
                <p className="text-sm text-white">5,0 (889 avaliações)</p>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-3 px-5 py-6">
            <h2 className="text-xs font-bold text-[#838896] uppercase">
              Sobre Nós
            </h2>
            <p className="text-sm leading-relaxed text-white">
              {barbershop.description || "Bem-vindo à nossa barbearia..."}
            </p>
          </div>

          {/* SERVICES */}
          <div className="flex flex-col gap-3 border-t border-solid border-[#26272B] px-5 py-6">
            <h2 className="text-xs font-bold text-[#838896] uppercase">
              Serviços
            </h2>
            <div className="flex flex-col gap-3">
              {barbershop.services.map((service) => (
                <ServiceItem key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col gap-3 border-t border-solid border-[#26272B] px-5 py-6">
            <h2 className="text-xs font-bold text-[#838896] uppercase">
              Contato
            </h2>
            <div className="flex flex-col gap-4">
              {barbershop.phones.map((phone, index) => (
                <CopyPhoneItem key={index} phone={phone} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
