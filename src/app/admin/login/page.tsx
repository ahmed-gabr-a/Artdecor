"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("بيانات الدخول غير صحيحة");
        } else {
            router.push("/admin");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black-rich text-creme">
            <div className="bg-charcoal p-8 rounded-lg shadow-2xl border border-gold/20 w-full max-w-md">
                <h1 className="text-3xl font-serif text-gold mb-8 text-center">تسجيل دخول المسؤول</h1>
                {error && <p className="text-red-400 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">اسم المستخدم</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black-rich border border-gold/30 rounded p-3 text-white focus:outline-none focus:border-gold"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">كلمة المرور</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black-rich border border-gold/30 rounded p-3 text-white focus:outline-none focus:border-gold"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gold text-black-rich font-bold py-3 rounded hover:bg-gold-light transition-colors"
                    >
                        دخول
                    </button>
                </form>
            </div>
        </div>
    );
}
