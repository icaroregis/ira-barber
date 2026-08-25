import { db } from "@/lib/prisma";
import { ResponsiveLayout } from "@/components/responsive-layout";
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
    <ResponsiveLayout
      mobile={
        <div className="flex flex-1 flex-col">
          <SearchForBarbershopsMobile
            searchTerm={title || service || ""}
            barbershops={barbershops}
          />
        </div>
      }
      desktop={
        <div className="flex flex-1 flex-col">
          <SearchForBarbershopsDesktop
            searchTerm={title || service || ""}
            barbershops={barbershops}
          />
        </div>
      }
    />
  );
}
