
import fs from 'fs';
import path from 'path';


export interface ProjectData {
    id: number | string;
    category: string;
    image: string;
    gallery: string[];
    videos: string[];
    title: string;
    description: string;
    details: string;
    year: string;
    location: string;
}

const CONTENT_DB_PATH = path.join(process.cwd(), 'data', 'content.json');
const PROJECTS_DB_PATH = path.join(process.cwd(), 'data', 'projects.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(CONTENT_DB_PATH))) {
    fs.mkdirSync(path.dirname(CONTENT_DB_PATH), { recursive: true });
}

export async function readLocalContent(): Promise<Record<string, string>> {
    try {
        if (!fs.existsSync(CONTENT_DB_PATH)) {
            return {};
        }
        const file = fs.readFileSync(CONTENT_DB_PATH, 'utf-8');
        return JSON.parse(file);
    } catch (e) {
        console.error("Failed to read local content DB", e);
        return {};
    }
}

export async function writeLocalContent(key: string, value: string): Promise<boolean> {
    try {
        const current = await readLocalContent();
        const updated = { ...current, [key]: value };
        fs.writeFileSync(CONTENT_DB_PATH, JSON.stringify(updated, null, 2));
        return true;
    } catch (e) {
        console.error("Failed to write local content DB", e);
        return false;
    }
}

// --- Projects ---

export async function readLocalProjects(): Promise<ProjectData[]> {
    try {
        if (!fs.existsSync(PROJECTS_DB_PATH)) {
            // Initialize with default data if missing
            const { projects } = await import('./data');
            // Ensure IDs are consistent? local data.ts uses number IDs.
            // We'll write it to disk so we can edit it.
            fs.writeFileSync(PROJECTS_DB_PATH, JSON.stringify(projects, null, 2));
            return projects;
        }

        const file = fs.readFileSync(PROJECTS_DB_PATH, 'utf-8');
        return JSON.parse(file);
    } catch (e) {
        console.error("Failed to read local projects DB", e);
        return [];
    }
}

export async function writeLocalProject(project: ProjectData): Promise<ProjectData | null> {
    try {
        const projects = await readLocalProjects();
        const index = projects.findIndex(p => p.id.toString() === project.id.toString());

        let updatedProject = { ...project };

        if (index !== -1) {
            // Update existing
            projects[index] = updatedProject;
        } else {
            // Create new
            // Generate a numeric ID if not present? Or use UUID?
            // Local fallback uses numeric IDs often. Let's stick to numeric for local consistency if possible, or UUID string.
            // If ID is currently string 'new', generate one.
            if (!updatedProject.id || updatedProject.id === 'new') {
                updatedProject.id = Date.now(); // Simple numeric ID based on timestamp
            }
            projects.unshift(updatedProject);
        }

        fs.writeFileSync(PROJECTS_DB_PATH, JSON.stringify(projects, null, 2));
        return updatedProject;
    } catch (e) {
        console.error("Failed to write local project DB", e);
        return null;
    }
}

export async function deleteLocalProject(id: string | number): Promise<boolean> {
    try {
        const projects = await readLocalProjects();
        const filtered = projects.filter(p => p.id.toString() !== id.toString());
        fs.writeFileSync(PROJECTS_DB_PATH, JSON.stringify(filtered, null, 2));
        return true;
    } catch (e) {
        return false;
    }
}

