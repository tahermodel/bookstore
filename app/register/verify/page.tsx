'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import Link from 'next/link';

export default function VerifyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || "";

    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (!email) {
            router.push('/register');
        }
    }, [email, router]);

    function handleChange(index: number, value: string) {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index: number, e: React.KeyboardEvent) {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    async function handleVerify(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            setError("Please enter the full 6-digit code.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/register/verify", {
                method: "POST",
                body: JSON.stringify({ email, code: fullCode }),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || "Verification failed");
            }

            router.push("/login?verified=true");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleResend() {
        setResending(true);
        setError("");
        setMessage("");

        try {
            const res = await fetch("/api/register/resend", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || "Failed to resend code");
            }

            setMessage("A new code has been sent to your email.");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setResending(false);
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-stone-50 px-6 py-12">
            <div className="max-w-md w-full text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-100 text-stone-900 rounded-full mb-8">
                    <Mail size={28} />
                </div>

                <h1 className="text-3xl font-serif text-stone-900 mb-2">Check your email</h1>
                <p className="text-stone-500 font-light mb-10 leading-relaxed">
                    We've sent a 6-digit verification code to <br />
                    <span className="font-semibold text-stone-900">{email}</span>
                </p>

                <form onSubmit={handleVerify} className="space-y-8">
                    {error && (
                        <div className="text-red-600 text-sm bg-red-50 p-4 border border-red-200 rounded-lg animate-scale-in">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="text-stone-900 text-sm bg-stone-100 p-4 border border-stone-200 rounded-lg animate-scale-in">
                            {message}
                        </div>
                    )}

                    <div className="flex justify-between gap-2 max-w-xs mx-auto">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { (inputRefs.current[index] = el) }}
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-10 h-14 md:w-12 md:h-16 text-center text-2xl font-serif border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all bg-white"
                                required
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-3 rounded-lg"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            <>
                                Verify Email
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-stone-100">
                    <p className="text-sm text-stone-500 mb-4">Didn't receive the code?</p>
                    <button
                        onClick={handleResend}
                        disabled={resending}
                        className="text-stone-900 font-medium hover:underline inline-flex items-center gap-2 disabled:opacity-50"
                    >
                        {resending ? (
                            <>
                                <RefreshCw size={14} className="animate-spin" />
                                Resending...
                            </>
                        ) : (
                            "Resend Code"
                        )}
                    </button>
                </div>

                <Link href="/register" className="block mt-6 text-xs text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-widest">
                    Use a different email
                </Link>
            </div>
        </section>
    );
}
