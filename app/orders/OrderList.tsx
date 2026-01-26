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
            <div className="glass-card p-12 text-center rounded-3xl animate-fade-in">
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
        <div className="flex flex-col gap-4 glass-card p-6 md:p-8 rounded-3xl animate-fade-in-up">
            {initialOrders.map((order) => {
                const product = getProductById(order.productId);
                if (!product) return null;

                const isRefunding = refundingFnId === order.id;
                const isRefunded = order.status === "refunded";

                return (
                    <div key={order.id} className={`flex flex-col sm:flex-row gap-6 items-start py-6 border-b border-stone-100/50 last:border-0 hover:bg-white/30 transition-colors p-4 rounded-xl ${isRefunded ? 'opacity-50 grayscale' : ''}`}>
                        <Link href={`/product/${product.slug}`} className="w-20 h-24 bg-stone-100 relative shrink-0 hover:opacity-80 transition-opacity overflow-hidden rounded-lg block shadow-sm mx-auto sm:mx-0">
                            {product.image && (
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </Link>
                        <div className="flex-1 w-full text-center sm:text-left">
                            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-2 gap-2">
                                <h3 className="font-serif text-xl text-stone-900 leading-tight">
                                    <Link href={`/product/${product.slug}`} className="hover:text-stone-600 transition-colors underline decoration-stone-200 decoration-1 underline-offset-4 sm:no-underline">
                                        {product.title}
                                    </Link>
                                </h3>
                                <span className="text-[10px] sm:text-xs font-mono text-stone-400 shrink-0">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-stone-500 mb-6 font-light truncate max-w-full italic">{product.subtitle}</p>
                            <div className="text-[10px] sm:text-xs font-mono text-stone-400 uppercase tracking-widest flex flex-wrap justify-center sm:justify-start gap-4 items-center">
                                <span className="bg-stone-50/50 px-2 py-1 rounded">PID: {order.productId.slice(-6)}</span>
                                {isRefunded ? (
                                    <span className="text-[10px] bg-stone-100/50 text-stone-500 line-through px-3 py-1 rounded-full border border-stone-200/50">Refunded</span>
                                ) : (
                                    <span className="text-[11px] glass-frosted bg-green-500/10 text-green-700 font-black tracking-[0.2em] px-6 py-2.5 rounded-xl border border-green-400/30 shadow-md saturate-[1.8] animate-pulse-subtle">
                                        CONFIRMED
                                    </span>
                                )}

                                {!isRefunded && (
                                    <button
                                        onClick={() => handleRefund(order.id)}
                                        disabled={isRefunding}
                                        className="ml-auto text-[9px] font-bold text-stone-400 hover:text-red-500 uppercase tracking-[0.2em] transition-colors disabled:opacity-50 underline decoration-stone-200 underline-offset-4"
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
