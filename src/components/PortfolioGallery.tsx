"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

type Project = {
    id: string | number;
    title: string;
    category: string;
    image: string;
    description: string;
    gallery?: string[];
    videos?: string[];
};

export default function PortfolioGallery({ projects }: { projects: Project[] }) {
    const [filter, setFilter] = useState("all");

    const filteredProjects = projects.filter(
        (project) => filter === "all" || project.category === filter
    );

    return (
        <div className="container mx-auto px-6">
            {/* Filter Buttons - Minimalist Style */}
            <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-12 border-b border-gray-200 pb-4">
                <button
                    onClick={() => setFilter("all")}
                    className={`text-sm tracking-widest uppercase transition-all pb-1 ${filter === "all"
                        ? "text-black border-b-2 border-black font-semibold"
                        : "text-gray-500 hover:text-black"
                        }`}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        className={`text-sm tracking-widest uppercase transition-all pb-1 ${filter === cat.id
                            ? "text-black border-b-2 border-black font-semibold"
                            : "text-gray-500 hover:text-black"
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="group relative aspect-[4/5] overflow-hidden bg-gray-100 cursor-pointer"
                        >
                            <Link href={`/portfolio/${project.id}`} className="block w-full h-full relative">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Minimalist Hover Overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100 ease-out">
                                        <h3 className="text-2xl font-serif text-white mb-2">{project.title}</h3>
                                        <p className="text-gray-200 text-sm mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                            {project.description}
                                        </p>
                                        <span className="inline-block text-white border-b border-white pb-1 text-sm tracking-widest hover:text-gold hover:border-gold transition-colors duration-300">
                                            VIEW PROJECT
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
