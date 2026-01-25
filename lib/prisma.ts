import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient() {
    // Priority 1: Use the non-pooling URL for maximum reliability
    // Priority 2: Fallback to the Prisma URL (pooling)
    let connectionString =
        process.env.POSTGRES_URL_NON_POOLING ||
        process.env.POSTGRES_PRISMA_URL;

    if (!connectionString) {
        throw new Error("Database connection string is missing. Check your environment variables.");
    }

    // Force SSL settings for Supabase
    if (connectionString.includes("supabase.com") && !connectionString.includes("sslmode=")) {
        const separator = connectionString.includes("?") ? "&" : "?";
        connectionString += `${separator}sslmode=require`;
    }

    return new PrismaClient({
        datasourceUrl: connectionString,
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
