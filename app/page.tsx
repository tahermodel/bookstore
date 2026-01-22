import { products } from "@/lib/products";
import { ProductGrid } from "@/app/components/ProductGrid";

export default function Home() {
    return (
        <>
            { }
            <header className="px-6 md:px-12 pt-24 pb-32 md:pt-40 md:pb-48 border-b border-stone-200">
                <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-stone-900">
                    Objects of <br /> <span className="italic text-stone-800">Permanence</span>
                </h1>
                <p className="mt-12 max-w-md text-stone-600 text-lg leading-relaxed font-light">
                    A curated selection of premium books and digital artifacts.
                    Designed for longevity in a transient world.
                </p>
            </header>

            { }
            <ProductGrid products={products} />
        </>
    );
}