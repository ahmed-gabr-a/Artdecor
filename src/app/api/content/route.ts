import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const mode = searchParams.get("mode");

        const content = await prisma.contentBlock.findMany();

        if (mode === "admin") {
            return NextResponse.json(content);
        }

        // Convert array to object for easier frontend access: { key: value }
        const contentMap = content.reduce((acc: Record<string, string>, item: { key: string; value: string }) => {
            acc[item.key] = item.value;
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json(contentMap);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { key, value } = body;

        if (!key || value === undefined) {
            return NextResponse.json({ error: "Missing key or value" }, { status: 400 });
        }

        const updated = await prisma.contentBlock.update({
            where: { key },
            data: { value },
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
    }
}
