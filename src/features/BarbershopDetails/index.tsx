import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { serializeBarbershop } from "@/lib/utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BarbershopDetailsMobile from "./barbershop-details-mobile";
import { ResponsiveLayout } from "@/components/responsive-layout";
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
    <ResponsiveLayout
      mobile={
        <BarbershopDetailsMobile
          barbershop={barbershopSerialized}
          isAuthenticated={isAuthenticated}
        />
      }
      desktop={
        <BarbershopDetailsDesktop
          barbershop={barbershopSerialized}
          isAuthenticated={isAuthenticated}
        />
      }
    />
  );
}
