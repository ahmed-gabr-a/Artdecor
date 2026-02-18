
import PortfolioGallery from "@/components/PortfolioGallery";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <main className="min-h-screen bg-white text-black-rich pt-24 pb-12">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h1 className="text-5xl md:text-6xl font-serif mb-6">Our Portfolio</h1>
                <p className="text-gray-500 max-w-2xl mx-auto font-light">
                    A curated selection of our finest work, demonstrating our commitment to excellence in residential and commercial design.
                </p>
            </div>
            <PortfolioGallery projects={projects as any[]} />
        </main>
    );
}
