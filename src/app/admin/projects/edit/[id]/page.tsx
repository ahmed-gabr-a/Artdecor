"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [details, setDetails] = useState("");
    const [category, setCategory] = useState("residential");
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [location, setLocation] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            try {
                const res = await fetch(`/api/projects/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setTitle(data.title);
                    setDescription(data.description);
                    setDetails(data.details || "");
                    setCategory(data.category);
                    setYear(data.year);
                    setLocation(data.location || "");
                    setCurrentImageUrl(data.image);
                } else {
                    alert("المشروع غير موجود");
                    router.push("/admin");
                }
            } catch (error) {
                console.error("Failed to fetch project", error);
                alert("حدث خطأ أثناء جلب البيانات");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [id, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("details", details);
        formData.append("category", category);
        formData.append("year", year);
        formData.append("location", location);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                const errorData = await res.json();
                alert(`فشل التحديث: ${errorData.error}`);
            }
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء حفظ التعديلات");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black-rich text-gold flex justify-center items-center">
                <Loader2 className="animate-spin h-10 w-10" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black-rich text-creme p-8" dir="rtl">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-serif text-gold mb-8">تعديل المشروع</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-gold mb-2">اسم المشروع</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-charcoal border border-gold/20 rounded p-3 text-white focus:border-gold outline-none"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-gold mb-2">التصنيف</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-charcoal border border-gold/20 rounded p-3 text-white focus:border-gold outline-none"
                        >
                            <option value="residential">سكني</option>
                            <option value="commercial">تجاري</option>
                            <option value="classic">كلاسيك</option>
                            <option value="modern">مودرن</option>
                            <option value="restaurant">مطاعم</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gold mb-2">وصف مختصر</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-charcoal border border-gold/20 rounded p-3 text-white focus:border-gold outline-none"
                            required
                        />
                    </div>

                    {/* Details */}
                    <div>
                        <label className="block text-gold mb-2">التفاصيل الكاملة</label>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            rows={4}
                            className="w-full bg-charcoal border border-gold/20 rounded p-3 text-white focus:border-gold outline-none"
                        />
                    </div>

                    {/* Location & Year */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gold mb-2">الموقع</label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full bg-charcoal border border-gold/20 rounded p-3 text-white focus:border-gold outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gold mb-2">السنة</label>
                            <input
                                type="text"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full bg-charcoal border border-gold/20 rounded p-3 text-white focus:border-gold outline-none"
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-gold mb-2">صورة المشروع</label>
                        <div className="border-2 border-dashed border-gold/30 rounded-lg p-8 text-center hover:border-gold transition-colors relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />

                            {(previewUrl || currentImageUrl) ? (
                                <div className="relative h-48 w-full mt-2 rounded overflow-hidden">
                                    <Image
                                        src={previewUrl || currentImageUrl!}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setPreviewUrl(null);
                                            setImageFile(null);
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 z-10"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <Upload size={32} className="mb-2" />
                                    <p>اضغط أو اسحب صورة هنا لرفعها</p>
                                    <span className="text-xs mt-1 text-gray-500">JPG, PNG, WEBP</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full bg-gold text-black-rich py-3 rounded font-bold hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                    >
                        {isSaving ? "جاري الحفظ..." : "حفظ التعديلات"}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-full bg-transparent border border-gray-600 text-gray-300 py-3 rounded hover:bg-white/5 transition-colors mt-2"
                    >
                        إلغاء
                    </button>
                </form>
            </div>
        </div>
    );
}
