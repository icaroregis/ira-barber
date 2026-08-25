"use server";

import { db } from "@/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";
import { unstable_noStore } from "next/cache";

interface GetBookingsParams {
  barbershopId: string;
  date: Date;
}

export const getBookings = async (data: GetBookingsParams) => {
  unstable_noStore();

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
