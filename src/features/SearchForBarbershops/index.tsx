import { db } from "@/lib/prisma";
import SearchForBarbershopsMobile from "./search-for-barbershops-mobile";
import SearchForBarbershopsDesktop from "./search-for-barbershops-desktop";

interface SearchForBarbershopsProps {
  searchTerm: string;
}

export default async function SearchForBarbershops({
  searchTerm,
}: SearchForBarbershopsProps) {
  const where = searchTerm
    ? {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" as const } },
          { address: { contains: searchTerm, mode: "insensitive" as const } },
        ],
      }
    : {};

  const barbershops = await db.barbershop.findMany({ where });

  return (
    <>
      <div className="block lg:hidden">
        <SearchForBarbershopsMobile
          searchTerm={searchTerm}
          barbershops={barbershops}
        />
      </div>
      <div className="hidden lg:block">
        <SearchForBarbershopsDesktop
          searchTerm={searchTerm}
          barbershops={barbershops}
        />
      </div>
    </>
  );
}
