"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { Project } from "@/lib/supabase-data";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        try {
            const res = await fetch('/api/projects');
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (error) {
            console.error("Failed to fetch projects", error);
        }
        setLoading(false);
    }

    async function handleDelete(id: string | number) {
        if (!confirm("Are you sure you want to delete this project?")) return;

        const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });

        if (!res.ok) {
            alert("Error deleting project");
        } else {
            fetchProjects(); // refresh
        }
    }

    if (loading) return <div className="p-12 text-center text-gold"><Loader2 className="animate-spin inline" /> Loading...</div>;

    return (
        <div className="p-8 text-creme">
            <div className="flex justify-between items-center mb-8 border-b border-gold/10 pb-4">
                <h1 className="text-3xl font-serif text-gold">Projects</h1>
                <button
                    onClick={() => {
                        alert("Navigating to New Project...");
                        window.location.href = "/admin/projects/new";
                    }}
                    className="bg-gold text-black-rich px-6 py-2 rounded font-bold hover:bg-gold-light transition flex items-center space-x-2 relative z-50 cursor-pointer"
                >
                    <Plus size={18} />
                    <span>Add Project</span>
                </button>
            </div>

            <div className="bg-charcoal rounded-lg border border-gold/10 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black-rich text-gold uppercase text-xs tracking-wider">
                        <tr>
                            <th className="p-4">Image</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Location / Year</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-white/5 transition">
                                <td className="p-4">
                                    <div className="w-16 h-16 relative rounded overflow-hidden border border-gray-700">
                                        <img src={project.image} alt={project.title} className="object-cover w-full h-full" />
                                    </div>
                                </td>
                                <td className="p-4 font-serif text-lg">{project.title}</td>
                                <td className="p-4 text-gray-400 capitalize">{project.category}</td>
                                <td className="p-4 text-gray-500 text-sm">
                                    {project.location} • {project.year}
                                </td>
                                <td className="p-4 text-right space-x-3">
                                    <Link
                                        href={`/admin/projects/edit/${project.id}`}
                                        className="text-gray-400 hover:text-gold inline-block transition"
                                        title="Edit"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="text-gray-400 hover:text-red-400 inline-block transition"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-500">
                                    No projects found. Click "Add Project" to start.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
