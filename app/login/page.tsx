'use client';
import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { User, ArrowRight, Loader2 } from "lucide-react";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const registered = searchParams.get("registered");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                throw new Error("Invalid credentials");
            }

            router.push("/orders");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50 px-6">
            <div className="max-w-md w-full animate-fade-in-up">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-900 text-stone-50 rounded-full mb-6">
                        <User size={28} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">Welcome Back</h1>
                    <p className="text-stone-500 font-light">Access your archive.</p>
                </div>

                {(registered || searchParams.get("verified")) && (
                    <div className="mb-6 bg-green-50 p-4 border border-green-200 text-green-800 text-sm font-serif italic animate-scale-in rounded-lg text-center">
                        ✓ {searchParams.get("verified") ? "Email verified successfully. Please sign in." : "Account created successfully. Please sign in."}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 glass-card p-8 rounded-3xl animate-fade-in shadow-xl backdrop-blur-xl">
                    {error && (
                        <div className="text-red-800 text-sm glass-frosted p-4 border border-red-200 rounded-xl text-center animate-scale-in">
                            {error}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() => signIn("google", { callbackUrl: "/orders" })}
                        className="btn-secondary flex items-center justify-center gap-3 rounded-xl w-full"
                    >
                        {/* Simple Google G icon SVG */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Sign in with Google
                    </button>

                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-stone-200/50"></span>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
                            <span className="bg-transparent px-2 text-stone-400 font-bold backdrop-blur-sm">Archive credentials</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 block font-bold">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            required
                            className="w-full border-b border-stone-200 bg-white/30 backdrop-blur-sm rounded-lg py-3 px-4 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-all font-serif"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 block font-bold">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full border-b border-stone-200 bg-white/30 backdrop-blur-sm rounded-lg py-3 px-4 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-all font-serif"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary flex items-center justify-center gap-3 mt-4 rounded-xl shadow-lg border border-white/20"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Authenticating...
                            </>
                        ) : (
                            <>
                                Sign In
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center text-sm text-stone-500 mt-8">
                    New to Editorial?{" "}
                    <Link href="/register" className="text-stone-900 font-medium hover:underline underline-offset-4">
                        Create Account
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <section className="min-h-screen flex items-center justify-center bg-stone-50">
                <Loader2 className="animate-spin text-stone-400" size={32} />
            </section>
        }>
            <LoginForm />
        </Suspense>
    );
}
