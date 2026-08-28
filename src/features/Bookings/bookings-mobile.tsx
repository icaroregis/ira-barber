"use client";

import { useState } from "react";
import Image from "next/image";
import { ptBR } from "date-fns/locale";
import { MapPinIcon, XIcon } from "lucide-react";
import Header from "@/components/header/header";
import { format, isFuture } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingItem } from "@/components/booking-item";
import { BookingSerialized } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { CopyPhoneItem } from "../BarbershopDetails/components/copy-phone-item";
import { CancelBookingButton } from "./components/cancel-booking-button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface BookingsMobileProps {
  confirmedBookings: BookingSerialized[];
  finishedBookings: BookingSerialized[];
}

export default function BookingsMobile({
  confirmedBookings,
  finishedBookings,
}: BookingsMobileProps) {
  const [selectedBooking, setSelectedBooking] =
    useState<BookingSerialized | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleSelectBooking = (booking: BookingSerialized) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  const handleDetailsOpenChange = (open: boolean) => {
    setIsDetailsOpen(open);

    if (!open) {
      setSelectedBooking(null);
    }
  };

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
                onClick={() => handleSelectBooking(booking)}
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
                onClick={() => handleSelectBooking(booking)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-400">
              Você não possui agendamentos finalizados.
            </p>
          )}
        </div>
      </div>

      <Sheet open={isDetailsOpen} onOpenChange={handleDetailsOpenChange}>
        <SheetContent
          side="right"
          className="h-[100dvh] w-87.5 max-w-[calc(100vw-40px)] gap-0 overflow-y-auto border-[#26272B] bg-[#141518] px-0 py-0"
        >
          <SheetHeader className="sticky top-0 z-10 border-b border-[#26272B] bg-[#141518] px-5 py-4 text-left">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-bold text-white">
                Informações da Reserva
              </SheetTitle>
              <SheetClose asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-[#26272B] bg-[#1A1B1F] text-white hover:bg-[#26272B]"
                  aria-label="Fechar detalhes da reserva"
                >
                  <XIcon size={20} />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>

          {selectedBooking && (
            <div className="flex flex-col gap-6 px-5 pt-6 pb-12">
              <div className="relative flex h-45 w-full items-end overflow-hidden rounded-xl bg-[#26272B]">
                <Image
                  src="/maps.png"
                  alt="Mapa"
                  fill
                  sizes="100vw"
                  unoptimized
                  className="object-cover opacity-50"
                />
                <div className="relative mx-5 mb-5 w-full rounded-xl bg-[#141518] p-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <MapPinIcon className="text-white" size={20} />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <h3 className="truncate text-sm font-bold text-white">
                        {selectedBooking.service.barbershop.name}
                      </h3>
                      <p className="truncate text-xs text-white">
                        {selectedBooking.service.barbershop.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-xs font-bold text-[#838896] uppercase">
                  Sobre Nós
                </h2>
                <p className="text-sm leading-relaxed text-white">
                  {selectedBooking.service.barbershop.description ||
                    "Bem-vindo à nossa barbearia, onde tradição e modernidade se encontram para proporcionar a você a melhor experiência em cuidados masculinos. Nossa equipe de profissionais qualificados está pronta para oferecer cortes precisos, barbas bem desenhadas e um atendimento personalizado em um ambiente acolhedor e sofisticado."}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {selectedBooking.service.barbershop.phones.map(
                  (phone: string, index: number) => (
                    <CopyPhoneItem key={index} phone={phone} />
                  ),
                )}
              </div>

              <Card className="border-[#26272B] bg-[#1A1B1F]">
                <CardContent className="flex flex-col gap-3 p-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={`w-fit text-xs font-bold ${
                        isFuture(new Date(selectedBooking.date))
                          ? "text-primary bg-[#221C3D] hover:bg-[#221C3D]"
                          : "bg-[#26272B] text-[#838896] hover:bg-[#26272B]"
                      }`}
                    >
                      {isFuture(new Date(selectedBooking.date))
                        ? "Confirmado"
                        : "Finalizado"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-bold text-white">
                      {selectedBooking.service.name}
                    </h2>
                    <p className="shrink-0 text-sm font-bold text-white">
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(selectedBooking.service.price))}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm text-[#838896]">Data</h3>
                    <p className="text-right text-sm text-white">
                      {format(new Date(selectedBooking.date), "dd 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm text-[#838896]">Horário</h3>
                    <p className="text-sm text-white">
                      {format(new Date(selectedBooking.date), "HH:mm")}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm text-[#838896]">Barbearia</h3>
                    <p className="max-w-47.5 text-right text-sm text-white">
                      {selectedBooking.service.barbershop.name}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {isFuture(new Date(selectedBooking.date)) && (
                <CancelBookingButton
                  bookingId={selectedBooking.id}
                  className="w-full font-bold"
                  onSuccess={() => {
                    setIsDetailsOpen(false);
                    setSelectedBooking(null);
                  }}
                />
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
