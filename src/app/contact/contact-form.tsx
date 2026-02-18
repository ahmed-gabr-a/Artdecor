"use client";

import { useState } from "react";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sending");
        // Simulate sending
        setTimeout(() => setStatus("success"), 2000);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm uppercase tracking-widest text-gray-500">Name</label>
                    <input
                        type="text"
                        id="name"
                        required
                        className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm uppercase tracking-widest text-gray-500">Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm uppercase tracking-widest text-gray-500">Subject</label>
                <select
                    id="subject"
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-gray-600"
                >
                    <option>General Inquiry</option>
                    <option>Residential Project</option>
                    <option>Commercial Project</option>
                    <option>Other</option>
                </select>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm uppercase tracking-widest text-gray-500">Message</label>
                <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300 resize-none"
                    placeholder="Tell us about your project..."
                />
            </div>

            <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="bg-black-rich text-white px-10 py-4 w-full md:w-auto uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
                {status === "sending" ? "Sending..." : status === "success" ? "Message Sent" : "Send Message"}
            </button>
        </form>
    );
}
