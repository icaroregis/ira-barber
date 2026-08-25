"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { unstable_noStore } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface CreateBookingParams {
  serviceId: string;
  date: Date;
}

export const createBooking = async (data: CreateBookingParams) => {
  unstable_noStore();

  const userSession = await getServerSession(authOptions);
  const userId = userSession?.user?.id;

  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  const service = await db.barbershopServices.findUnique({
    where: { id: data.serviceId },
    select: { barbershopId: true },
  });

  if (!service) {
    throw new Error("Serviço não encontrado");
  }

  const existingBooking = await db.booking.findFirst({
    where: {
      service: {
        barbershopId: service.barbershopId,
      },
      date: data.date,
    },
  });

  if (existingBooking) {
    throw new Error("Horário já reservado");
  }

  return await db.booking.create({
    data: {
      serviceId: data.serviceId,
      date: data.date,
      userId,
    },
  });
};
