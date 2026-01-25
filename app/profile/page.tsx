'use client';

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Pencil, X, Check, ShieldAlert, Mail, Loader2, RefreshCw, ArrowRight } from "lucide-react";
import { authButtonClasses, authInputClasses } from "../auth/styles";

export default function ProfilePage() {
    const { data: session, update } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Verification related state
    const [showVerify, setShowVerify] = useState(false);
    const [tempEmail, setTempEmail] = useState("");
    const [verifyCode, setVerifyCode] = useState(['', '', '', '', '', '']);
    const [verifying, setVerifying] = useState(false);
    const [resending, setResending] = useState(false);
    const verifyRefs = useRef<(HTMLInputElement | null)[]>([]);

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        if (data.password === "") delete data.password;

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const updatedUser = await res.json();

            if (!res.ok) throw new Error(updatedUser.error || "Failed to update profile");

            if (updatedUser.emailVerificationPending) {
                setTempEmail(data.email as string);
                setShowVerify(true);
                setIsEditing(false);
            } else {
                setMessage("Profile updated successfully.");
                setIsEditing(false);
            }

            await update({
                ...session,
                user: {
                    ...session?.user,
                    name: updatedUser.name,
                }
            });

        } catch (err: any) {
            setError(err.message || "Update failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleVerifyEmail(e: React.FormEvent) {
        e.preventDefault();
        setVerifying(true);
        setError("");

        const fullCode = verifyCode.join('');

        try {
            const res = await fetch("/api/profile/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: tempEmail, code: fullCode }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Verification failed");

            // Explicitly update session with new email
            await update({
                ...session,
                user: {
                    ...session?.user,
                    email: tempEmail
                }
            });

            // Force a slight delay to ensure session propagates
            setTimeout(() => {
                setMessage("Email updated and verified successfully.");
                setShowVerify(false);
                setVerifyCode(['', '', '', '', '', '']);
            }, 100);
        } catch (err: any) {
            setError(err.message || "Incorrect verification code.");
        } finally {
            setVerifying(false);
        }
    }

    async function handleResendCode() {
        setResending(true);
        setError("");
        try {
            const res = await fetch("/api/register/resend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: tempEmail }),
            });
            if (!res.ok) throw new Error("Failed to resend");
            setMessage("Verification code resent.");
        } catch (err) {
            setError("Resend failed. Try again soon.");
        } finally {
            setResending(false);
        }
    }

    async function handleDeleteAccount() {
        if (!confirm("CRITICAL: This will permanently delete your account and all order history. This cannot be undone. Proceed?")) return;

        try {
            const res = await fetch("/api/profile", { method: "DELETE" });
            if (res.ok) {
                await signOut({ callbackUrl: "/" });
            }
        } catch (err) {
            alert("Failed to delete account.");
        }
    }

    function handleVerifyCodeChange(index: number, value: string) {
        if (!/^\d*$/.test(value)) return;
        const newCode = [...verifyCode];
        newCode[index] = value.slice(-1);
        setVerifyCode(newCode);
        if (value && index < 5) verifyRefs.current[index + 1]?.focus();
    }

    if (!session) return (
        <div className="min-h-screen flex items-center justify-center p-6 text-stone-500 font-serif italic">
            Authenticating...
        </div>
    );

    return (
        <section className="min-h-screen px-6 py-24 max-w-xl mx-auto">
            {!showVerify ? (
                <>
                    <div className="flex justify-between items-end mb-12 animate-fade-in">
                        <div>
                            <h1 className="text-3xl font-serif text-stone-900 mb-2">Account Details</h1>
                            <p className="text-stone-500 font-serif italic text-sm">Review or modify your records.</p>
                        </div>

                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
                            >
                                <Pencil size={14} />
                                Edit
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-900 transition-colors"
                            >
                                <X size={14} />
                                Cancel
                            </button>
                        )}
                    </div>

                    <div className="space-y-12 animate-fade-in-up">
                        <form
                            key={session.user?.email || 'form'}
                            onSubmit={handleUpdate}
                            className="flex flex-col gap-8"
                        >
                            {message && (
                                <div className="p-4 glass shadow-sm text-stone-900 text-xs uppercase tracking-widest flex items-center gap-3 animate-slide-up">
                                    <Check size={14} className="text-green-600" /> {message}
                                </div>
                            )}
                            {error && (
                                <div className="p-4 bg-red-50 text-red-800 text-xs uppercase tracking-widest border border-red-100 flex items-center gap-3">
                                    <ShieldAlert size={14} /> {error}
                                </div>
                            )}

                            <div className="grid gap-6">
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-3 font-bold">Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        defaultValue={session.user?.name || ""}
                                        readOnly={!isEditing}
                                        className={`${authInputClasses} ${!isEditing ? 'bg-stone-50/50 cursor-default border-transparent px-0' : ''} transition-all duration-300`}
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-3 font-bold">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        defaultValue={session.user?.email || ""}
                                        readOnly={!isEditing}
                                        className={`${authInputClasses} ${!isEditing ? 'bg-stone-50/50 cursor-default border-transparent px-0' : ''} transition-all duration-300`}
                                    />
                                </div>

                                {isEditing && (
                                    <div className="pt-4 border-t border-stone-100 mt-4 animate-scale-in">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-3 font-bold">Update Key (Password)</label>
                                        <input
                                            name="password"
                                            type="password"
                                            placeholder="Leave blank to keep unchanged"
                                            className={authInputClasses}
                                            minLength={6}
                                        />
                                        <p className="text-[10px] text-stone-400 mt-3 italic">
                                            Signed in via Google? You don't have a local password yet, but you can set one here to allow standard login.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {isEditing && (
                                <button type="submit" disabled={loading} className={`${authButtonClasses} mt-4`}>
                                    {loading ? "Syncing..." : "Apply Changes"}
                                </button>
                            )}
                        </form>

                        {!isEditing && (
                            <div className="pt-24 border-t border-stone-100">
                                <div className="p-8 glass-premium rounded-sm">
                                    <h2 className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold flex items-center gap-2">
                                        <ShieldAlert size={14} /> Danger Zone
                                    </h2>
                                    <p className="text-xs text-stone-500 mb-6 leading-relaxed">
                                        Permanent erasure of your identity and purchase history. This process is irreversible.
                                    </p>
                                    <button
                                        onClick={handleDeleteAccount}
                                        className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-500 border border-red-200 px-6 py-3 hover:bg-red-500 hover:text-white transition-all w-full md:w-auto"
                                    >
                                        Delete Account Permanently
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="animate-fade-in-up glass-premium p-8 md:p-12 rounded-2xl shadow-2xl">
                    <button
                        onClick={() => setShowVerify(false)}
                        className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors mb-12"
                    >
                        <ArrowRight size={14} className="rotate-180" /> Back
                    </button>

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-100/50 backdrop-blur-sm text-stone-900 rounded-full mb-8">
                            <Mail size={28} />
                        </div>
                        <h2 className="text-2xl font-serif text-stone-900 mb-2">Verify New Email</h2>
                        <p className="text-stone-500 text-sm mb-10 leading-relaxed font-light">
                            We've sent a code to <span className="font-semibold text-stone-900">{tempEmail}</span>.
                            Please verify ownership to complete the update.
                        </p>

                        <form onSubmit={handleVerifyEmail} className="space-y-8">
                            {error && (
                                <div className="p-4 bg-red-50/80 backdrop-blur-sm text-red-800 text-xs uppercase tracking-widest border border-red-100 animate-scale-in">
                                    <ShieldAlert size={14} className="inline mr-2" /> {error}
                                </div>
                            )}

                            <div className="flex justify-between gap-2 max-w-xs mx-auto">
                                {verifyCode.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { (verifyRefs.current[index] = el) }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleVerifyCodeChange(index, e.target.value)}
                                        className="w-10 h-14 text-center text-2xl font-serif border-b-2 border-stone-200 focus:border-stone-900 focus:outline-none transition-all bg-transparent"
                                        required
                                    />
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={verifying}
                                className={authButtonClasses}
                            >
                                {verifying ? <Loader2 className="animate-spin inline mr-2" size={16} /> : null}
                                Verify & Update
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-stone-100/50">
                            <p className="text-xs text-stone-400 mb-4 uppercase tracking-widest">Didn't receive code?</p>
                            <button
                                onClick={handleResendCode}
                                disabled={resending}
                                className="text-xs font-bold uppercase tracking-widest text-stone-900 hover:underline inline-flex items-center gap-2 disabled:opacity-50"
                            >
                                {resending ? <RefreshCw size={12} className="animate-spin" /> : null}
                                Resend Verification
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

