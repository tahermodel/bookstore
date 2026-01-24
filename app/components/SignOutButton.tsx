'use client';

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
    return (
        <button
            onClick={() => {
                if (confirm("Are you sure you want to sign out?")) {
                    signOut({ callbackUrl: "/" });
                }
            }}
            className="text-xs font-medium uppercase tracking-widest hover:text-stone-500 transition-colors flex items-center gap-2"
        >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign Out</span>
        </button>
    );
}
