"use client";

import { useState } from "react";
import Image from "next/image";
import { ptBR } from "date-fns/locale";
import { MapPinIcon } from "lucide-react";
import { format, isFuture } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { BookingSerialized } from "@/lib/utils";
import Header from "@/components/header/header";
import { BookingItem } from "@/components/booking-item";
import { Card, CardContent } from "@/components/ui/card";
import { CopyPhoneItem } from "../BarbershopDetails/components/copy-phone-item";
import { CancelBookingButton } from "./components/cancel-booking-button";

interface BookingsDesktopProps {
  confirmedBookings: BookingSerialized[];
  finishedBookings: BookingSerialized[];
}

export default function BookingsDesktop({
  confirmedBookings,
  finishedBookings,
}: BookingsDesktopProps) {
  const [selectedBooking, setSelectedBooking] =
    useState<BookingSerialized | null>(
      confirmedBookings[0] || finishedBookings[0] || null,
    );

  return (
    <div className="flex min-h-screen flex-col bg-[#141518]">
      <Header />

      <main className="mx-auto w-full max-w-[1440px] px-32 py-10">
        <div className="grid grid-cols-12 gap-10">
          {/* LEFT SIDE - List */}
          <div className="col-span-7 flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-white">Agendamentos</h1>

            <div className="flex flex-col gap-5">
              <h2 className="text-xs font-bold text-[#838896] uppercase">
                CONFIRMADOS
              </h2>
              {confirmedBookings.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {confirmedBookings.map((booking) => (
                    <BookingItem
                      key={booking.id}
                      status={booking.date}
                      serviceName={booking.service.name}
                      barbershopName={booking.service.barbershop.name}
                      barbershopAvatar={booking.service.barbershop.imageUrl}
                      month={format(booking.date, "MMMM", { locale: ptBR })}
                      day={format(booking.date, "dd")}
                      time={format(booking.date, "HH:mm")}
                      isActive={selectedBooking?.id === booking.id}
                      onClick={() => setSelectedBooking(booking)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  Você não possui agendamentos confirmados.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="text-xs font-bold text-[#838896] uppercase">
                FINALIZADOS
              </h2>
              {finishedBookings.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {finishedBookings.map((booking) => (
                    <BookingItem
                      key={booking.id}
                      status={booking.date}
                      serviceName={booking.service.name}
                      barbershopName={booking.service.barbershop.name}
                      barbershopAvatar={booking.service.barbershop.imageUrl}
                      month={format(booking.date, "MMMM", { locale: ptBR })}
                      day={format(booking.date, "dd")}
                      time={format(booking.date, "HH:mm")}
                      isActive={selectedBooking?.id === booking.id}
                      onClick={() => setSelectedBooking(booking)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  Você não possui agendamentos finalizados.
                </p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - Details Sidebar */}
          <div className="col-span-5 flex flex-col gap-6">
            {selectedBooking ? (
              <div className="rounded-xl border border-[#26272B] bg-[#1A1B1F] p-5">
                <div className="flex flex-col gap-6">
                  {/* MAP PLACEHOLDER */}
                  <div className="relative flex h-[180px] w-full items-end overflow-hidden rounded-xl bg-[#26272B]">
                    <Image
                      src="/maps.png"
                      alt="Mapa"
                      fill
                      sizes="(max-width: 1440px) 100vw, 450px"
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

                  {/* DESCRIPTION */}
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xs font-bold text-[#838896] uppercase">
                      Sobre Nós
                    </h2>
                    <p className="text-sm leading-relaxed text-white">
                      {selectedBooking.service.barbershop.description ||
                        "Bem-vindo à nossa barbearia, onde tradição e modernidade se encontram para proporcionar a você a melhor experiência em cuidados masculinos. Nossa equipe de profissionais qualificados está pronta para oferecer cortes precisos, barbas bem desenhadas e um atendimento personalizado em um ambiente acolhedor e sofisticado."}
                    </p>
                  </div>

                  {/* CONTACT */}
                  <div className="flex flex-col gap-3">
                    {selectedBooking.service.barbershop.phones.map(
                      (phone: string, index: number) => (
                        <CopyPhoneItem key={index} phone={phone} />
                      ),
                    )}
                  </div>

                  {/* SUMMARY */}
                  <div className="mt-2">
                    <Card className="border-[#26272B] bg-[#1A1B1F]">
                      <CardContent className="flex flex-col gap-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold text-white">
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
                          </h2>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="font-bold text-white">
                            {selectedBooking.service.name}
                          </h2>
                          <p className="text-sm font-bold text-white">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(selectedBooking.service.price))}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h3 className="text-sm text-[#838896]">Data</h3>
                          <p className="text-sm text-white">
                            {format(
                              new Date(selectedBooking.date),
                              "dd 'de' MMMM",
                              {
                                locale: ptBR,
                              },
                            )}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h3 className="text-sm text-[#838896]">Horário</h3>
                          <p className="text-sm text-white">
                            {format(new Date(selectedBooking.date), "HH:mm")}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h3 className="text-sm text-[#838896]">Barbearia</h3>
                          <p className="max-w-[150px] truncate text-sm text-white">
                            {selectedBooking.service.barbershop.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* CANCEL BUTTON */}
                  {isFuture(new Date(selectedBooking.date)) && (
                    <CancelBookingButton
                      bookingId={selectedBooking.id}
                      className="w-full font-bold"
                      onSuccess={() => setSelectedBooking(null)}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-[500px] flex-col items-center justify-center rounded-xl border border-[#26272B] bg-[#1A1B1F]">
                <p className="text-sm text-[#838896]">
                  Selecione um agendamento para ver os detalhes
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
