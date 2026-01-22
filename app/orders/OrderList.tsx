'use client';

import { useEffect, useState } from "react";
import { getOrders, Order } from "@/lib/orders";
import { getProduct, Product } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

export function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = getOrders();
        console.log("OrderList: Retrieved orders", stored);
        setOrders(stored);
        setLoading(false);
    }, []);

    if (loading) {
        return <div className="text-sm text-stone-400 font-mono animate-pulse">Scanning archive...</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="bg-stone-50 p-12 text-center border border-stone-100">
                <p className="text-stone-500 mb-6 font-serif italic">
                    No records found.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            {orders.map((order, index) => {
                const product = getProduct(order.productId);
                if (!product) return null;

                return (
                    <div key={order.sessionId + index} className="flex gap-6 items-start py-6 border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors p-4 -mx-4 rounded">
                        <div className="w-20 h-24 bg-stone-100 relative shrink-0">
                            {product.image && (
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-serif text-xl text-stone-900 leading-tight">
                                    {product.title}
                                </h3>
                                <span className="text-xs font-mono text-stone-400 shrink-0 ml-4">
                                    {new Date(order.date).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-stone-500 mb-4">{product.subtitle}</p>
                            <div className="text-xs font-mono text-stone-400 uppercase tracking-widest flex gap-4">
                                <span>PID: {order.productId.slice(-6)}</span>
                                <span className="text-green-600">Confirmed</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
