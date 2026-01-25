import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient() {
    const connectionString =
        process.env.POSTGRES_URL_NON_POOLING ||
        process.env.POSTGRES_PRISMA_URL;

    if (!connectionString) {
        throw new Error("Database connection string is missing.");
    }

    // Configure the 'pg' pool with SSL settings that trust Supabase
    const pool = new Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });

    const adapter = new PrismaPg(pool);

    // We cast to 'any' to bypass temporary Prisma 7 type conflicts during build
    return new PrismaClient({
        adapter: adapter as any,
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    } as any);
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
