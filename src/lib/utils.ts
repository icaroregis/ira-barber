import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  Barbershop,
  BarbershopServices,
} from "@/app/_generated/prisma/client";

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
