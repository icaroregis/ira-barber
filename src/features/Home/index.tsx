import { db } from "@/lib/prisma";
import HomeMobile from "./home-mobile";
import HomeDesktop from "./home-desktop";
import { getServerSession } from "next-auth";
import { serializeBooking } from "@/lib/utils";
import { ResponsiveLayout } from "@/components/responsive-layout";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const barbershops = await db.barbershop.findMany();
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  const bookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : [];

  const serializedBookings = bookings.map((booking) =>
    serializeBooking(booking),
  );

  return (
    <ResponsiveLayout
      mobile={
        <div className="flex flex-1 flex-col">
          <HomeMobile
            barbershops={barbershops}
            popularBarbershops={popularBarbershops}
            bookings={serializedBookings}
          />
        </div>
      }
      desktop={
        <div className="flex flex-1 flex-col">
          <HomeDesktop
            barbershops={barbershops}
            popularBarbershops={popularBarbershops}
            bookings={serializedBookings}
          />
        </div>
      }
    />
  );
}
