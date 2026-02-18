
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (e) {
        // Ignore if exists
    }

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const filepath = path.join(uploadDir, filename);

    try {
        await writeFile(filepath, buffer);
        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (e) {
        console.error("Upload failed", e);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
