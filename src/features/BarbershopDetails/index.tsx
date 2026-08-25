import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { serializeBarbershop } from "@/lib/utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BarbershopDetailsMobile from "./barbershop-details-mobile";
import BarbershopDetailsDesktop from "./barbershop-details-desktop";

export default async function BarbershopDetails({ id }: { id: string }) {
  const [barbershop, session] = await Promise.all([
    db.barbershop.findUnique({
      where: {
        id,
      },
      include: {
        services: true,
      },
    }),
    getServerSession(authOptions),
  ]);

  if (!barbershop) {
    return <div>Barbershop not found</div>;
  }

  const barbershopSerialized = serializeBarbershop(barbershop);
  const isAuthenticated = !!session?.user;

  return (
    <>
      <div className="block lg:hidden">
        <BarbershopDetailsMobile
          barbershop={barbershopSerialized}
          isAuthenticated={isAuthenticated}
        />
      </div>
      <div className="hidden lg:block">
        <BarbershopDetailsDesktop
          barbershop={barbershopSerialized}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </>
  );
}
