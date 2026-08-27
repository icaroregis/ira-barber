import { db } from "@/lib/prisma";
import { isFuture, isPast } from "date-fns";
import { getServerSession } from "next-auth";
import BookingsMobile from "./bookings-mobile";
import { serializeBooking } from "@/lib/utils";
import BookingsDesktop from "./bookings-desktop";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ResponsiveLayout } from "@/components/responsive-layout";

export default async function Bookings() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Usuário não autenticado</div>;
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
    orderBy: {
      date: "asc",
    },
  });

  if (!bookings) {
    return <div>Bookings not found</div>;
  }

  // Filtrar os agendamentos no lado do servidor
  const confirmedBookings = bookings.filter((booking) =>
    isFuture(booking.date),
  );
  const finishedBookings = bookings.filter((booking) => isPast(booking.date));

  // Serializar ambas as listas
  const serializedConfirmed = confirmedBookings.map((booking) =>
    serializeBooking(booking),
  );
  const serializedFinished = finishedBookings.map((booking) =>
    serializeBooking(booking),
  );

  return (
    <ResponsiveLayout
      mobile={
        <BookingsMobile
          confirmedBookings={serializedConfirmed}
          finishedBookings={serializedFinished}
        />
      }
      desktop={
        <BookingsDesktop
          confirmedBookings={serializedConfirmed}
          finishedBookings={serializedFinished}
        />
      }
    />
  );
}
