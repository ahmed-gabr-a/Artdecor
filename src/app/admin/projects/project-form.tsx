"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import RichTextEditor from "@/components/RichTextEditor";
import { Loader2, Upload, X } from "lucide-react";

interface ProjectFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        category: initialData?.category || "residential",
        image: initialData?.image || "",
        description: initialData?.description || "",
        details: initialData?.details || "",
        year: initialData?.year || new Date().getFullYear().toString(),
        location: initialData?.location || "Cairo, Egypt",
    });

    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formDataUpload,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            setFormData({ ...formData, image: data.url });
        } catch (error) {
            alert("Error uploading image. " + error);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting form...", formData);
        if (!formData.title) {
            alert("Title is required");
            return;
        }
        setLoading(true);

        const url = isEdit ? `/api/projects/${initialData.id}` : "/api/projects";
        const method = isEdit ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({ error: res.statusText }));
                throw new Error(errData.error || "Failed to save project");
            }

            router.push("/admin");
            router.refresh();
        } catch (error: any) {
            alert("Error saving project: " + error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto bg-charcoal p-8 rounded-lg border border-gold/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-gray-400 text-sm">Project Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-black-rich border border-gray-700 rounded p-3 text-white focus:border-gold outline-none"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-gray-400 text-sm">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-black-rich border border-gray-700 rounded p-3 text-white focus:border-gold outline-none"
                    >
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="hospitality">Hospitality</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-gray-400 text-sm">Main Image (Url or Upload)</label>
                <div className="flex flex-col space-y-3">
                    <input
                        type="text"
                        placeholder="Image URL (e.g. /assets/project.jpg)"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full bg-black-rich border border-gray-700 rounded p-3 text-white focus:border-gold outline-none text-sm"
                    />
                    <div className="flex items-center space-x-4">
                        {formData.image && (
                            <div className="relative w-24 h-24 rounded overflow-hidden border border-gray-600 group">
                                <img src={formData.image} alt="Preview" className="object-cover w-full h-full" />
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, image: "" })}
                                    className="absolute top-0 right-0 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        )}
                        <label className="cursor-pointer bg-gold/10 text-gold hover:bg-gold hover:text-black-rich px-4 py-3 rounded transition flex items-center space-x-2">
                            {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                            <span>{uploading ? "Uploading..." : "Upload Image"}</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                        </label>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-gray-400 text-sm">Short Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-black-rich border border-gray-700 rounded p-3 text-white focus:border-gold outline-none"
                    rows={2}
                />
            </div>

            <div className="space-y-2">
                <label className="text-gray-400 text-sm">Full Details (Rich Text)</label>
                <RichTextEditor
                    value={formData.details}
                    onChange={(val) => setFormData({ ...formData, details: val })}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-gray-400 text-sm">Location</label>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-black-rich border border-gray-700 rounded p-3 text-white focus:border-gold outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-gray-400 text-sm">Year</label>
                    <input
                        type="text"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full bg-black-rich border border-gray-700 rounded p-3 text-white focus:border-gold outline-none"
                    />
                </div>
            </div>

            <div className="pt-6 border-t border-gold/10">
                <button
                    type="submit"
                    disabled={loading || uploading}
                    className="bg-gold text-black-rich font-bold py-3 px-8 rounded w-full hover:bg-gold-light transition disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Project"}
                </button>
            </div>
        </form>
    );
}
