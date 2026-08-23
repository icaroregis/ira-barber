"use server";

import { db } from "@/lib/prisma";

interface CreateBookingParams {
  userId: string;
  serviceId: string;
  date: Date;
}

export const createBooking = async (data: CreateBookingParams) => {
  return await db.booking.create({
    data,
  });
};
