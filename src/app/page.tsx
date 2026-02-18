import Image from "next/image";
import Link from "next/link";
import PortfolioGallery from "@/components/PortfolioGallery";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import { PrismaClient } from "@prisma/client";
import { getContent } from "@/lib/content";

const prisma = new PrismaClient();

async function getProjects() {
  const projects = await prisma.project.findMany();
  return projects;
}

export default async function Home() {
  const projects = await getProjects();
  const content = await getContent();

  return (
    <main className="min-h-screen bg-creme text-black-rich">
      <Hero
        title={content.home_hero_title}
        subtitle={content.home_hero_subtitle}
      />

      {/* Intro Section - Minimalist & Typography Focused */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right" className="space-y-8 text-left">
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              {content.home_intro_title || "Design Beyond Boundaries."}
            </h2>
            <p className="text-xl text-gray-600 font-light leading-relaxed max-w-md whitespace-pre-line">
              {content.home_intro_text || "Step into a world where imagination meets precision. We transform spaces into breathtaking works of art that reflect your unique vision."}
            </p>
            <Link
              href="/about"
              className="inline-block border-b border-black pb-1 hover:text-gold hover:border-gold transition-all text-lg"
            >
              Discover Our Story
            </Link>
          </FadeIn>
          <FadeIn direction="left" className="relative h-[600px] w-full hidden md:block">
            {/* Abstract/Minimalist Image Placeholder or Logic */}
            <div className="absolute inset-0 bg-gray-200">
              {/* Use the first project image as a feature if available, else a placeholder */}
              {projects.length > 0 && (
                <Image
                  src={projects[0].image}
                  alt="Interior Design Feature"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Portfolio Section */}
      <div id="portfolio" className="bg-white py-24">
        <FadeIn className="container mx-auto px-6 mb-16 flex justify-between items-end">
          <div className="text-left">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Selected Works</h3>
            <h2 className="text-4xl md:text-5xl font-serif">Our Portfolio</h2>
          </div>
          <Link href="/portfolio" className="hidden md:inline-block hover:text-gold transition-colors">
            View All Projects &rarr;
          </Link>
        </FadeIn>
        <PortfolioGallery projects={projects} />
        <div className="text-center mt-12 md:hidden">
          <Link href="/portfolio" className="border border-black px-6 py-3 hover:bg-black hover:text-white transition-all">
            View All Projects
          </Link>
        </div>
      </div>

      {/* Services Brief - 3 Column Minimalist */}
      <section className="py-24 px-6 bg-beige">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <FadeIn delay={0.1} className="space-y-4">
              <span className="text-gold text-5xl font-serif">01</span>
              <h3 className="text-2xl font-serif">Interior Design</h3>
              <p className="text-gray-600">Comprehensive residential and commercial design services tailored to your lifestyle.</p>
            </FadeIn>
            <FadeIn delay={0.2} className="space-y-4">
              <span className="text-gold text-5xl font-serif">02</span>
              <h3 className="text-2xl font-serif">Consultation</h3>
              <p className="text-gray-600">Expert guidance on layout, materials, and aesthetics to refine your vision.</p>
            </FadeIn>
            <FadeIn delay={0.3} className="space-y-4">
              <span className="text-gold text-5xl font-serif">03</span>
              <h3 className="text-2xl font-serif">Execution</h3>
              <p className="text-gray-600">Flawless implementation and project management from concept to completion.</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 text-center bg-black-rich text-creme">
        <h2 className="text-4xl md:text-6xl font-serif mb-8">Ready to transform<br />your space?</h2>
        <Link
          href="/contact"
          className="inline-block bg-gold text-black-rich px-10 py-4 text-lg font-bold hover:bg-white transition-colors"
        >
          Start Your Project
        </Link>
      </section>

    </main>
  );
}
