import { Prisma } from "@/generated/prisma/client/client";

interface BookingsDesktopProps {
  bookings: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>[];
}

export default function BookingsDesktop({ bookings }: BookingsDesktopProps) {
  console.log(bookings, "lista de agendamentos");
  return (
    <div>
      <h1>Agendamentos desktop em desenvolvimento...</h1>
    </div>
  );
}
