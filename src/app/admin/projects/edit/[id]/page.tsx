"use client";

import { useEffect, useState, use } from "react";
import ProjectForm from "../../project-form";

import { Loader2 } from "lucide-react";

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const [project, setProject] = useState<any>(null);
    // Unwrap params using React.use()
    const { id } = use(params);

    useEffect(() => {
        fetch(`/api/projects/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) setProject(data);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!project) return <div className="p-12 text-center text-gold"><Loader2 className="animate-spin inline" /> Loading...</div>;

    return (
        <div className="p-8 text-creme">
            <h1 className="text-3xl font-serif text-gold mb-8">Edit Project</h1>
            <ProjectForm initialData={project} isEdit />
        </div>
    );
}
