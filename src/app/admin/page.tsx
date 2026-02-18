
import { PrismaClient } from "@prisma/client";
import ProjectList from "./project-list";

const prisma = new PrismaClient(); // In prod, use singleton pattern

export const dynamic = "force-dynamic"; // Ensure fresh data

export default async function AdminDashboard() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="bg-black-rich text-creme p-8 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif text-gold">Projects Management</h1>
                    <a href="/admin/projects/new" className="bg-gold text-black-rich px-4 py-2 rounded hover:bg-gold-light transition-colors">
                        + New Project
                    </a>
                </div>
                <ProjectList initialProjects={projects as any[]} />
            </div>
        </div>
    );
}
