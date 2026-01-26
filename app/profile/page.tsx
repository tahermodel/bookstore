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

    // Local state for name and email to ensure UI freshness
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    // Sync local state when session loads or updates
    useEffect(() => {
        if (session?.user) {
            setUserName(session.user.name || "");
            setUserEmail(session.user.email || "");
        }
    }, [session]);

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
                // If only name was changed
                await update({
                    name: updatedUser.name
                });
                setMessage("Profile updated successfully.");
                setIsEditing(false);
            }

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

            // CRITICAL: Force a full session update with the new email
            await update({
                email: tempEmail
            });

            setMessage("Email updated and verified successfully.");
            setShowVerify(false);
            setVerifyCode(['', '', '', '', '', '']);

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
        <div className="min-h-screen flex items-center justify-center p-6 text-stone-500 font-serif italic bg-stone-50">
            Authenticating...
        </div>
    );

    return (
        <section className="min-h-screen px-6 py-24 max-w-xl mx-auto bg-stone-50/50">
            {!showVerify ? (
                <div className="glass-card p-8 md:p-12 rounded-3xl animate-fade-in shadow-xl backdrop-blur-xl">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h1 className="text-3xl font-serif text-stone-900 mb-2">Account Details</h1>
                            <p className="text-stone-500 font-serif italic text-sm">Review or modify your records.</p>
                        </div>

                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors glass-button px-4 py-2 rounded-full"
                            >
                                <Pencil size={14} />
                                Edit
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-900 transition-colors glass-button px-4 py-2 rounded-full"
                            >
                                <X size={14} />
                                Cancel
                            </button>
                        )}
                    </div>

                    <div className="space-y-12">
                        <form onSubmit={handleUpdate} className="flex flex-col gap-8">
                            {message && (
                                <div className="p-4 glass-frosted text-stone-900 text-xs uppercase tracking-widest flex items-center gap-3 animate-slide-up rounded-xl">
                                    <Check size={14} className="text-green-600" /> {message}
                                </div>
                            )}
                            {error && (
                                <div className="p-4 bg-red-50/50 backdrop-blur-sm text-red-800 text-xs uppercase tracking-widest border border-red-100 flex items-center gap-3 rounded-xl">
                                    <ShieldAlert size={14} /> {error}
                                </div>
                            )}

                            <div className="grid gap-6">
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-3 font-bold">Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        key={`name-${userName}`}
                                        defaultValue={userName}
                                        readOnly={!isEditing}
                                        className={`${authInputClasses} ${!isEditing ? 'bg-transparent cursor-default border-transparent px-0' : 'bg-white/40 focus:bg-white/60'} transition-all duration-300 rounded-lg px-2`}
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-3 font-bold">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        key={`email-${userEmail}`}
                                        defaultValue={userEmail}
                                        readOnly={!isEditing}
                                        className={`${authInputClasses} ${!isEditing ? 'bg-transparent cursor-default border-transparent px-0' : 'bg-white/40 focus:bg-white/60'} transition-all duration-300 rounded-lg px-2`}
                                    />
                                </div>

                                {isEditing && (
                                    <div className="pt-4 border-t border-stone-100/50 mt-4 animate-scale-in">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-3 font-bold">Update Key (Password)</label>
                                        <input
                                            name="password"
                                            type="password"
                                            placeholder="Leave blank to keep unchanged"
                                            className={`${authInputClasses} bg-white/40 focus:bg-white/60 rounded-lg px-2`}
                                            minLength={6}
                                        />
                                        <p className="text-[10px] text-stone-400 mt-3 italic leading-relaxed">
                                            Keep this blank unless you wish to revise your authorization credentials.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {isEditing && (
                                <button type="submit" disabled={loading} className={`${authButtonClasses} mt-4 rounded-xl shadow-lg border border-white/20`}>
                                    {loading ? "Syncing..." : "Apply Changes"}
                                </button>
                            )}
                        </form>

                        {!isEditing && (
                            <div className="pt-20 border-t border-stone-100/50">
                                <div className="p-8 glass-card rounded-2xl border-stone-100">
                                    <h2 className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold flex items-center gap-2">
                                        <ShieldAlert size={14} /> Danger Zone
                                    </h2>
                                    <p className="text-xs text-stone-500 mb-6 leading-relaxed">
                                        Permanent erasure of your identity and purchase history. This process is irreversible and all digital assets will be lost.
                                    </p>
                                    <button
                                        onClick={handleDeleteAccount}
                                        className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-500 border border-red-200 px-6 py-3 hover:bg-red-500 hover:text-white transition-all w-full rounded-lg glass-button"
                                    >
                                        Delete Account Permanently
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="animate-fade-in glass-card p-8 md:p-12 rounded-3xl shadow-xl">
                    <button
                        onClick={() => setShowVerify(false)}
                        className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors mb-12 glass-button px-4 py-2 rounded-full"
                    >
                        <ArrowRight size={14} className="rotate-180" /> Back
                    </button>

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-900 text-stone-50 rounded-full mb-8 shadow-lg shadow-stone-200">
                            <Mail size={24} />
                        </div>
                        <h2 className="text-2xl font-serif text-stone-900 mb-2">Verify email update</h2>
                        <p className="text-stone-500 text-sm mb-10 leading-relaxed font-light">
                            Confirm ownership of <span className="font-semibold text-stone-900 underline underline-offset-4">{tempEmail}</span> by entering the code provided via dispatch.
                        </p>

                        <form onSubmit={handleVerifyEmail} className="space-y-10">
                            {error && (
                                <div className="p-4 bg-red-50/60 backdrop-blur-md text-red-800 text-xs uppercase tracking-widest border border-red-100 animate-scale-in rounded-lg">
                                    <ShieldAlert size={14} className="inline mr-2" /> {error}
                                </div>
                            )}

                            <div className="flex justify-center gap-3">
                                {verifyCode.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { (verifyRefs.current[index] = el) }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleVerifyCodeChange(index, e.target.value)}
                                        className="w-10 h-14 md:w-12 md:h-16 text-center text-2xl font-serif border-b-2 border-stone-200 focus:border-stone-900 focus:outline-none transition-all bg-transparent"
                                        required
                                    />
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={verifying}
                                className={`${authButtonClasses} shadow-lg rounded-xl border border-white/20`}
                            >
                                {verifying ? <Loader2 className="animate-spin inline mr-2" size={16} /> : null}
                                Verify & Update
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-stone-100/50">
                            <p className="text-[10px] text-stone-400 mb-4 uppercase tracking-[0.2em] font-bold">Unreceived transmission?</p>
                            <button
                                onClick={handleResendCode}
                                disabled={resending}
                                className="text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-stone-500 transition-colors inline-flex items-center gap-2 disabled:opacity-50 glass-button px-6 py-3 rounded-full"
                            >
                                {resending ? <RefreshCw size={12} className="animate-spin" /> : null}
                                Resend verification code
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
