import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/lib/products";

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-02-24.acacia",
    })
    : null;

export async function POST(request: Request) {
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

    const origin = process.env.NEXT_PUBLIC_URL;

    if (!origin) {
        console.error("NEXT_PUBLIC_URL is missing");
        return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
    }

    try {
        const session = await stripe.checkout.sessions.create({
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
            cancel_url: `${origin}/product/${product.slug}`,
        });

        return NextResponse.redirect(session.url!, 303);
    } catch (err) {
        console.error("Stripe error:", err);
        return NextResponse.json({ error: "Checkout Failed" }, { status: 500 });
    }
}