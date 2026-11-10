import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { huyenTamPrisma?: PrismaClient };

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

/**
 * Prisma is constructed only when DATABASE_URL is set.
 * Importing this module does not open a connection.
 */
export function getPrisma(): PrismaClient | null {
  if (!hasDatabase()) return null;
  if (!globalForPrisma.huyenTamPrisma) {
    globalForPrisma.huyenTamPrisma = new PrismaClient();
  }
  return globalForPrisma.huyenTamPrisma;
}
