import { db } from "@/lib/prisma";
import { serializeBarbershop } from "@/lib/utils";
import BarbershopDetailsMobile from "./barbershop-details-mobile";
import BarbershopDetailsDesktop from "./barbershop-details-desktop";

export default async function BarbershopDetails({ id }: { id: string }) {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return <div>Barbershop not found</div>;
  }

  const barbershopSerialized = serializeBarbershop(barbershop);

  return (
    <>
      <div className="block lg:hidden">
        <BarbershopDetailsMobile barbershop={barbershopSerialized} />
      </div>
      <div className="hidden lg:block">
        <BarbershopDetailsDesktop barbershop={barbershopSerialized} />
      </div>
    </>
  );
}
