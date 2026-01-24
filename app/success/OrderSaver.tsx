'use client';

import { useEffect } from "react";
import { getProductById } from "@/lib/products";
import Image from "next/image";

export function OrderSaver({ sessionId, productId }: { sessionId: string; productId: string }) {
    useEffect(() => {
        if (sessionId && productId) {
            fetch("/api/orders/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId, productId })
            }).catch(console.error);
        }
    }, [sessionId, productId]);

    const product = getProductById(productId);

    if (!product) return null;

    return (
        <div className="mt-8 p-6 bg-white border border-stone-200 rounded-lg max-w-sm w-full animate-fade-in-up shadow-lg shadow-stone-100">
            <div className="flex gap-4 items-center">
                {product.image && (
                    <div className="w-16 h-20 bg-stone-100 relative rounded overflow-hidden shrink-0">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <div className="text-left">
                    <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Purchased</p>
                    <p className="font-serif text-lg text-stone-900">{product.title}</p>
                    <p className="text-sm text-stone-500">${(product.price / 100).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}
