import { db } from "@/lib/prisma";
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

  return (
    <>
      <div className="block lg:hidden">
        <BarbershopDetailsMobile barbershop={barbershop} />
      </div>
      <div className="hidden lg:block">
        <BarbershopDetailsDesktop barbershop={barbershop} />
      </div>
    </>
  );
}
