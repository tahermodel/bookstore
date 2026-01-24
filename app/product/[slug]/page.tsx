import { getProduct, products } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Shield, Truck } from "lucide-react";
import Image from "next/image";

export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductPage({
    params,
    searchParams
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ canceled?: string }>;
}) {
    const { slug } = await params;
    const { canceled } = await searchParams;
    const product = getProduct(slug);

    if (!product) {
        notFound();
    }

    return (
        <article className="animate-fade-in">
            {/* Cancellation Notice */}
            {canceled && (
                <div className="bg-amber-50 border-b border-amber-200 px-6 py-4 text-center animate-scale-in">
                    <p className="text-amber-800 text-sm">
                        <strong>Order cancelled.</strong> No charges were made to your account.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 min-h-[80vh] items-start px-6 md:px-12 pt-12 pb-24">
                {/* Image */}
                <div className="aspect-[3/4] bg-stone-100 relative overflow-hidden rounded-lg shadow-xl shadow-stone-200/50 animate-slide-in-left">
                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 bg-stone-200 flex items-center justify-center text-stone-400 font-serif italic text-2xl">
                            {product.title}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="md:sticky md:top-32 flex flex-col gap-8 animate-slide-in-right">
                    <Link
                        href="/"
                        className="text-xs text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-widest mb-4 flex items-center gap-2 group"
                    >
                        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                        Back to Archive
                    </Link>

                    <div>
                        <h1 className="text-3xl md:text-5xl font-serif font-medium mb-4 text-stone-900 text-balance">
                            {product.title}
                        </h1>
                        <p className="text-xl text-stone-500 font-serif italic">{product.subtitle}</p>
                    </div>

                    <div className="prose prose-stone prose-p:text-stone-600 prose-p:leading-relaxed">
                        <p>{product.description}</p>
                    </div>

                    {/* Price & Purchase */}
                    <div className="border-t border-stone-200 pt-8 mt-4">
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-mono text-sm text-stone-500 uppercase tracking-widest">Price</span>
                            <span className="text-3xl font-serif text-stone-900">
                                ${(product.price / 100).toFixed(2)}
                            </span>
                        </div>

                        <form action="/api/checkout" method="POST">
                            <input type="hidden" name="priceId" value={product.id} />
                            <button
                                type="submit"
                                className="btn-primary w-full flex justify-between items-center group"
                            >
                                <span>Purchase Now</span>
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </button>
                        </form>

                        {/* Trust badges */}
                        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-stone-400">
                            <span className="flex items-center gap-2">
                                <Shield size={14} />
                                Secure checkout
                            </span>
                            <span className="flex items-center gap-2">
                                <Truck size={14} />
                                Worldwide shipping
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}