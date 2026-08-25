import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import BookingsMobile from "./bookings-mobile";
import BookingsDesktop from "./bookings-desktop";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ResponsiveLayout } from "@/components/responsive-layout";

export default async function Bookings() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Bookings not found</div>;
  }

  const bookings = await db.booking.findMany({
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
  });

  if (!bookings) {
    return <div>Bookings not found</div>;
  }

  return (
    <ResponsiveLayout
      mobile={<BookingsMobile bookings={bookings} />}
      desktop={<BookingsDesktop bookings={bookings} />}
    />
  );
}
