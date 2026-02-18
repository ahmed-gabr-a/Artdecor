
import { getServerSession } from "next-auth";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";



// GET /api/projects/[id] - Get project details
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    // Try Supabase first
    try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .eq("id", id)
                .single();
            if (!error && data) return NextResponse.json(data);
        }
    } catch (e) { }

    // Fallback Local DB
    const { readLocalProjects } = await import('@/lib/json-db');
    const localProjects = await readLocalProjects();
    const project = localProjects.find((p: any) => p.id.toString() === id.toString());

    if (!project) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
}

// PUT /api/projects/[id] - Update project
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;
    const body = await request.json();
    const { title, category, image, description, details, year, location } = body;

    // Try Supabase
    try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            const { data, error } = await supabase
                .from("projects")
                .update({ title, category, image_url: image, description, details, year, location })
                .eq("id", id)
                .select();
            if (!error && data) return NextResponse.json(data[0]);
        }
    } catch (e) { }

    // Fallback Local DB
    const { writeLocalProject } = await import('@/lib/json-db');
    const updated = await writeLocalProject({
        id, title, category, image, description, details, year, location,
        gallery: [], videos: []
    } as any);

    return NextResponse.json(updated);
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;

    // Try Supabase
    try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            await supabase.from("projects").delete().eq("id", id);
        }
    } catch (e) { }

    // Fallback Local DB
    const { deleteLocalProject } = await import('@/lib/json-db');
    await deleteLocalProject(id);

    return NextResponse.json({ success: true });
}

