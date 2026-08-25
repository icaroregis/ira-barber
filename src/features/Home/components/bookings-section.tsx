"use client";

import { useSession } from "next-auth/react";
import { BookingItem } from "@/components/booking-item";

export default function BookingsSection() {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-bold text-[#838896] uppercase">
        AGENDAMENTOS
      </h2>

      <BookingItem />
    </div>
  );
}
