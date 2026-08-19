import { db } from "@/lib/prisma";
import SearchForBarbershopsMobile from "./search-for-barbershops-mobile";
import SearchForBarbershopsDesktop from "./search-for-barbershops-desktop";
interface SearchForBarbershopsProps {
  title?: string;
  service?: string;
}

export default async function SearchForBarbershops({
  title,
  service,
}: SearchForBarbershopsProps) {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        title
          ? {
              name: {
                contains: title,
                mode: "insensitive",
              },
            }
          : {},
        service
          ? {
              services: {
                some: {
                  name: {
                    contains: service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  });

  return (
    <>
      <div className="flex flex-1 flex-col lg:hidden">
        <SearchForBarbershopsMobile
          searchTerm={title || service || ""}
          barbershops={barbershops}
        />
      </div>
      <div className="hidden flex-1 flex-col lg:flex">
        <SearchForBarbershopsDesktop
          searchTerm={title || service || ""}
          barbershops={barbershops}
        />
      </div>
    </>
  );
}
