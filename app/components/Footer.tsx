import Link from "next/link";
import { Mail } from "lucide-react";
import { auth } from "@/auth";

export async function Footer() {
    const session = await auth();

    return (
        <footer className="px-6 md:px-12 py-16 md:py-24 bg-stone-900 text-stone-50">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                    <div className="space-y-4">
                        <h2 className="font-serif text-3xl">Editorial</h2>
                        <p className="text-stone-400 text-sm max-w-xs leading-relaxed">
                            Curating objects of permanence for the discerning collector.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-12 text-sm">
                        <div className="space-y-4">
                            <h3 className="text-xs uppercase tracking-widest text-stone-500 font-medium">Navigate</h3>
                            <nav className="flex flex-col gap-3">
                                <Link href="/" className="text-stone-300 hover:text-white transition-colors link-underline inline-block">
                                    Archive
                                </Link>
                                <Link href="/orders" className="text-stone-300 hover:text-white transition-colors link-underline inline-block">
                                    Orders
                                </Link>
                                {session?.user && (
                                    <Link href="/profile" className="text-stone-300 hover:text-white transition-colors link-underline inline-block">
                                        Profile
                                    </Link>
                                )}
                                <Link href="/about" className="text-stone-300 hover:text-white transition-colors link-underline inline-block">
                                    About
                                </Link>
                            </nav>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs uppercase tracking-widest text-stone-500 font-medium">Connect</h3>
                            <nav className="flex flex-col gap-3">
                                <a
                                    href="mailto:ownworkZ23@gmail.com"
                                    className="text-stone-300 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <Mail size={14} />
                                    Contact
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-stone-500">
                        &copy; {new Date().getFullYear()} Editorial. All rights reserved.
                    </p>
                    <p className="text-xs text-stone-600 italic">
                        This is a demonstration project not a real commercial one.
                    </p>
                </div>
            </div>
        </footer>
    );
}


