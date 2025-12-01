"use client";

import dynamic from "next/dynamic";
import React from "react";

const AsgardeoProvider = dynamic(
  () => import("@asgardeo/auth-react").then(mod => mod.AuthProvider),
  { ssr: false }
);

interface AuthProviderProps {
    children: React.ReactNode;
}

const config = {
    signInRedirectURL: process.env.NEXT_PUBLIC_ASGARDEO_REDIRECT_URL || "http://localhost:3000",
    signOutRedirectURL: process.env.NEXT_PUBLIC_ASGARDEO_REDIRECT_URL || "http://localhost:3000",
    clientID: process.env.NEXT_PUBLIC_ASGARDEO_CLIENT_ID || "",
    baseUrl: process.env.NEXT_PUBLIC_ASGARDEO_BASE_URL || "",
    scope: [process.env.NEXT_PUBLIC_ASGARDEO_SCOPE || "openid profile"],
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [mounted, setMounted] = React.useState(false);

    // React.useEffect(() => {
    //     setMounted(true);
    // }, []);

    // if (!mounted) {
    //     return null;
    // }

    return <AsgardeoProvider config={config}>{children}</AsgardeoProvider>;
}

