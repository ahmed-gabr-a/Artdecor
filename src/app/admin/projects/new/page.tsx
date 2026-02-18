"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        details: "",
        category: "residential",
        year: new Date().getFullYear().toString(),
        location: "",
    });
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            alert("الرجاء اختيار صورة");
            return;
        }

        setLoading(true);
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        data.append("image", image);

        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                body: data,
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                const err = await res.json();
                alert(err.error || "فشل الحفظ");
            }
        } catch (error) {
            alert("حدث خطأ أثناء الاتصال");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black-rich text-creme p-8">
            <div className="container mx-auto max-w-2xl">
                <Link href="/admin" className="inline-flex items-center text-gold mb-8 hover:text-white transition-colors">
                    <ArrowLeft className="ml-2" /> العودة
                </Link>

                <h1 className="text-3xl font-serif text-gold mb-8">إضافة مشروع جديد</h1>

                <form onSubmit={handleSubmit} className="bg-charcoal p-8 rounded-lg border border-gold/10 space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">عنوان المشروع</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-black-rich border border-gold/30 rounded p-3 focus:outline-none focus:border-gold"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">صورة المشروع</label>
                        <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={(e) => setImage(e.target.files?.[0] || null)}
                            className="w-full bg-black-rich border border-gold/30 rounded p-3 focus:outline-none focus:border-gold"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">التصنيف</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-black-rich border border-gold/30 rounded p-3 focus:outline-none focus:border-gold text-white"
                            >
                                <option value="residential">سكني</option>
                                <option value="commercial">تجاري</option>
                                <option value="restaurant">مطاعم</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">السنة</label>
                            <input
                                type="text"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className="w-full bg-black-rich border border-gold/30 rounded p-3 focus:outline-none focus:border-gold"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">الموقع</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full bg-black-rich border border-gold/30 rounded p-3 focus:outline-none focus:border-gold"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">وصف مختصر</label>
                        <textarea
                            required
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-black-rich border border-gold/30 rounded p-3 focus:outline-none focus:border-gold"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">تفاصيل كاملة</label>
                        <textarea
                            rows={5}
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            className="w-full bg-black-rich border border-gold/30 rounded p-3 focus:outline-none focus:border-gold"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gold text-black-rich font-bold py-3 rounded hover:bg-gold-light transition-colors flex justify-center items-center"
                    >
                        {loading ? "جاري الحفظ..." : <><Save className="ml-2" /> حفظ المشروع</>}
                    </button>
                </form>
            </div>
        </div>
    );
}
