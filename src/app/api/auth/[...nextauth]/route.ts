
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const adminEmail = process.env.ADMIN_EMAIL;
                const adminPassword = process.env.ADMIN_PASSWORD;

                if (!adminEmail || !adminPassword) {
                    return null;
                }

                if (
                    credentials?.username === adminEmail &&
                    credentials?.password === adminPassword
                ) {
                    return { id: "1", name: "Admin", email: adminEmail };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/admin/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
