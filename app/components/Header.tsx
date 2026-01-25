import Link from "next/link";
import { auth } from "@/auth";
import { User, Package } from "lucide-react";
import { SignOutButton } from "./SignOutButton";

export async function Header() {
    const session = await auth();

    return (
        <nav className="flex justify-between items-center px-6 py-5 md:px-12 sticky top-0 bg-stone-50/95 backdrop-blur-md z-50 border-b border-stone-100 transition-all duration-300">
            <Link href="/" className="text-xs font-bold tracking-[0.25em] uppercase hover:text-stone-500 transition-colors">
                Editorial
            </Link>

            <div className="flex items-center gap-6">
                <Link
                    href="/orders"
                    className="text-xs font-medium uppercase tracking-widest hover:text-stone-500 transition-colors flex items-center gap-2"
                >
                    <Package size={14} />
                    <span className="hidden sm:inline">Orders</span>
                </Link>

                {session?.user ? (
                    <div className="flex items-center gap-4">
                        <Link
                            href="/profile"
                            className="text-xs font-medium uppercase tracking-widest hover:text-stone-500 transition-colors flex items-center gap-2 truncate max-w-[100px] md:max-w-[150px]"
                        >
                            <User size={14} className="md:hidden" />
                            <span className="truncate">{session.user.name || session.user.email}</span>
                        </Link>
                        <SignOutButton />
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="text-xs font-medium uppercase tracking-widest hover:text-stone-500 transition-colors flex items-center gap-2"
                    >
                        <User size={14} />
                        <span className="hidden sm:inline">Sign In</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}
