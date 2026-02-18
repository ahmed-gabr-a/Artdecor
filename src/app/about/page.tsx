import Image from "next/image";
import { getContent } from "@/lib/content";
import FadeIn from "@/components/FadeIn";

export default async function AboutPage() {
    const content = await getContent();
    return (
        <main className="min-h-screen bg-creme text-black-rich py-24 px-6 md:px-12">
            <div className="container mx-auto max-w-7xl">
                {/* Hero Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <FadeIn direction="right" className="space-y-6 text-left">
                        <h1 className="text-5xl md:text-7xl font-serif leading-tight">
                            {content.about_title || "Crafting Legacy."}
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                            {content.about_text || "Founded on the principles of timeless elegance and functional luxury, Art Decor has been transforming spaces for over a decade. We believe that every interior should tell a unique story—yours."}
                        </p>
                    </FadeIn>
                    <FadeIn direction="left" className="relative h-[500px] w-full bg-gray-200">
                        {/* Placeholder for About Image - could be office interior or team */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-light">
                            About Image Placeholder
                        </div>
                    </FadeIn>
                </div>

                {/* Values Section */}
                <div className="border-t border-black pt-16 mb-24">
                    <FadeIn>
                        <h2 className="text-3xl font-serif mb-12 text-left">Our Philosophy</h2>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                        <FadeIn delay={0.1} className="space-y-4">
                            <h3 className="text-xl font-serif">Innovation</h3>
                            <p className="text-gray-600 text-sm">Constantly exploring new materials and techniques to push the boundaries of design.</p>
                        </FadeIn>
                        <FadeIn delay={0.2} className="space-y-4">
                            <h3 className="text-xl font-serif">Precision</h3>
                            <p className="text-gray-600 text-sm">Obsessive attention to detail in every joinery, stitch, and finish.</p>
                        </FadeIn>
                        <FadeIn delay={0.3} className="space-y-4">
                            <h3 className="text-xl font-serif">Collaboration</h3>
                            <p className="text-gray-600 text-sm">Working closely with clients to ensure their vision is realized beyond expectations.</p>
                        </FadeIn>
                    </div>
                </div>

                {/* Team/Process/History Placeholder */}
                <FadeIn className="bg-white p-12 md:p-24 text-center">
                    <h2 className="text-4xl font-serif mb-6">Let's Create Something Beautiful</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                        Whether you're looking to refresh a single room or redesign an entire property, our team is ready to bring your vision to life.
                    </p>
                    <a href="/contact" className="inline-block border-b border-black pb-1 hover:text-gold hover:border-gold transition-colors text-lg">
                        Get in Touch
                    </a>
                </FadeIn>
            </div>
        </main>
    );
}
