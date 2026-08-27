import SearchBar from "@/components/SearchBar";
import Header from "@/components/header/header";
import WelcomeGreeting from "./components/welcome-greeting";
import { BarbershopItem, type Barbershop } from "./components/barbershop-item";
import {
  ManualCarousel,
  ManualCarouselItem,
} from "@/components/manual-carousel";
import { BookingItem } from "@/components/booking-item";
import { BookingSerialized } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface HomeDesktopProps {
  barbershops: Barbershop[];
  popularBarbershops: Barbershop[];
  confirmedBookings: BookingSerialized[];
}

export default function HomeDesktop({
  barbershops,
  popularBarbershops,
  confirmedBookings,
}: HomeDesktopProps) {
  return (
    <div className="flex flex-1 flex-col bg-[#141518]">
      {/* HEADER */}
      <Header />

      <main className="flex-1">
        {/* HERO SECTION (Fundo escuro com imagem) */}
        <div className="relative w-full bg-[#1A1B1F] bg-[url('/banner-desktop.png')] bg-cover bg-center bg-no-repeat pt-16 pb-16">
          {/* Overlay escuro para melhorar contraste */}
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative mx-auto flex max-w-[1440px] px-32">
            {/* ESQUERDA: Saudação, Busca e Agendamentos */}
            <div className="flex w-[400px] shrink-0 flex-col gap-8">
              <div className="flex flex-col gap-6">
                <WelcomeGreeting variant="desktop" />
                <SearchBar variant="desktop" />
              </div>

              {confirmedBookings.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h2 className="text-xs font-bold text-[#838896] uppercase">
                    AGENDAMENTOS
                  </h2>
                  {confirmedBookings.map((booking) => (
                    <BookingItem
                      key={booking.id}
                      status="Confirmado"
                      serviceName={booking.service.name}
                      barbershopName={booking.service.barbershop.name}
                      barbershopAvatar={booking.service.barbershop.imageUrl}
                      month={format(new Date(booking.date), "MMMM", {
                        locale: ptBR,
                      })}
                      day={format(new Date(booking.date), "dd")}
                      time={format(new Date(booking.date), "HH:mm")}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* DIREITA: Recomendados */}
            <div className="ml-32 flex min-w-0 flex-1 flex-col gap-3">
              <h2 className="text-xs font-bold text-[#838896] uppercase">
                RECOMENDADOS
              </h2>
              <ManualCarousel>
                {barbershops.map((barbershop) => (
                  <ManualCarouselItem key={barbershop.id}>
                    <BarbershopItem barbershop={barbershop} />
                  </ManualCarouselItem>
                ))}
              </ManualCarousel>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION (Populares e Mais Visitados) */}
        <div className="mx-auto flex max-w-[1440px] min-w-0 flex-col gap-10 px-32 py-10">
          {/* POPULARES */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white">Populares</h2>
            <ManualCarousel>
              {popularBarbershops.map((barbershop) => (
                <ManualCarouselItem key={barbershop.id}>
                  <BarbershopItem barbershop={barbershop} />
                </ManualCarouselItem>
              ))}
            </ManualCarousel>
          </div>

          {/* MAIS VISITADOS */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white">Mais Visitados</h2>
            <ManualCarousel>
              {barbershops.map((barbershop) => (
                <ManualCarouselItem key={barbershop.id}>
                  <BarbershopItem barbershop={barbershop} />
                </ManualCarouselItem>
              ))}
            </ManualCarousel>
          </div>
        </div>
      </main>
    </div>
  );
}
