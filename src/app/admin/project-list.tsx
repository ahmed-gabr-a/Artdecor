"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Edit, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define Project type locally for now or import from Prisma client type
type Project = {
    id: number;
    title: string;
    category: string;
    image: string;
};

export default function ProjectList({ initialProjects }: { initialProjects: Project[] }) {
    const [projects, setProjects] = useState(initialProjects);
    const router = useRouter();

    const handleDelete = async (id: number) => {
        if (!confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setProjects(projects.filter((p) => p.id !== id));
                router.refresh();
            } else {
                alert("فشل الحذف");
            }
        } catch (error) {
            alert("حدث خطأ");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif text-gold">إدارة المشاريع</h1>
                <Link
                    href="/admin/projects/new"
                    className="bg-gold text-black-rich px-4 py-2 rounded flex items-center hover:bg-gold-light transition-colors"
                >
                    <Plus className="mr-2 h-4 w-4" /> إضافة مشروع جديد
                </Link>
            </div>

            <div className="bg-charcoal rounded-lg border border-gold/10 overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-black-rich text-gold border-b border-gold/20">
                        <tr>
                            <th className="p-4">الصورة</th>
                            <th className="p-4">العنوان</th>
                            <th className="p-4">التصنيف</th>
                            <th className="p-4">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="relative w-16 h-12 rounded overflow-hidden">
                                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                                    </div>
                                </td>
                                <td className="p-4 font-medium text-white">{project.title}</td>
                                <td className="p-4 text-gray-400">{project.category}</td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                        title="حذف"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    {/* Edit button placeholder */}
                                    <Link
                                        href={`/admin/projects/edit/${project.id}`}
                                        className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                                        title="تعديل"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {projects.length === 0 && (
                    <div className="p-8 text-center text-gray-500">لا توجد مشاريع مضافة.</div>
                )}
            </div>
        </div>
    );
}
