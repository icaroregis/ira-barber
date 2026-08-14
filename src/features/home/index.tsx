import { SearchIcon } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Header from "@/src/components/header/header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-1 px-5 py-6">
        <h2 className="text-xl">
          Olá, <span className="font-bold">Miguel!</span>
        </h2>
        <p className="text-sm">Sexta, 2 de Fevereiro</p>
      </div>

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
    </div>
  );
}
