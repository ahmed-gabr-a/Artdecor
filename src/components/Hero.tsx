"use client";

import { motion } from "framer-motion";

export default function Hero({ title, subtitle, videoUrl }: { title?: string, subtitle?: string, videoUrl?: string }) {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0"
            >
                <source src={videoUrl || "/assets/videos/hero-bg.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Light Overlay for Contrast */}
            <div className="absolute top-0 left-0 w-full h-full bg-white/10 z-10" />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-transparent to-black/30 z-10" />

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-6 drop-shadow-md"
                >
                    {title || "ART DECOR"}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-xl md:text-2xl text-white/90 max-w-2xl font-light tracking-wide mb-10 drop-shadow-sm"
                >
                    {subtitle || "Elevating Spaces. Inspiring Lives."}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <a
                        href="#portfolio"
                        className="bg-white/90 text-black px-8 py-3 hover:bg-white transition-all duration-300 text-sm uppercase tracking-widest backdrop-blur-sm"
                    >
                        View Projects
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
