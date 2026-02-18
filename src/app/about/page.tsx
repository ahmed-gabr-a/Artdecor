
import FadeIn from "@/components/FadeIn";
import { getContent } from "@/lib/supabase-data";

export const revalidate = 0;

export default async function About() {
    // We could fetch this from Supabase content_blocks if populated
    // const aboutText = await getContent('about_mission');

    return (
        <div className="min-h-screen bg-creme py-24 px-6 md:px-12">
            <div className="container mx-auto max-w-5xl">
                <FadeIn>
                    <h1 className="text-5xl md:text-7xl font-serif mb-12 text-center md:text-left">Who We Are</h1>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <FadeIn delay={0.2} className="space-y-6 text-lg font-light text-gray-600 leading-relaxed text-left">
                        <p>
                            Art Decor is a premier interior design studio based in Cairo, dedicated to creating spaces that tell a story. We believe that luxury lies in the details and that every environment should be a reflection of those who inhabit it.
                        </p>
                        <p>
                            With over a decade of experience in residential, commercial, and hospitality projects, our team combines architectural precision with artistic flair. From classic opulence to modern minimalism, we navigate diverse styles with ease.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.4} direction="left">
                        <div className="aspect-square bg-gray-200 relative overflow-hidden rounded-lg">
                            {/* Placeholder for About Image - could be fetched */}
                            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white/20 font-serif text-4xl">
                                Art Decor Studio
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Values */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Precision", text: "Attention to the smallest detail ensures perfection." },
                        { title: "Innovation", text: "Pushing boundaries to create unique concepts." },
                        { title: "Integrity", text: "Transparent processes and honest communication." }
                    ].map((val, i) => (
                        <FadeIn key={i} delay={0.5 + (i * 0.1)} className="bg-white p-8 border-t-2 border-gold text-left">
                            <h3 className="text-xl font-serif mb-3">{val.title}</h3>
                            <p className="text-gray-500 font-light text-sm">{val.text}</p>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </div>
    );
}
