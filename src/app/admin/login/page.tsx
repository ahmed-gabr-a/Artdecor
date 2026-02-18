"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            username: email,
            password: password,
            redirect: false,
        });

        if (res?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/admin");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
                <div className="flex justify-center mb-6">
                    <div className="bg-black text-white p-3 rounded-full">
                        <Lock size={24} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-black focus:border-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-black focus:border-black"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                    >
                        Sign In
                    </button>
                </form>

            </div>
        </div>
    );
}
