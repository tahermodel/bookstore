'use client';

import { useEffect } from "react";
import { saveOrder } from "@/lib/orders";
import { getProduct } from "@/lib/products";

export function OrderSaver({ sessionId, productId }: { sessionId: string; productId: string }) {
    useEffect(() => {
        if (sessionId && productId) {
            saveOrder(sessionId, productId);
        }
    }, [sessionId, productId]);

    const product = getProduct(productId);

    if (!product) return null;

    return (
        <div className="mt-8 p-6 bg-stone-50 border border-stone-100 max-w-md w-full animate-fade-in">
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Added to Archive</p>
            <div className="font-serif text-lg text-stone-900">{product.title}</div>
        </div>
    );
}
