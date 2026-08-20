import Image from "next/image";
import Header from "@/components/header/header";
import { MapPinIcon, StarIcon } from "lucide-react";
import { ServiceItem } from "./components/service-item";
import { CopyPhoneItem } from "./components/copy-phone-item";

import {
  isRemoteImageUrl,
  normalizeImageUrl,
  type BarbershopSerialized,
} from "@/lib/utils";

const OPENING_HOURS = [
  { day: "Segunda-feira", hours: "Fechado" },
  { day: "Terça-feira", hours: "09:00 - 21:00" },
  { day: "Quarta-feira", hours: "09:00 - 21:00" },
  { day: "Quinta-feira", hours: "09:00 - 21:00" },
  { day: "Sexta-feira", hours: "09:00 - 21:00" },
  { day: "Sábado", hours: "08:00 - 18:00" },
  { day: "Domingo", hours: "Fechado" },
];

interface BarbershopDetailsDesktopProps {
  barbershop: BarbershopSerialized;
}

export default function BarbershopDetailsDesktop({
  barbershop,
}: BarbershopDetailsDesktopProps) {
  const imageUrl = normalizeImageUrl(barbershop.imageUrl);

  return (
    <div className="flex min-h-screen flex-col bg-[#141518]">
      <Header />

      <main className="mx-auto w-full max-w-[1440px] px-32 py-10">
        <div className="grid grid-cols-12 gap-10">
          {/* LEFT SIDE - Main Content */}
          <div className="col-span-8 flex flex-col gap-10">
            {/* BANNER & INFO */}
            <div className="flex flex-col gap-6">
              <div className="relative h-[480px] w-full overflow-hidden rounded-xl">
                <Image
                  src={imageUrl}
                  alt={barbershop.name}
                  fill
                  sizes="(max-width: 1440px) 100vw, 800px"
                  priority
                  unoptimized={isRemoteImageUrl(imageUrl)}
                  className="object-cover"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-bold text-white">
                    {barbershop.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="text-primary" size={16} />
                    <p className="text-sm text-white">{barbershop.address}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg bg-[#1A1B1F] px-5 py-3 text-center">
                  <div className="flex items-center gap-2">
                    <StarIcon className="text-primary fill-primary" size={20} />
                    <span className="text-xl font-bold text-white">5,0</span>
                  </div>
                  <p className="text-xs text-white">889 avaliações</p>
                </div>
              </div>
            </div>

            {/* SERVICES */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-bold text-[#838896] uppercase">
                Serviços
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {barbershop.services.map((service) => (
                  <ServiceItem
                    key={service.id}
                    service={service}
                    barbershop={barbershop}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Sidebar */}
          <div className="col-span-4 flex flex-col gap-6">
            <div className="rounded-xl border border-[#26272B] bg-[#1A1B1F] p-5">
              <div className="flex flex-col gap-6">
                {/* MAP PLACEHOLDER */}
                <div className="relative flex h-[180px] w-full items-end overflow-hidden rounded-xl bg-[#26272B]">
                  <Image
                    src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=dark%20themed%20city%20map%20with%20a%20location%20pin&image_size=landscape_4_3"
                    alt="Mapa"
                    fill
                    sizes="(max-width: 1440px) 100vw, 450px"
                    unoptimized
                    className="object-cover opacity-50"
                  />
                  <div className="relative mx-5 mb-5 w-full rounded-xl bg-[#141518] p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
                        <MapPinIcon className="text-white" size={20} />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-sm font-bold text-white">
                          {barbershop.name}
                        </h3>
                        <p className="line-clamp-1 text-xs text-white">
                          {barbershop.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-xs font-bold text-[#838896] uppercase">
                    Sobre Nós
                  </h2>
                  <p className="text-sm leading-relaxed text-white">
                    {barbershop.description ||
                      "Bem-vindo à nossa barbearia, onde tradição e modernidade se encontram para proporcionar a você a melhor experiência em cuidados masculinos. Nossa equipe de profissionais qualificados está pronta para oferecer cortes precisos, barbas bem desenhadas e um atendimento personalizado em um ambiente acolhedor e sofisticado."}
                  </p>
                </div>

                {/* CONTACT */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-sm font-bold text-white uppercase">
                    Contato
                  </h2>
                  <div className="flex flex-col gap-3">
                    {barbershop.phones.map((phone, index) => (
                      <CopyPhoneItem key={index} phone={phone} />
                    ))}
                  </div>
                </div>

                <div className="h-[1px] w-full bg-[#26272B]" />

                {/* OPENING HOURS */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    {OPENING_HOURS.map((item) => (
                      <div
                        key={item.day}
                        className="flex items-center justify-between"
                      >
                        <p className="text-sm text-[#838896]">{item.day}</p>
                        <p className="text-sm text-white">{item.hours}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-[1px] w-full bg-[#26272B]" />

                {/* FOOTER LINK */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white">Em parceria com</p>
                  <Image
                    src="/logo.jpeg"
                    alt="IRA Barber"
                    width={100}
                    height={18}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
