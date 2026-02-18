
import { getProject } from "@/lib/supabase-data";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, CheckCircle, Smartphone } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const revalidate = 0;

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl text-gold font-serif mb-4">Project Not Found</h1>
                    <Link href="/portfolio" className="text-gray-500 hover:text-black hover:underline">
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Image */}
            <div className="h-[60vh] md:h-[80vh] relative w-full bg-gray-200">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="container mx-auto">
                        <Link href="/portfolio" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                            <ArrowLeft size={20} className="mr-2" />
                            Back to Portfolio
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-serif text-white mb-2">{project.title}</h1>
                        <span className="text-gold uppercase tracking-widest text-sm">{project.category}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl py-24 px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {/* Details Sidebar */}
                    <div className="md:col-span-1 space-y-8">
                        <FadeIn>
                            <div className="border-t border-gold pt-6">
                                <div className="flex items-center space-x-3 text-gold mb-2">
                                    <MapPin size={20} />
                                    <span className="uppercase tracking-widest text-xs font-bold">Location</span>
                                </div>
                                <p className="text-gray-600 font-light">{project.location}</p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <div className="border-t border-gold pt-6">
                                <div className="flex items-center space-x-3 text-gold mb-2">
                                    <Calendar size={20} />
                                    <span className="uppercase tracking-widest text-xs font-bold">Year</span>
                                </div>
                                <p className="text-gray-600 font-light">{project.year}</p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <div className="bg-creme p-6 rounded-lg">
                                <h3 className="font-serif text-lg mb-4">Project Highlights</h3>
                                <div className="space-y-2">
                                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                                        <CheckCircle size={16} className="text-gold mt-0.5 shrink-0" />
                                        <span>Premium Materials</span>
                                    </div>
                                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                                        <CheckCircle size={16} className="text-gold mt-0.5 shrink-0" />
                                        <span>Custom Furniture</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-12">
                        <FadeIn delay={0.3} className="text-lg leading-relaxed text-gray-600 font-light">
                            <h3 className="text-2xl font-serif text-black-rich mb-4">Concept</h3>
                            <p className="mb-8">{project.description}</p>

                            <h3 className="text-2xl font-serif text-black-rich mb-4">Execution Details</h3>
                            <div
                                className="prose prose-gold max-w-none text-gray-600 font-light"
                                dangerouslySetInnerHTML={{ __html: project.details }}
                            />
                        </FadeIn>

                        {/* Video Gallery */}
                        {project.videos && project.videos.length > 0 && (
                            <div className="mt-12 space-y-8">
                                <h3 className="text-2xl font-serif text-black-rich">Project Videos</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {project.videos.map((vid, i) => (
                                        <div key={i} className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                                            <video controls className="w-full h-full">
                                                <source src={vid} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Image Gallery */}
                        {project.gallery && project.gallery.length > 0 && (
                            <div className="mt-12">
                                <h3 className="text-2xl font-serif text-black-rich mb-8">Gallery</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.gallery.map((img, index) => (
                                        <div key={index} className="aspect-[4/3] bg-gray-100 rounded overflow-hidden cursor-pointer group">
                                            <img
                                                src={img}
                                                alt={`${project.title} - ${index}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
