
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const project = await prisma.project.findUnique({
            where: { id: parseInt(id) },
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const formData = await request.formData();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const details = formData.get("details") as string;
        const category = formData.get("category") as string;
        const year = formData.get("year") as string;
        const location = formData.get("location") as string;
        const imageFile = formData.get("image") as File | null;

        const dataToUpdate: any = {
            title,
            description,
            details,
            category,
            year,
            location,
        };

        if (imageFile) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const filename = Date.now() + "_" + imageFile.name.replaceAll(" ", "_");

            // In a real app, you'd upload to S3 or similar. Here we save locally.
            // Note: Saving to public folder in production/Vercel won't persist.
            // But for local VPS or dev, it works.
            const fs = require('fs');
            const path = require('path');
            const uploadDir = path.join(process.cwd(), "public/assets/images/projects");

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            fs.writeFileSync(path.join(uploadDir, filename), buffer);
            dataToUpdate.image = `/assets/images/projects/${filename}`;
        }

        const project = await prisma.project.update({
            where: { id: parseInt(id) },
            data: dataToUpdate,
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.project.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
