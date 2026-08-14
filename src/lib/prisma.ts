import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const globalForPrisma = globalThis as {
  cachedPrisma?: PrismaClient;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined.");
  }

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });
}

export const db = globalForPrisma.cachedPrisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.cachedPrisma = db;
}
