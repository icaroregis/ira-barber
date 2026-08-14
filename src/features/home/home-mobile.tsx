import Image from "next/image";
import { SearchIcon } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Header from "@/src/components/header/header";

export default function HomeMobile() {
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
        <div className="relative h-[150px] w-full overflow-hidden rounded-xl bg-[#221C3D]">
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
    </div>
  );
}
