"use client";

import { useCallback, useMemo, useState } from "react";
import { format, set, startOfToday } from "date-fns";
import { toast } from "react-toastify";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { BarbershopSerialized, ServiceSerialized } from "@/lib/utils";

// server actions
import { getBookings } from "@/actions/get-bookings";
import { createBooking } from "@/actions/create-booking";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface BookingSheetProps {
  children: React.ReactNode;
  service: ServiceSerialized;
  barbershop: BarbershopSerialized;
}

const TIME_SLOTS = [
  "08:00",
  "08:45",
  "09:30",
  "10:15",
  "11:00",
  "11:45",
  "13:00",
  "13:45",
  "14:30",
  "15:15",
  "16:00",
  "16:45",
  "17:30",
  "18:15",
];

// → ABRIR sheet (open=true, tem date selecionada):
//   → CHAMA loadBookings(date)  ← sempre recarrega dados do servidor!

// → FECHAR sheet (open=false):
//   → setBookedTimes([])
//   → setIsLoadingBookings(false)
//   → setTime(undefined)        ← limpa TUDO

export function BookingSheet({
  children,
  service,
  barbershop,
}: BookingSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

  const loadBookings = useCallback(
    async (targetDate: Date) => {
      setBookedTimes([]);
      setIsLoadingBookings(true);

      try {
        const bookings = await getBookings({
          barbershopId: barbershop.id,
          date: targetDate,
        });

        const reservedTimes = bookings.map((booking) =>
          format(new Date(booking.date), "HH:mm"),
        );

        setBookedTimes(reservedTimes);
        setTime((currentTime) =>
          currentTime && reservedTimes.includes(currentTime)
            ? undefined
            : currentTime,
        );
      } catch (error) {
        console.error(error);
        toast.error("Erro ao buscar horários reservados");
        setBookedTimes([]);
      } finally {
        setIsLoadingBookings(false);
      }
    },
    [barbershop.id],
  );

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setBookedTimes([]);
      setIsLoadingBookings(false);
      setTime(undefined);
      setDate(undefined);
    } else if (date) {
      void loadBookings(date);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setTime(undefined);
    if (selectedDate) {
      void loadBookings(selectedDate);
    } else {
      setBookedTimes([]);
    }
  };

  const availableTimeSlots = useMemo(
    () =>
      TIME_SLOTS.map((timeSlot) => ({
        value: timeSlot,
        isBooked: bookedTimes.includes(timeSlot),
      })),
    [bookedTimes],
  );

  const handleCreateBooking = async () => {
    try {
      if (!date || !time) return;
      const hours = Number(time.split(":")[0]);
      const minutes = Number(time.split(":")[1]);
      const newDate = set(date, {
        hours,
        minutes,
        seconds: 0,
        milliseconds: 0,
      });

      await createBooking({
        serviceId: service.id,
        date: newDate,
      });

      setBookedTimes((currentBookedTimes) =>
        Array.from(new Set([...currentBookedTimes, time])),
      );
      setTime(undefined);
      toast.success("Reserva criada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar reserva");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="min-w-[350px] overflow-y-auto border-l border-[#26272B] bg-[#141518] px-0 py-6">
        <SheetHeader className="border-b border-[#26272B] px-5 pb-6 text-left">
          <SheetTitle className="text-lg font-bold text-white">
            Fazer Reserva
          </SheetTitle>
        </SheetHeader>

        {/* Calendário */}
        <div className="border-b border-[#26272B]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={{ before: startOfToday() }}
            locale={ptBR}
            classNames={{
              weekday:
                "w-full text-center text-[0.8rem] font-normal capitalize text-[#838896]",
              day: "w-full",
              caption_label: "capitalize text-sm font-medium",
            }}
          />
        </div>

        {/* Lista de horários */}
        {date && (
          <div className="flex gap-3 overflow-x-auto overflow-y-hidden border-b border-[#26272B] pb-4 pl-5 [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-3">
              {availableTimeSlots.map(({ value, isBooked }) => (
                <Button
                  key={value}
                  variant={time === value ? "default" : "outline"}
                  className={`shrink-0 rounded-full ${
                    isBooked
                      ? "cursor-not-allowed border-[#26272B] bg-[#1A1B1F] text-[#838896] opacity-50 hover:bg-[#1A1B1F] hover:text-[#838896]"
                      : time === value
                        ? "bg-primary text-white"
                        : "border-[#26272B] bg-transparent text-white hover:bg-[#26272B] hover:text-white"
                  }`}
                  disabled={isLoadingBookings || isBooked}
                  onClick={() => setTime(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
        )}

        {date &&
          !isLoadingBookings &&
          availableTimeSlots.every(({ isBooked }) => isBooked) && (
            <div className="border-b border-[#26272B] px-5 py-4">
              <p className="text-sm text-[#838896]">
                Todos os horários desse dia já estão reservados.
              </p>
            </div>
          )}

        {/* Resumo da reserva */}
        <div className="p-5">
          <Card className="border-[#26272B] bg-[#1A1B1F]">
            <CardContent className="flex flex-col gap-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-white">{service.name}</h2>
                <p className="text-sm font-bold text-white">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(service.price))}
                </p>
              </div>

              {date && (
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-[#838896]">Data</h3>
                  <p className="text-sm text-white">
                    {format(date, "dd 'de' MMMM", { locale: ptBR })}
                  </p>
                </div>
              )}

              {time && (
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-[#838896]">Horário</h3>
                  <p className="text-sm text-white">{time}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <h3 className="text-sm text-[#838896]">Barbearia</h3>
                <p className="max-w-[150px] truncate text-sm text-white">
                  {barbershop.name}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <SheetFooter className="m-0 px-5 pb-6">
          <SheetClose asChild>
            <Button
              className="bg-primary w-full font-bold text-white"
              disabled={!date || !time}
              onClick={handleCreateBooking}
            >
              Confirmar reserva
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
