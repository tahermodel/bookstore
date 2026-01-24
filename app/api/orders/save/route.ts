import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getProductById } from "@/lib/products";

export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { sessionId, productId } = body;


    const product = getProductById(productId);
    if (!product) {
        return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    try {

        const existingOrder = await prisma.order.findUnique({
            where: { stripeSessionId: sessionId }
        });

        if (existingOrder) {
            return NextResponse.json({ message: "Order already saved" });
        }

        await prisma.order.create({
            data: {
                userId: session.user.id,
                stripeSessionId: sessionId,
                productId: productId,
                amount: product.price,
                status: "paid",
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Save order error:", error);
        return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
    }
}
