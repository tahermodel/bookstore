import { products } from "@/lib/products";
import { ProductGrid } from "@/app/components/ProductGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <header className="px-6 md:px-12 pt-24 pb-32 md:pt-40 md:pb-48 border-b border-stone-200 relative overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-transparent to-stone-100/50 pointer-events-none" />

                <div className="relative z-10">
                    <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-stone-900 animate-fade-in-up">
                        Objects of <br />
                        <span className="italic text-stone-700 animate-fade-in-up stagger-1">Permanence</span>
                    </h1>
                    <p className="mt-12 max-w-md text-stone-600 text-lg leading-relaxed font-light animate-fade-in stagger-2">
                        A curated selection of premium books and digital artifacts.
                        Designed for longevity in a transient world.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4 animate-fade-in stagger-3">
                        <Link href="#products" className="btn-primary inline-flex items-center gap-3 group">
                            <span>Explore Archive</span>
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link href="/about" className="btn-secondary">
                            Our Philosophy
                        </Link>
                    </div>
                </div>
            </header>

            {/* Product Grid */}
            <section id="products" className="scroll-mt-20">
                <ProductGrid products={products} />
            </section>

            {/* Value Proposition */}
            <section className="px-6 md:px-12 py-24 md:py-32 bg-stone-900 text-stone-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-serif text-3xl md:text-5xl mb-8 text-balance">
                        Crafted for those who <span className="italic text-stone-400">value substance</span> over noise.
                    </h2>
                    <p className="text-stone-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Every object in our archive is selected for its enduring quality,
                        thoughtful design, and the meaningful experience it provides.
                    </p>
                </div>
            </section>
        </>
    );
}