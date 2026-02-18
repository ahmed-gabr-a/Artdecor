"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";

type ContentBlock = {
    key: string;
    value: string;
    section: string;
    label: string;
    type: string;
};

export default function AdminContentPage() {
    const [content, setContent] = useState<Record<string, string>>({});
    const [blocks, setBlocks] = useState<ContentBlock[]>([]); // We need metadata (label, section) which isn't in the simple helper key-value return. 
    // Actually, the simple helper returns key-value. The API returns the array? No, strict API returns object. 
    // We need a metadata endpoint or just hardcode the structure labels here to match? 
    // Better: Update API to return full objects for Admin, or create a specific admin endpoint. 
    // For now, let's fetch the raw full list from a new server action or just update the GET api to return list if requested?
    // Let's create a specific fetcher for full data or just assume we know the schema?
    // User wants "CMS", so dynamic is better.
    // I will modify the GET API to return full array if a query param is present, or just create a separate client fetcher here that hits prisma if I was server component?
    // But this is client component. 
    // Let's modify the GET API to Support returning the full array.

    // WAIT: I can just fetch the raw data from Prisma inside a Server Component wrapper and pass it to this Client Component.

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null); // key of item being saved

    // We'll fetching inside a useEffect for now, but really we should use the API route.
    // Let's stick to the /api/content route but I need metadata.
    // Plan: Update /api/content to return full array. The helper uses it to map to object.

    const [groupedBlocks, setGroupedBlocks] = useState<Record<string, ContentBlock[]>>({});

    useEffect(() => {
        fetch('/api/content?mode=admin') // I'll add this mode support
            .then(res => res.json())
            .then(data => {
                // expecting array
                if (Array.isArray(data)) {
                    const grouped = data.reduce((acc, item) => {
                        if (!acc[item.section]) acc[item.section] = [];
                        acc[item.section].push(item);
                        return acc;
                    }, {} as Record<string, ContentBlock[]>);
                    setGroupedBlocks(grouped);

                    // Helper state for input values
                    const initialValues = data.reduce((acc, item) => {
                        acc[item.key] = item.value;
                        return acc;
                    }, {} as Record<string, string>);
                    setContent(initialValues);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSave = async (key: string) => {
        setSaving(key);
        try {
            const res = await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value: content[key] })
            });
            if (!res.ok) throw new Error("Failed");
            // Success feedback?
        } catch (e) {
            alert("Error saving");
        } finally {
            setSaving(null);
        }
    };

    if (loading) return <div className="p-12 text-center text-gold"><Loader2 className="animate-spin inline" /> Loading...</div>;

    return (
        <div className="p-8 text-creme" dir="ltr"> {/* LTR for simpler admin usage, or RTL if user prefers? Let's stick to English UI for admin for now as code is English based, but content is Arabic */}
            <h1 className="text-3xl font-serif text-gold mb-8">Content Management</h1>

            <div className="space-y-12">
                {Object.entries(groupedBlocks).map(([section, items]) => (
                    <div key={section} className="bg-charcoal p-6 rounded-lg border border-gold/10">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-gold-light mb-6 border-b border-gold/10 pb-2">{section} Page</h2>
                        <div className="grid gap-6">
                            {items.map((block) => (
                                <div key={block.key} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                    <div className="md:col-span-1 pt-2">
                                        <label className="text-sm font-semibold text-gray-400 block">{block.label}</label>
                                        <code className="text-xs text-gray-600">{block.key}</code>
                                    </div>
                                    <div className="md:col-span-3 flex gap-4">
                                        {block.type === 'textarea' ? (
                                            <textarea
                                                value={content[block.key]}
                                                onChange={e => setContent({ ...content, [block.key]: e.target.value })}
                                                rows={4}
                                                className="flex-1 bg-black-rich border border-gray-700 rounded p-3 text-white focus:border-gold outline-none transition-colors"
                                                dir="auto"
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                value={content[block.key]}
                                                onChange={e => setContent({ ...content, [block.key]: e.target.value })}
                                                className="flex-1 bg-black-rich border border-gray-700 rounded p-3 text-white focus:border-gold outline-none transition-colors"
                                                dir="auto"
                                            />
                                        )}
                                        <button
                                            onClick={() => handleSave(block.key)}
                                            disabled={saving === block.key}
                                            className="bg-gold/10 text-gold hover:bg-gold hover:text-black p-3 rounded h-fit transition-all"
                                            title="Save"
                                        >
                                            {saving === block.key ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
