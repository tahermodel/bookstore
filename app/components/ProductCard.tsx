import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

interface ProductCardProps {
    product: Product;
    index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
    return (
        <Link
            href={`/product/${product.slug}`}
            className="bg-stone-50 p-8 md:p-12 group cursor-pointer min-h-[60vh] flex flex-col justify-between hover:bg-white transition-colors duration-500 relative"
        >
            <div className="flex justify-between items-start z-10">
                <span className="font-mono text-xs text-stone-400">
                    EDITION {String(index + 1).padStart(3, '0')}
                </span>
            </div>

            <div className="aspect-[3/4] relative w-full max-w-[80%] mx-auto my-12 bg-stone-100 transition-all duration-700 ease-out shadow-sm group-hover:shadow-xl group-hover:-translate-y-2">
                {/* Placeholder for product image - ideally use Next.js Image component here */}
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-stone-300 font-serif italic text-2xl">
                        Figure {index + 1}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 z-10">
                <h3 className="font-serif text-2xl md:text-3xl text-stone-900 group-hover:underline decoration-1 underline-offset-4 decoration-stone-300">
                    {product.title}
                </h3>
                <div className="flex justify-between items-end mt-2">
                    <span className="text-sm text-stone-500 line-clamp-1 mr-4">{product.subtitle}</span>
                    <span className="text-sm font-medium text-stone-900 whitespace-nowrap">
                        ${(product.price / 100).toFixed(2)}
                    </span>
                </div>
            </div>
        </Link>
    );
}
