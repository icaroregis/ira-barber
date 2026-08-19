import Header from "@/components/header/header";
import SearchBar from "@/components/SearchBar";
import {
  BarbershopItem,
  type Barbershop,
} from "@/features/Home/components/barbershop-item";

interface SearchForBarbershopsDesktopProps {
  searchTerm: string;
  barbershops: Barbershop[];
}

export default function SearchForBarbershopsDesktop({
  searchTerm,
  barbershops,
}: SearchForBarbershopsDesktopProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#141518]">
      {/* HEADER */}
      <Header />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-32 py-10">
        <div className="mx-auto mb-10 max-w-[600px]">
          <SearchBar variant="desktop" />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-bold text-[#838896] uppercase">
            Resultados para &quot;{searchTerm}&quot;
          </h2>

          {barbershops.length > 0 ? (
            <div className="grid grid-cols-4 gap-6">
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#26272B] bg-[#1A1B1F] py-16 text-center">
              <p className="text-lg font-bold text-white">
                Nenhuma barbearia encontrada
              </p>
              <p className="text-sm text-[#838896]">
                Tente buscar por outro nome ou endereço.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
