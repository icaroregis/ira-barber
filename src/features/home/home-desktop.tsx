import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarbershopItem, type Barbershop } from "./components/barbershop-item";
import {
  ManualCarousel,
  ManualCarouselItem,
} from "@/components/manual-carousel";

interface HomeDesktopProps {
  barbershops: Barbershop[];
  popularBarbershops: Barbershop[];
}

export default function HomeDesktop({
  barbershops,
  popularBarbershops,
}: HomeDesktopProps) {
  // Simulação de estado de login
  const isAuthenticated = true;

  return (
    <div className="flex min-h-screen flex-col bg-[#141518]">
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
                <div className="flex flex-col gap-1">
                  {isAuthenticated ? (
                    <h2 className="text-3xl text-white">
                      Olá, <span className="font-bold">Miguel!</span>
                    </h2>
                  ) : (
                    <h2 className="text-3xl font-bold text-white">
                      Olá, Faça seu login!
                    </h2>
                  )}
                  <p className="text-base text-gray-300">
                    Sexta, 2 de Fevereiro
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Buscar Barbearias"
                    className="h-11 border-none bg-[#26272B] text-base text-white placeholder:text-[#838896]"
                  />
                  <Button
                    size="icon"
                    className="bg-primary hover:bg-primary/90 h-11 w-11 shrink-0 rounded-lg"
                  >
                    <SearchIcon size={20} />
                  </Button>
                </div>
              </div>

              {isAuthenticated && (
                <div className="flex flex-col gap-3">
                  <h2 className="text-xs font-bold text-[#838896] uppercase">
                    AGENDAMENTOS
                  </h2>

                  <Card className="rounded-xl border-[#26272B] bg-[#1A1B1F]/80 backdrop-blur-sm">
                    <CardContent className="flex p-0">
                      {/* Lado Esquerdo - Info */}
                      <div className="flex flex-1 flex-col gap-3 p-5">
                        <Badge className="text-primary w-fit bg-[#221C3D] text-xs font-bold hover:bg-[#221C3D]">
                          Confirmado
                        </Badge>
                        <h3 className="text-base font-bold text-white">
                          Corte de Cabelo
                        </h3>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src="/avatar.png"
                              alt="Vintage Barber"
                            />
                            <AvatarFallback>VB</AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-normal text-white">
                            Vintage Barber
                          </p>
                        </div>
                      </div>

                      {/* Lado Direito - Data/Hora */}
                      <div className="flex flex-col items-center justify-center border-l border-solid border-[#26272B] px-8">
                        <p className="text-sm text-white">Fevereiro</p>
                        <p className="text-[28px] font-normal text-white">06</p>
                        <p className="text-sm text-white">09:45</p>
                      </div>
                    </CardContent>
                  </Card>
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

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
