import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import {
  BarbershopServices,
  Barbershop,
  Booking,
} from "@/generated/prisma/client/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ServiceSerialized = Omit<
  BarbershopServices,
  "price" | "createdAt" | "updatedAt"
> & {
  price: string;
  createdAt: string;
  updatedAt: string;
};

export type BarbershopSerialized = Omit<
  Barbershop,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
  services: ServiceSerialized[];
};

export type BookingSerialized = Omit<
  Booking,
  "date" | "createdAt" | "updatedAt"
> & {
  date: string;
  createdAt: string;
  updatedAt: string;
  service: Omit<ServiceSerialized, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
    barbershop: Omit<
      BarbershopSerialized,
      "services" | "createdAt" | "updatedAt"
    > & {
      createdAt: string;
      updatedAt: string;
    };
  };
};

export function serializeService(
  service: BarbershopServices,
): ServiceSerialized {
  return {
    ...service,
    price: service.price.toString(),
    createdAt: service.createdAt.toISOString(),
    updatedAt: service.updatedAt.toISOString(),
  };
}

export function serializeBarbershop(
  barbershop: Barbershop & { services: BarbershopServices[] },
): BarbershopSerialized {
  return {
    ...barbershop,
    createdAt: barbershop.createdAt.toISOString(),
    updatedAt: barbershop.updatedAt.toISOString(),
    services: barbershop.services.map(serializeService),
  };
}

export function serializeBooking(
  booking: Booking & {
    service: BarbershopServices & { barbershop: Barbershop };
  },
): BookingSerialized {
  return {
    ...booking,
    date: booking.date.toISOString(),
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
    service: {
      ...serializeService(booking.service),
      barbershop: {
        ...booking.service.barbershop,
        createdAt: booking.service.barbershop.createdAt.toISOString(),
        updatedAt: booking.service.barbershop.updatedAt.toISOString(),
      },
    },
  };
}

export function normalizeImageUrl(imageUrl?: string | null) {
  if (!imageUrl) {
    return "/banner-image.png";
  }

  const normalizedImageUrl = imageUrl.replaceAll("`", "").trim();
  return normalizedImageUrl || "/banner-image.png";
}

export function isRemoteImageUrl(imageUrl: string) {
  return imageUrl.startsWith("http://") || imageUrl.startsWith("https://");
}

export function formatWelcomeDate(date: Date = new Date()) {
  const weekdayFormatter = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
  });
  const dayFormatter = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
  });
  const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
  });

  const weekday = weekdayFormatter.format(date);
  const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  const day = dayFormatter.format(date);
  const month = monthFormatter.format(date);
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  return `${capitalizedWeekday}, ${day} de ${capitalizedMonth}`;
}
