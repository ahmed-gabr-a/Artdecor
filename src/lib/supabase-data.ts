
import { supabase } from './supabase';
import { projects as localProjects, ProjectData } from './data';

export type Project = ProjectData;

export async function getProjects(): Promise<Project[]> {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) {
            console.warn('Supabase fetch failed or empty, using local data fallback');
            // Try reading from dynamic local DB first
            try {
                const { readLocalProjects } = await import('./json-db');
                const dynamicLocal = await readLocalProjects();
                if (dynamicLocal && dynamicLocal.length > 0) return dynamicLocal;
            } catch (e) { }

            return localProjects;
        }

        // Map Supabase data to Project interface
        return data.map((p: any) => ({
            id: p.id,
            category: p.category,
            image: p.image_url,
            gallery: p.gallery || [], // Assume DB has jsonb or array for gallery
            videos: p.videos || [],
            title: p.title,
            description: p.description,
            details: p.details,
            year: p.year,
            location: p.location
        }));
    } catch (e) {
        console.error("Supabase client error, using fallback", e);
        return localProjects;
    }
}

export async function getProject(id: string | number): Promise<Project | null> {
    // If id is numeric, it's likely local data
    if (typeof id === 'number' || !isNaN(Number(id))) {
        const local = localProjects.find(p => p.id === Number(id));
        if (local) return local;
    }

    // Else try Supabase UUID
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            // Fallback: check legacy numeric ID if passed as string
            const local = localProjects.find(p => p.id.toString() === id.toString());
            return local || null;
        }

        return {
            id: data.id,
            category: data.category,
            image: data.image_url,
            gallery: data.gallery || [],
            videos: data.videos || [],
            title: data.title,
            description: data.description,
            details: data.details,
            year: data.year,
            location: data.location
        };
    } catch (e) {
        const local = localProjects.find(p => p.id.toString() === id.toString());
        return local || null;
    }
}

export async function getContent(key: string): Promise<string> {
    try {
        const { data } = await supabase
            .from('content_blocks')
            .select('content')
            .eq('key', key)
            .single();
        return data?.content || '';
    } catch (e) {
        return '';
    }
}
