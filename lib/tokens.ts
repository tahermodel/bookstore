import prisma from "@/lib/prisma";

/**
 * Deletes all verification tokens that have passed their expiration date.
 * This can be called lazily during authentication flows to keep the database clean.
 */
export async function cleanupExpiredTokens() {
    try {
        const result = await prisma.verificationToken.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date(),
                },
            },
        });
        if (result.count > 0) {
            console.log(`[Cleanup] Deleted ${result.count} expired verification tokens.`);
        }
    } catch (error) {
        console.error("[Cleanup] Failed to delete expired tokens:", error);
    }
}
