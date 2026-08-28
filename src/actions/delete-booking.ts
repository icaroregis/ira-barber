"use server";

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { unstable_noStore } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface DeleteBookingParams {
  bookingId: string;
}

export const deleteBooking = async ({ bookingId }: DeleteBookingParams) => {
  unstable_noStore();

  const userSession = await getServerSession(authOptions);
  const userId = userSession?.user?.id;

  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  const booking = await db.booking.findUnique({
    where: {
      id: bookingId,
    },
    select: {
      id: true,
      userId: true,
      date: true,
    },
  });

  if (!booking || booking.userId !== userId) {
    throw new Error("Reserva não encontrada");
  }

  if (booking.date <= new Date()) {
    throw new Error("Apenas reservas futuras podem ser canceladas");
  }

  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });
};
