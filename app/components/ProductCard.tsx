import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
    product: Product;
    index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
    return (
        <Link
            href={`/product/${product.slug}`}
            className="group bg-stone-50 p-8 md:p-12 cursor-pointer min-h-[60vh] flex flex-col justify-between hover:bg-white transition-all duration-500 relative overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            { }
            <div className="absolute inset-0 bg-gradient-to-t from-stone-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex justify-between items-start z-10">
                <span className="font-mono text-xs text-stone-400 tracking-wider">
                    EDITION {String(index + 1).padStart(3, '0')}
                </span>
                <ArrowUpRight
                    size={18}
                    className="text-stone-300 group-hover:text-stone-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                />
            </div>

            <div className="aspect-[3/4] relative w-full max-w-[75%] mx-auto my-12 bg-stone-100 transition-all duration-700 ease-out group-hover:shadow-2xl group-hover:shadow-stone-300/50 group-hover:-translate-y-3 group-hover:scale-[1.02] rounded-sm overflow-hidden">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-stone-300 font-serif italic text-2xl">
                        Figure {index + 1}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3 z-10">
                <h3 className="font-serif text-2xl md:text-3xl text-stone-900 transition-all duration-300 group-hover:text-stone-700">
                    {product.title}
                </h3>
                <div className="flex justify-between items-end">
                    <span className="text-sm text-stone-500 line-clamp-1 mr-4 font-light italic">
                        {product.subtitle}
                    </span>
                    <span className="text-sm font-mono text-stone-900 whitespace-nowrap bg-stone-100 px-3 py-1 rounded-sm group-hover:bg-stone-900 group-hover:text-stone-50 transition-colors duration-300">
                        ${(product.price / 100).toFixed(2)}
                    </span>
                </div>
            </div>
        </Link>
    );
}
