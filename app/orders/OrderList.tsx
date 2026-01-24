'use client';

import { useState } from "react";
import { getProductById } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define strict type matching the DB or simplified
interface DBOrder {
    id: string;
    stripeSessionId: string;
    productId: string;
    createdAt: Date;
    status: string;
}

export function OrderList({ initialOrders }: { initialOrders: DBOrder[] }) {
    const router = useRouter();
    const [refundingFnId, setRefundingFnId] = useState<string | null>(null);

    const handleRefund = async (orderId: string) => {
        if (!confirm("Are you sure you want to refund this item? Use this mainly for testing.")) return;

        setRefundingFnId(orderId);
        try {
            const res = await fetch("/api/refund", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId })
            });

            if (res.ok) {
                router.refresh(); // Refresh server component data
            } else {
                alert("Refund failed. Check console.");
            }
        } catch (error) {
            console.error(error);
            alert("Error processing refund.");
        } finally {
            setRefundingFnId(null);
        }
    };

    if (initialOrders.length === 0) {
        return (
            <div className="bg-stone-50 p-12 text-center border border-stone-100">
                <p className="text-stone-500 mb-6 font-serif italic">
                    No verified records found.
                </p>
                <Link href="/" className="text-xs font-bold tracking-widest uppercase border-b border-black pb-1 hover:opacity-50 transition-opacity">
                    Browse Archive
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            {initialOrders.map((order) => {
                const product = getProductById(order.productId);
                if (!product) return null;

                const isRefunding = refundingFnId === order.id;
                const isRefunded = order.status === "refunded";

                return (
                    <div key={order.id} className={`flex gap-6 items-start py-6 border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors p-4 -mx-4 rounded ${isRefunded ? 'opacity-50 grayscale' : ''}`}>
                        <Link href={`/product/${product.slug}`} className="w-20 h-24 bg-stone-100 relative shrink-0 hover:opacity-80 transition-opacity overflow-hidden rounded-sm block">
                            {product.image && (
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </Link>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-serif text-xl text-stone-900 leading-tight">
                                    <Link href={`/product/${product.slug}`} className="hover:text-stone-600 transition-colors">
                                        {product.title}
                                    </Link>
                                </h3>
                                <span className="text-xs font-mono text-stone-400 shrink-0 ml-4">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-stone-500 mb-4">{product.subtitle}</p>
                            <div className="text-xs font-mono text-stone-400 uppercase tracking-widest flex gap-4 items-center">
                                <span>PID: {order.productId.slice(-6)}</span>
                                {isRefunded ? (
                                    <span className="text-stone-500 line-through">Refunded</span>
                                ) : (
                                    <span className="text-green-600">Confirmed</span>
                                )}

                                {!isRefunded && (
                                    <button
                                        onClick={() => handleRefund(order.id)}
                                        disabled={isRefunding}
                                        className="ml-4 text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-widest transition-colors disabled:opacity-50"
                                    >
                                        {isRefunding ? "Processing..." : "Refund"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
