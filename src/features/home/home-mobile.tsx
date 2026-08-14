import Image from "next/image";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/header/header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  RecommendedBarbershopItem,
  type RecommendedBarbershop,
} from "./components/mobile/recommended-barbershop-item";

interface HomeMobileProps {
  barbershops: RecommendedBarbershop[];
  popularBarbershops: RecommendedBarbershop[];
}

export default function HomeMobile({
  barbershops,
  popularBarbershops,
}: HomeMobileProps) {
  return (
    <div>
      {/* HEADER */}
      <Header />

      {/* SAUDAÇÃO */}
      <div className="flex flex-col gap-1 px-5 py-6">
        <h2 className="text-xl">
          Olá, <span className="font-bold">Miguel!</span>
        </h2>
        <p className="text-sm">Sexta, 2 de Fevereiro</p>
      </div>

      {/* BUSCA */}
      <div className="flex flex-row items-center gap-2 px-5">
        <Input
          placeholder="Buscar"
          className="h-9 border-[#26272B] bg-[#1A1B1F] text-sm placeholder:text-[#838896]"
        />
        <Button
          size="icon"
          className="bg-primary hover:bg-primary/90 h-9 w-9 rounded-lg"
        >
          <SearchIcon size={20} />
        </Button>
      </div>

      {/* CATEGORIAS / SERVIÇOS */}
      <div className="flex flex-row gap-3 overflow-x-auto px-5 pt-6 [&::-webkit-scrollbar]:hidden">
        <Button
          variant="outline"
          className="flex h-10 shrink-0 flex-row items-center gap-2 rounded-lg border-[#26272B] bg-[#1A1B1F] px-4 text-sm font-bold shadow-[5px_5px_30px_0px_rgba(0,0,0,0.06)]"
        >
          <Image src="/scissors-icon.svg" alt="Cabelo" width={16} height={16} />
          Cabelo
        </Button>

        <Button
          variant="outline"
          className="flex h-10 shrink-0 flex-row items-center gap-2 rounded-lg border-[#26272B] bg-[#1A1B1F] px-4 text-sm font-bold shadow-[5px_5px_30px_0px_rgba(0,0,0,0.06)]"
        >
          <Image src="/mustache-icon.svg" alt="Barba" width={16} height={16} />
          Barba
        </Button>

        <Button
          variant="outline"
          className="flex h-10 shrink-0 flex-row items-center gap-2 rounded-lg border-[#26272B] bg-[#1A1B1F] px-4 text-sm font-bold shadow-[5px_5px_30px_0px_rgba(0,0,0,0.06)]"
        >
          <Image
            src="/razor-icon.svg"
            alt="Acabamento"
            width={16}
            height={16}
          />
          Acabamento
        </Button>

        <Button
          variant="outline"
          className="flex h-10 shrink-0 flex-row items-center gap-2 rounded-lg border-[#26272B] bg-[#1A1B1F] px-4 text-sm font-bold shadow-[5px_5px_30px_0px_rgba(0,0,0,0.06)]"
        >
          Sobrancelha
        </Button>
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
      <div className="flex flex-col gap-3 px-5 pt-6 pb-6">
        <h2 className="text-xs font-bold text-[#838896]">AGENDAMENTOS</h2>
        <Card className="rounded-xl border-[#26272B] bg-[#1A1B1F]">
          <CardContent className="flex flex-row p-0">
            {/* Lado Esquerdo - Info */}
            <div className="flex flex-1 flex-col gap-2 py-3 pr-5 pl-3">
              <Badge className="text-primary w-fit bg-[#221C3D] text-xs font-bold hover:bg-[#221C3D]">
                Confirmado
              </Badge>

              <h3 className="text-base font-bold text-white">
                Corte de Cabelo
              </h3>

              <div className="flex flex-row items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/avatar.png" alt="Vintage Barber" />
                  <AvatarFallback>VB</AvatarFallback>
                </Avatar>
                <p className="text-sm font-normal text-white">Vintage Barber</p>
              </div>
            </div>

            {/* Lado Direito - Data/Hora */}
            <div className="flex w-26.5 shrink-0 flex-col items-center justify-center border-l border-solid border-[#26272B] px-9 py-3">
              <p className="text-xs text-white">Fevereiro</p>
              <p className="text-2xl font-normal text-white">06</p>
              <p className="text-xs text-white">09:45</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recomendados */}
      <div className="flex flex-col gap-3 px-5 pt-6 pb-6">
        <h2 className="text-xs font-bold text-[#838896]">RECOMENDADOS</h2>

        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <RecommendedBarbershopItem
              key={barbershop.id}
              barbershop={barbershop}
            />
          ))}
        </div>
      </div>

      {/* Populares */}
      <div className="flex flex-col gap-3 px-5 pt-6 pb-6">
        <h2 className="text-xs font-bold text-[#838896]">POPULARES</h2>

        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <RecommendedBarbershopItem
              key={barbershop.id}
              barbershop={barbershop}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
