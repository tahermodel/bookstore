import { getProduct, products } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Generate static params for all products at build time
export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProduct(slug);

    if (!product) {
        notFound();
    }

    return (
        <article className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 min-h-[80vh] items-start px-6 md:px-12 pt-12 pb-24">
            {/* Image Column */}
            <div className="aspect-[3/4] bg-stone-100 relative overflow-hidden">
                {product.image ? (
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <div className="text-stone-300 font-serif italic text-2xl px-4 text-center">
                            {product.title}
                        </div>
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-stone-200 flex items-center justify-center text-stone-400">
                        [Image: {product.title}]
                    </div>
                )}
            </div>

            {/* Details Column - Sticky on Desktop */}
            <div className="md:sticky md:top-32 flex flex-col gap-8">
                <Link href="/" className="text-xs text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-widest mb-4 block">
                    ← Index
                </Link>

                <div>
                    <h1 className="text-3xl md:text-5xl font-medium mb-4 text-stone-900">{product.title}</h1>
                    <p className="text-xl text-stone-500 font-serif italic">{product.subtitle}</p>
                </div>

                <div className="prose prose-stone prose-p:text-stone-600 prose-p:leading-relaxed">
                    <p>{product.description}</p>
                </div>

                <div className="border-t border-stone-200 pt-8 mt-4">
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-mono text-sm text-stone-500">Price</span>
                        <span className="text-xl text-stone-900">${(product.price / 100).toFixed(2)}</span>
                    </div>

                    <form action="/api/checkout" method="POST">
                        <input type="hidden" name="priceId" value={product.id} />
                        <button
                            type="submit"
                            className="w-full bg-stone-900 text-stone-50 py-4 px-6 flex justify-between items-center hover:bg-black transition-colors"
                        >
                            <span className="uppercase tracking-widest text-xs font-bold">Purchase</span>
                            <ArrowRight size={16} />
                        </button>
                        <p className="text-xs text-stone-400 mt-4 text-center">
                            Secure checkout via Stripe. Worldwide shipping.
                        </p>
                    </form>
                </div>
            </div>
        </article>
    );
}