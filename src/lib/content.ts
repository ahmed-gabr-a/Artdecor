import { PrismaClient } from "@prisma/client";

// Use a singleton pattern or import existing client if available to avoid connection limits
const prisma = new PrismaClient();

export async function getContent() {
    try {
        const content = await prisma.contentBlock.findMany();
        return content.reduce((acc: Record<string, string>, item: { key: string; value: string }) => {
            acc[item.key] = item.value;
            return acc;
        }, {} as Record<string, string>);
    } catch (error) {
        console.error("Failed to fetch content:", error);
        return {};
    }
}
