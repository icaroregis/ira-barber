import { ptBR } from "date-fns/locale";
import Header from "@/components/header/header";
import { format } from "date-fns";
import { BookingItem } from "@/components/booking-item";
import { BookingSerialized } from "@/lib/utils";

interface BookingsMobileProps {
  confirmedBookings: BookingSerialized[];
  finishedBookings: BookingSerialized[];
}

export default function BookingsMobile({
  confirmedBookings,
  finishedBookings,
}: BookingsMobileProps) {
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
                status={booking.date}
                serviceName={booking.service.name}
                barbershopName={booking.service.barbershop.name}
                barbershopAvatar={booking.service.barbershop.imageUrl}
                month={format(new Date(booking.date), "MMMM", { locale: ptBR })}
                day={format(new Date(booking.date), "dd")}
                time={format(new Date(booking.date), "HH:mm")}
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
                status={booking.date}
                serviceName={booking.service.name}
                barbershopName={booking.service.barbershop.name}
                barbershopAvatar={booking.service.barbershop.imageUrl}
                month={format(new Date(booking.date), "MMMM", { locale: ptBR })}
                day={format(new Date(booking.date), "dd")}
                time={format(new Date(booking.date), "HH:mm")}
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
