import { db } from "@/lib/prisma";
import HomeMobile from "./home-mobile";
import HomeDesktop from "./home-desktop";
import { ResponsiveLayout } from "@/components/responsive-layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { serializeBooking } from "@/lib/utils";

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
          date: {
            gte: new Date(),
          },
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
