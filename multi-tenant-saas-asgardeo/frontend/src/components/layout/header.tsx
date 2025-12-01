"use client";

import { useAuthContext } from "@asgardeo/auth-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export function Header() {
    const { state, signIn, signOut } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (state?.isAuthenticated) {
            router.push("/dashboard");
        }
    }, [state?.isAuthenticated, router]);

    const handleSignOut = async () => {
        await signOut();
    };

    const handleSignIn = async () => {
        await signIn();

    };

    return (
        <header className="flex h-16 w-full items-center justify-between border-b px-6">
            <div className="flex items-center gap-4">
                <Link href="/" className="text-lg font-bold">
                    SaaS Platform
                </Link>
            </div>
            <div className="flex items-center gap-4">
                {state.isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            {state.username || state.email}
                        </span>
                        <button
                            onClick={() => handleSignOut()}
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => handleSignIn()}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
}
