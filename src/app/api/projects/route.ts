
import { getServerSession } from "next-auth";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


// GET /api/projects - List all projects
export async function GET() {
    // Try Supabase first
    try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
            if (!error && data && data.length > 0) return NextResponse.json(data);
        }
    } catch (e) { }

    // Fallback to Local DB
    const { readLocalProjects } = await import('@/lib/json-db');
    const localData = await readLocalProjects();
    return NextResponse.json(localData);
}

// POST /api/projects - Create new project
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    // if (!session) {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const body = await request.json();
    const { title, category, image, description, details, year, location } = body;

    // Try Supabase
    try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            const { data, error } = await supabase.from("projects").insert([{
                title, category, image_url: image, description, details, year, location
            }]).select();
            if (!error && data) return NextResponse.json(data[0]);
        }
    } catch (e) { }

    // Fallback to Local DB
    const { writeLocalProject } = await import('@/lib/json-db');
    const newProject = await writeLocalProject({
        id: 'new',
        title, category, image, description, details, year, location,
        gallery: [], videos: []
    } as any);

    return NextResponse.json(newProject);
}

