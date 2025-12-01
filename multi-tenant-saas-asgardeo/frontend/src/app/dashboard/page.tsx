"use client";

import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, User, Mail } from "lucide-react";

export default function Dashboard() {
    const { state, signIn } = useAuthContext();
    const router = useRouter();
    const [openDebug, setOpenDebug] = useState(false);

    useEffect(() => {
        if (!state.isAuthenticated && !state.isLoading) {
            // Optional: Redirect to login or show access denied
        }
    }, [state.isAuthenticated, state.isLoading, router]);

    if (state.isLoading) {
        return <div className="p-8">Loading...</div>;
    }

    if (!state.isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p>You must be signed in to view this page.</p>
                <button
                    onClick={() => signIn()}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    Sign In
                </button>
            </div>
        );
    }

     return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-200 p-8">
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800 tracking-tight">
                Welcome Back 👋
            </h1>

            <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-2xl p-8 max-w-4xl mx-auto transition-all">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                    User Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Username */}
                    <div className="flex items-start space-x-4 bg-white/90 rounded-xl p-4 shadow-sm border hover:shadow-md transition">
                        <div className="p-3 bg-indigo-100 rounded-xl">
                            <User className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Username</p>
                            <p className="text-lg font-semibold text-gray-800">
                                {state.username || "N/A"}
                            </p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start space-x-4 bg-white/90 rounded-xl p-4 shadow-sm border hover:shadow-md transition">
                        <div className="p-3 bg-pink-100 rounded-xl">
                            <Mail className="w-6 h-6 text-pink-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Email</p>
                            <p className="text-lg font-semibold text-gray-800">
                                {state.email || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Debug Toggle */}
                <div className="mt-8">
                    <button
                        onClick={() => setOpenDebug(!openDebug)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-700 transition"
                    >
                        <span>Debug Info</span>
                        {openDebug ? (
                            <ChevronUp className="w-5 h-5" />
                        ) : (
                            <ChevronDown className="w-5 h-5" />
                        )}
                    </button>

                    {/* Debug Content */}
                    {openDebug && (
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mt-4 text-sm overflow-auto max-h-80">
                            {JSON.stringify(state, null, 2)}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
}
