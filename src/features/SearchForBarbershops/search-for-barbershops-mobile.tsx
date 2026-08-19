import Header from "@/components/header/header";
import SearchBar from "@/features/Home/components/SearchBar";
import {
  BarbershopItem,
  type Barbershop,
} from "@/features/Home/components/barbershop-item";

interface SearchForBarbershopsMobileProps {
  searchTerm: string;
  barbershops: Barbershop[];
}

export default function SearchForBarbershopsMobile({
  searchTerm,
  barbershops,
}: SearchForBarbershopsMobileProps) {
  return (
    <div>
      {/* HEADER */}
      <Header />

      <div className="px-5 pt-6">
        <SearchBar variant="mobile" />
      </div>

      <div className="flex flex-col gap-4 px-5 pt-6 pb-12">
        <h2 className="text-xs font-bold text-[#838896] uppercase">
          Resultados para &quot;{searchTerm}&quot;
        </h2>

        {barbershops.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <p className="text-sm font-bold text-white">
              Nenhuma barbearia encontrada
            </p>
            <p className="text-xs text-[#838896]">
              Tente buscar por outro nome ou endereço.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
