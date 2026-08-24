"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface CreateBookingParams {
  serviceId: string;
  date: Date;
}

export const createBooking = async (data: CreateBookingParams) => {
  // O id está sendo resgatado aqui do servidor por questão de segurança, no cliente alguém pode roubar o id do usuário e fazer um agendamento com esse id.
  const userSession = await getServerSession(authOptions);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (userSession?.user as any)?.id;

  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  return await db.booking.create({
    data: {
      serviceId: data.serviceId,
      date: data.date,
      userId,
    },
  });
};
