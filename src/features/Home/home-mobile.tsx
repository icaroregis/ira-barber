import Link from "next/link";
import Image from "next/image";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import Header from "@/components/header/header";
import { BookingSerialized } from "@/lib/utils";
import { BookingItem } from "@/components/booking-item";
import { serviceItems } from "@/constants/service-items";
import WelcomeGreeting from "./components/welcome-greeting";
import { BarbershopItem, type Barbershop } from "./components/barbershop-item";

interface HomeMobileProps {
  barbershops: Barbershop[];
  popularBarbershops: Barbershop[];
  bookings: BookingSerialized[];
}

export default function HomeMobile({
  barbershops,
  popularBarbershops,
  bookings,
}: HomeMobileProps) {
  return (
    <div className="flex flex-1 flex-col">
      {/* HEADER */}
      <Header />

      {/* SAUDAÇÃO */}
      <WelcomeGreeting variant="mobile" />

      {/* BUSCA */}
      <div className="pt-6">
        <SearchBar
          variant="mobile"
          className="flex flex-row items-center gap-2 px-5"
        />
      </div>

      {/* CATEGORIAS / SERVIÇOS */}
      <div className="pt-6 pr-5">
        <div className="flex flex-row gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <div className="w-2 shrink-0" />
          {serviceItems.map((item) => (
            <Button
              key={item.label}
              variant="outline"
              asChild
              className="flex h-10 shrink-0 flex-row items-center gap-2 rounded-lg border-[#26272B] bg-[#1A1B1F] px-4 text-sm font-bold shadow-[5px_5px_30px_0px_rgba(0,0,0,0.06)]"
            >
              <Link href={`/searchForBarbershops?service=${item.label}`}>
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
          <div className="w-2 shrink-0" />
        </div>
      </div>

      {/* BANNER */}
      <div className="px-5 pt-6">
        <div className="relative h-37.5 w-full overflow-hidden rounded-xl bg-[#221C3D]">
          {/* O container interno limita os elementos para não vazarem */}
          <div className="absolute inset-0">
            {/* Imagem do Banner - Posicionada à direita */}
            <div className="absolute top-[-25px] -right-5 h-[220px] w-[220px]">
              <Image
                src="/banner-image.png"
                alt="Agende nos melhores com FSW Barber"
                fill
                sizes="220px"
                className="object-contain"
              />
            </div>

            {/* Textos - Posicionados à esquerda */}
            <div className="absolute top-1/2 left-6 flex -translate-y-1/2 flex-col">
              <h2 className="text-[22px] leading-tight font-bold text-white">
                Agende
              </h2>
              <h2 className="text-[22px] leading-tight font-bold text-white">
                nos melhores
              </h2>
              <p className="mt-1 text-sm font-light text-white">
                com IRA Barber
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AGENDAMENTOS */}
      {bookings.length > 0 && (
        <div className="flex flex-col gap-3 px-5 pt-6">
          <h2 className="text-xs font-bold text-[#838896] uppercase">
            AGENDAMENTOS
          </h2>

          <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {bookings.map((booking) => (
              <div key={booking.id} className="min-w-[90%] shrink-0">
                <BookingItem
                  status={isFuture(booking.date) ? "Confirmado" : "Concluído"}
                  serviceName={booking.service.name}
                  barbershopName={booking.service.barbershop.name}
                  barbershopAvatar={booking.service.barbershop.imageUrl}
                  month={format(new Date(booking.date), "MMMM", {
                    locale: ptBR,
                  })}
                  day={format(new Date(booking.date), "dd")}
                  time={format(new Date(booking.date), "HH:mm")}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recomendados */}
      <div className="flex flex-col gap-3 pt-6 pr-5 pb-6">
        <h2 className="px-5 text-xs font-bold text-[#838896]">RECOMENDADOS</h2>

        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <div className="w-1 shrink-0" />
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
          <div className="w-1 shrink-0" />
        </div>
      </div>

      {/* Populares */}
      <div className="flex flex-col gap-3 pt-6 pr-5 pb-6">
        <h2 className="px-5 text-xs font-bold text-[#838896]">POPULARES</h2>

        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <div className="w-1 shrink-0" />
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
          <div className="w-1 shrink-0" />
        </div>
      </div>
    </div>
  );
}
