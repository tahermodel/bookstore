import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { email, code } = await request.json();

        if (!email || !code) {
            return NextResponse.json({ error: "Missing email or code" }, { status: 400 });
        }

        const token = await prisma.verificationToken.findUnique({
            where: { email },
        });

        if (!token || token.code !== code || token.userId !== session.user.id) {
            return NextResponse.json({ error: "Invalid or incorrect verification code" }, { status: 400 });
        }

        if (new Date() > token.expiresAt) {
            return NextResponse.json({ error: "Verification code has expired" }, { status: 400 });
        }

        // Update user email
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                email,
                emailVerified: new Date(),
            },
        });

        // Delete the token
        await prisma.verificationToken.delete({
            where: { email },
        });

        return NextResponse.json({ success: true, message: "Email updated successfully" });
    } catch (error) {
        console.error("Email verification error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
