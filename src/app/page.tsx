
import Hero from "@/components/Hero";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { getProjects } from "@/lib/supabase-data";
import { ArrowRight } from "lucide-react";

import { siteContentSchema } from "@/lib/site-content";
import { readLocalContent } from "@/lib/json-db";

export const revalidate = 0;

export default async function Home() {
  const projects = await getProjects();
  const featuredProjects = projects.slice(0, 3);

  // Fetch Site Content
  const localContent = await readLocalContent();
  const content = siteContentSchema.reduce((acc, item) => {
    acc[item.key] = localContent[item.key] || item.defaultValue;
    return acc;
  }, {} as Record<string, string>);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero
        title={content['hero_title']}
        subtitle={content['hero_subtitle']}
        videoUrl={content['hero_video']}
      />

      {/* Intro Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif text-black-rich leading-tight">
              Design Beyond <br /> Boundaries
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed">
              Step into a world where imagination meets precision. We transform spaces into breathtaking works of art that reflect your unique vision.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Link href="/about" className="inline-flex items-center space-x-2 text-gold hover:text-gold-dark transition-colors uppercase tracking-widest text-sm border-b border-gold pb-1">
              <span>Discover Our Story</span>
              <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 px-6 md:px-12 bg-creme" id="portfolio">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <FadeIn className="text-left">
              <span className="text-gold uppercase tracking-widest text-sm block mb-2">Selected Works</span>
              <h2 className="text-5xl md:text-6xl font-serif text-black-rich">Our Portfolio</h2>
            </FadeIn>
            <FadeIn delay={0.2} direction="left">
              <Link href="/portfolio" className="hidden md:inline-flex items-center space-x-2 text-gray-500 hover:text-black transition-colors">
                <span>View All Projects</span>
                <ArrowRight size={20} />
              </Link>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.1}>
                <Link href={`/portfolio/${project.id}`} className="group block relative overflow-hidden aspect-[4/5] bg-gray-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span className="text-gold text-xs uppercase tracking-widest mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{project.category}</span>
                    <h3 className="text-white text-2xl font-serif translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">{project.title}</h3>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/portfolio" className="inline-flex items-center space-x-2 text-gray-900 border-b border-gray-900 pb-1">
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
