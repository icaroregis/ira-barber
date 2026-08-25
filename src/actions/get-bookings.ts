"use server";

import { db } from "@/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

interface GetBookingsParams {
  barbershopId: string;
  date: Date;
}

export const getBookings = async (data: GetBookingsParams) => {
  return await db.booking.findMany({
    where: {
      service: {
        barbershopId: data.barbershopId,
      },
      date: {
        lte: endOfDay(data.date),
        gte: startOfDay(data.date),
      },
    },
  });
};
