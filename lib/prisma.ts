import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient() {
    // Priority 1: Use the non-pooling URL for maximum reliability during local dev and builds
    // Priority 2: Fallback to the Prisma URL (pooling) for Vercel production optimization
    const connectionString =
        process.env.POSTGRES_URL_NON_POOLING ||
        process.env.POSTGRES_PRISMA_URL;

    if (!connectionString) {
        throw new Error("Database connection string is missing. Check your environment variables.");
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
