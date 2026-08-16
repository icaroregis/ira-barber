import { ServiceItem } from "./components/service-item";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Image from "next/image";
import { MapPinIcon, StarIcon, SmartphoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BarbershopSerialized } from "@/lib/utils";

interface BarbershopDetailsDesktopProps {
  barbershop: BarbershopSerialized;
}

export default function BarbershopDetailsDesktop({
  barbershop,
}: BarbershopDetailsDesktopProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#141518]">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-[1440px] px-32 py-10">
          <div className="grid grid-cols-[1fr_400px] gap-10">
            {/* ESQUERDA: Info, Descrição e Serviços */}
            <div className="flex flex-col gap-10">
              {/* Banner Desktop */}
              <div className="relative h-[480px] w-full overflow-hidden rounded-2xl">
                <Image
                  src={barbershop.imageUrl || "/banner-image.png"}
                  alt={barbershop.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info e Descrição */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-white">
                      {barbershop.name}
                    </h1>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="text-primary" size={18} />
                      <p className="text-sm text-white">{barbershop.address}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1 rounded-lg border border-solid border-[#26272B] bg-[#1A1B1F] p-3">
                    <div className="flex items-center gap-2">
                      <StarIcon
                        className="text-primary fill-primary"
                        size={20}
                      />
                      <span className="text-xl font-bold text-white">5,0</span>
                    </div>
                    <p className="text-xs text-[#838896]">889 avaliações</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xs font-bold text-[#838896] uppercase">
                    Sobre Nós
                  </h2>
                  <p className="text-base leading-relaxed text-[#838896]">
                    {barbershop.description || "Bem-vindo à nossa barbearia..."}
                  </p>
                </div>
              </div>

              {/* Serviços em Grid */}
              <div className="flex flex-col gap-4">
                <h2 className="text-xs font-bold text-[#838896] uppercase">
                  Serviços
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} service={service} />
                  ))}
                </div>
              </div>
            </div>

            {/* DIREITA: Contato e Mapa (Simulado) */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-solid border-[#26272B] bg-[#1A1B1F] p-5">
                <h2 className="mb-6 text-xs font-bold text-[#838896] uppercase">
                  Contato
                </h2>

                <div className="flex flex-col gap-4">
                  {barbershop.phones.map((phone, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <SmartphoneIcon className="text-white" size={20} />
                        <p className="text-sm text-white">{phone}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-lg border-[#26272B] bg-[#1A1B1F] px-4 text-sm font-bold text-white hover:bg-[#26272B]"
                      >
                        Copiar
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
