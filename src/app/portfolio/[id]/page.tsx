
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function ProjectDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: { id: parseInt(id) },
    });

    if (!project) {
        notFound();
    }

    // Related projects (same category, exclude current)
    const relatedProjects = await prisma.project.findMany({
        where: {
            category: project.category,
            id: { not: project.id },
        },
        take: 3,
    });

    return (
        <main className="min-h-screen bg-white text-black-rich py-24 px-6 md:px-12">
            <div className="container mx-auto max-w-7xl">
                <Link
                    href="/portfolio"
                    className="inline-flex items-center text-gray-500 mb-8 hover:text-black transition-colors text-sm uppercase tracking-widest"
                >
                    <ArrowLeft className="mr-2" size={16} /> Back to Portfolio
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Images Section - 8 Columns */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* If we had more images, they would go here in a masonry or grid */}
                    </div>

                    {/* Details Section - 4 Columns */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                        <h1 className="text-4xl md:text-5xl font-serif text-black-rich mb-8 leading-tight">
                            {project.title}
                        </h1>

                        <div className="space-y-6 border-t border-gray-200 pt-8 mb-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Category</span>
                                    <span className="text-lg font-serif">{project.category}</span>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Year</span>
                                    <span className="text-lg font-serif">{project.year}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Location</span>
                                    <span className="text-lg font-serif">{project.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-lg prose-neutral mb-12 font-light text-gray-600">
                            <h3 className="font-serif text-black-rich text-xl mb-4">About the Project</h3>
                            <p className="leading-relaxed">
                                {project.details || project.description}
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="block w-full text-center bg-black-rich text-white px-8 py-4 uppercase tracking-widest hover:bg-gray-800 transition-colors"
                        >
                            Inquire About This Look
                        </Link>
                    </div>
                </div>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <div className="mt-32 border-t border-gray-200 pt-16">
                        <div className="flex justify-between items-end mb-12">
                            <h2 className="text-3xl font-serif">You May Also Like</h2>
                            <Link href="/portfolio" className="hidden md:inline-block border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
                                View Full Portfolio
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map((p) => (
                                <Link key={p.id} href={`/portfolio/${p.id}`} className="group block">
                                    <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden mb-4">
                                        <Image
                                            src={p.image}
                                            alt={p.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <h3 className="text-xl font-serif text-black-rich group-hover:text-gray-600 transition-colors">{p.title}</h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider mt-1">{p.category}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
