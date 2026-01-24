import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { email, code } = await request.json();

        if (!email || !code) {
            return NextResponse.json({ error: "Missing email or code" }, { status: 400 });
        }

        const token = await prisma.verificationToken.findUnique({
            where: { email },
        });

        if (!token) {
            return NextResponse.json({ error: "Invalid or expired verification attempt" }, { status: 400 });
        }

        if (token.code !== code) {
            return NextResponse.json({ error: "Incorrect verification code" }, { status: 400 });
        }

        if (new Date() > token.expiresAt) {
            return NextResponse.json({ error: "Code has expired" }, { status: 400 });
        }

        // Create the user
        await prisma.user.create({
            data: {
                email: token.email,
                name: token.name,
                password: token.password,
                emailVerified: new Date(),
            },
        });

        // Delete the verification token
        await prisma.verificationToken.delete({
            where: { email },
        });

        return NextResponse.json({ success: true, message: "Account verified and created successfully." });
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
