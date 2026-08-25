import Header from "@/components/header/header";
import { BookingItem } from "@/components/booking-item";

export default function BookingsMobile() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <div className="flex flex-col gap-3 px-5 py-6">
        <h1 className="mb-3 text-xl font-bold text-white">Agendamentos</h1>

        {/* Confirmados */}
        <div className="mb-6 flex flex-col gap-3">
          <h2 className="text-xs font-bold text-[#838896] uppercase">
            CONFIRMADOS
          </h2>
          <BookingItem
            status="Confirmado"
            serviceName="Corte de Cabelo"
            barbershopName="Vintage Barber"
            month="Agosto"
            day="06"
            time="09:45"
          />
        </div>

        {/* Finalizados */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-bold text-[#838896] uppercase">
            FINALIZADOS
          </h2>
          <BookingItem
            status="Finalizado"
            serviceName="Corte de Cabelo"
            barbershopName="Vintage Barber"
            month="Julho"
            day="22"
            time="09:00"
          />
          <BookingItem
            status="Finalizado"
            serviceName="Corte de Cabelo"
            barbershopName="Vintage Barber"
            month="Julho"
            day="07"
            time="12:40"
          />
          <BookingItem
            status="Finalizado"
            serviceName="Corte de Cabelo"
            barbershopName="Vintage Barber"
            month="Junho"
            day="23"
            time="19:10"
          />
        </div>
      </div>
    </div>
  );
}
