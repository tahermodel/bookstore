import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";
import { cleanupExpiredTokens } from "@/lib/tokens";

export async function POST(request: Request) {
    try {
        // Clean up expired tokens in background
        cleanupExpiredTokens();

        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Missing email" }, { status: 400 });
        }

        const token = await prisma.verificationToken.findUnique({
            where: { email },
        });

        if (!token) {
            return NextResponse.json({ error: "No pending verification found for this email" }, { status: 400 });
        }

        // Generate new code
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        const newExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await prisma.verificationToken.update({
            where: { email },
            data: {
                code: newCode,
                expiresAt: newExpiresAt,
            }
        });

        const { success } = await sendVerificationEmail(email, newCode);

        if (!success) {
            return NextResponse.json({ error: "Failed to resend email" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "A new code has been sent to your email." });
    } catch (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
