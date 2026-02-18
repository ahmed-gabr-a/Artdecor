
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient(); // In prod, use singleton pattern

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const details = formData.get("details") as string;
        const category = formData.get("category") as string;
        const year = formData.get("year") as string;
        const location = formData.get("location") as string;
        const imageFile = formData.get("image") as File;

        if (!imageFile) {
            return NextResponse.json({ error: "Image is required" }, { status: 400 });
        }

        // Save image
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, '-')}`;
        const uploadDir = path.join(process.cwd(), "public/assets/images/projects");
        const filepath = path.join(uploadDir, filename);

        await writeFile(filepath, buffer as any);

        const imageUrl = `/assets/images/projects/${filename}`;

        const project = await prisma.project.create({
            data: {
                title,
                description,
                details,
                category,
                year,
                location,
                image: imageUrl,
            },
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
