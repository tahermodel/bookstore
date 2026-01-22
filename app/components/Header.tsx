import Link from "next/link";

export function Header() {
    return (
        <nav className="flex justify-between items-center px-6 py-6 md:px-12 sticky top-0 bg-stone-50/90 backdrop-blur-sm z-50 border-b border-transparent transition-colors duration-300">
            <Link href="/" className="text-xs font-bold tracking-[0.2em] uppercase">
                Editorial
            </Link>
            <Link href="/orders" className="text-xs font-medium uppercase tracking-widest hover:text-stone-500 transition-colors">
                Orders
            </Link>
        </nav>
    );
}
