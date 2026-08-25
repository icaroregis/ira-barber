import Header from "@/components/header/header";
import { BookingItem } from "@/components/booking-item";
import { Prisma } from "@/generated/prisma/client/client";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingsMobileProps {
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

export default function BookingsMobile({ bookings }: BookingsMobileProps) {
  const confirmedBookings = bookings.filter((booking) =>
    isFuture(booking.date),
  );
  const finishedBookings = bookings.filter((booking) => isPast(booking.date));

  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <div className="flex flex-col gap-3 px-5 py-6">
        <h1 className="mb-3 text-xl font-bold text-white">Agendamentos</h1>

        <div className="mb-6 flex flex-col gap-3">
          <h2 className="text-xs font-bold text-[#838896] uppercase">
            CONFIRMADOS
          </h2>
          {confirmedBookings.length > 0 ? (
            confirmedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                status="Confirmado"
                serviceName={booking.service.name}
                barbershopName={booking.service.barbershop.name}
                barbershopAvatar={booking.service.barbershop.imageUrl}
                month={format(booking.date, "MMMM", { locale: ptBR })}
                day={format(booking.date, "dd")}
                time={format(booking.date, "HH:mm")}
              />
            ))
          ) : (
            <p className="text-sm text-gray-400">
              Você não possui agendamentos confirmados.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-bold text-[#838896] uppercase">
            FINALIZADOS
          </h2>
          {finishedBookings.length > 0 ? (
            finishedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                status="Finalizado"
                serviceName={booking.service.name}
                barbershopName={booking.service.barbershop.name}
                barbershopAvatar={booking.service.barbershop.imageUrl}
                month={format(booking.date, "MMMM", { locale: ptBR })}
                day={format(booking.date, "dd")}
                time={format(booking.date, "HH:mm")}
              />
            ))
          ) : (
            <p className="text-sm text-gray-400">
              Você não possui agendamentos finalizados.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
