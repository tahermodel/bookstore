import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/lib/products";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-02-24.acacia",
    })
    : null;

export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        const origin = process.env.NEXT_PUBLIC_URL || "";
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // SECURITY FIX: Ensure the user still exists in the database
    // This prevents "ghost" sessions if a user was deleted from the DB but still has a valid JWT
    const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id }
    });

    if (!dbUser) {
        return NextResponse.json({ error: "User no longer exists. Please sign out and sign in again." }, { status: 403 });
    }

    if (!stripe) {
        console.error("Stripe secret key is missing");
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    const formData = await request.formData();
    const priceId = formData.get("priceId") as string;

    const product = products.find(p => p.id === priceId);

    if (!product) {
        return NextResponse.json({ error: "Invalid Product" }, { status: 400 });
    }

    const origin = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

    try {
        const stripeSession = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.title,
                            description: product.subtitle,
                        },
                        unit_amount: product.price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&product_id=${product.id}`,
            cancel_url: `${origin}/product/${product.slug}?canceled=true`,
            metadata: {
                userId: session.user.id,
                productId: product.id,
            },
        });

        return NextResponse.redirect(stripeSession.url!, 303);
    } catch (err) {
        console.error("Stripe error:", err);
        return NextResponse.json({ error: "Checkout Failed" }, { status: 500 });
    }
}