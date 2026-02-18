
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Hardcoded admin credentials for simplicity in this MVP
                // In production, these should be in environment variables
                const adminUser = { id: "1", name: "Admin", email: "admin@artdecor.com" };

                if (
                    credentials?.username === "admin" &&
                    credentials?.password === "artdecor2025" // Simple password for demo
                ) {
                    return adminUser;
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "art-decor-secret-key-change-me",
};
