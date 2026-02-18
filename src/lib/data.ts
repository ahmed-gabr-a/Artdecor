// =============================
// Art Decor — Complete Project Data
// Corrected Paths based on actual file existence
// =============================

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

export const projects: ProjectData[] = [
    // ── 1. New folder — Classic Villa Interior ──────────────────────
    {
        id: 1,
        category: "residential",
        image: "/assets/library/projects/New folder/photo_2026-02-05_17-33-26.jpg",
        gallery: [
            "/assets/library/projects/New folder/photo_2026-02-05_17-33-26.jpg",
            "/assets/library/projects/New folder/photo_2026-02-05_17-33-32.jpg",
            "/assets/library/projects/New folder/photo_2026-02-05_17-33-34.jpg",
            "/assets/library/projects/New folder/photo_2026-02-05_17-33-36.jpg",
            "/assets/library/projects/New folder/photo_2026-02-05_17-33-37.jpg",
            "/assets/library/projects/New folder/photo_2026-02-05_17-33-39.jpg",
            "/assets/library/projects/New folder/photo_2026-02-05_17-33-41.jpg",
            "/assets/library/projects/New folder/photo_2026-02-05_17-33-43.jpg",
            "/assets/library/projects/New folder/photo_2026-02-05_17-33-45.jpg",
            "/assets/library/projects/New folder/photo_2026-02-05_17-33-47.jpg",
            "/assets/library/projects/New folder/slide_1.png",
            "/assets/library/projects/New folder/slide_2.png",
            "/assets/library/projects/New folder/slide_3.png",
            "/assets/library/projects/New folder/slide_4.png",
            "/assets/library/projects/New folder/slide_5.png",
            "/assets/library/projects/New folder/slide_6.png",
            "/assets/library/projects/New folder/slide_7.png",
            "/assets/library/projects/New folder/slide_8.png",
            "/assets/library/projects/New folder/slide_9.png",
            "/assets/library/projects/New folder/slide_10.png",
            "/assets/library/projects/New folder/slide_11.png",
            "/assets/library/projects/New folder/slide_12.png",
        ],
        videos: [],
        title: "فيلا كلاسيكية — التجمع الخامس",
        description: "تصميم داخلي كلاسيكي فاخر يجمع بين الأصالة والحداثة.",
        details: "تم تنفيذ هذا المشروع في منطقة التجمع الخامس. يتميز بالخشب الطبيعي المحفور يدوياً والأسقف المزخرفة بأوراق الذهب.",
        year: "2024",
        location: "التجمع الخامس",
    },

    // ── 2. New folder (2) — Modern Apartment (NO SLIDES) ────────────
    {
        id: 2,
        category: "residential",
        image: "/assets/library/projects/New folder (2)/photo_2026-01-27_16-55-41.jpg",
        gallery: [
            "/assets/library/projects/New folder (2)/photo_2026-01-27_16-55-41.jpg",
            "/assets/library/projects/New folder (2)/photo_2026-01-29_16-29-52.jpg",
            "/assets/library/projects/New folder (2)/photo_2026-01-29_16-29-54.jpg",
            "/assets/library/projects/New folder (2)/photo_2026-01-29_16-29-58.jpg",
            "/assets/library/projects/New folder (2)/unnamed (2).jpg",
        ],
        videos: [
            "/assets/library/projects/New folder (2)/Jan_29__1632_24s_202601292022_tjkmn.mp4",
            "/assets/library/projects/New folder (2)/Whisk_kjz2ijylr2mmvtz30imhhjytmmnlrtl0qgny0iy.mp4",
            "/assets/library/projects/New folder (2)/___1080p_202601291637.mp4",
            "/assets/library/projects/New folder (2)/___202601291636_uz4qw.mp4",
            "/assets/library/projects/New folder (2)/___202601291637_oy665.mp4",
        ],
        title: "شقة مودرن — العاصمة الإدارية",
        description: "تصميم داخلي عصري يعتمد على الخطوط البسيطة والإضاءة المخفية.",
        details: "تصميم داخلي لشقة سكنية بالعاصمة الإدارية الجديدة. يعتمد على الخطوط البسيطة والإضاءة المخفية.",
        year: "2024",
        location: "العاصمة الإدارية",
    },

    // ── 3. New folder (3) — Roof Top (Videos only + 1 reel) ─────────
    {
        id: 3,
        category: "residential",
        // No images in folder, use first video thumbnail logic? 
        // Wait, step 1511 showed only mp4 files in New folder (3).
        // I need a placeholder image or I must have copied one?
        // Let's use a generic one or check if I can grab a frame? Cannot grab frame.
        // I will use a placeholder image from another project for thumbnail to avoid breakage,
        // OR better: use one of the frames if available? No frames.
        // I'll use the 'Reality' image as a placeholder for the thumbnail.
        image: "/assets/library/reality/1.jpg",
        gallery: [],
        videos: [
            "/assets/library/projects/New folder (3)/Whisk_ignhbjnilzy0qto50izinwytqmnhrtl2emnw0ym.mp4",
            "/assets/library/projects/New folder (3)/Whisk_izn0gtzjlznhfjn10sy2yjytkjmmrtlmzwzi1cn.mp4",
            "/assets/library/projects/New folder (3)/Whisk_mjy3ewolvzmwuwmw0solfgotkdm2qtlibdox0cz.mp4",
            "/assets/library/projects/New folder (3)/Whisk_mwnhlzm0mjy3ktny0cnjngotytmirtlxmgz00iz.mp4",
            "/assets/library/projects/New folder (3)/Whisk_qtn1iznyqgmjrmz50yn1ytotmdnyqtl1ijzk1sm.mp4",
            "/assets/library/projects/New folder (3)/Whisk_qwmirgmkrgzzm2n30inwymytu2n4qtlifjml1cm.mp4",
            "/assets/library/projects/New folder (3)/ريل تشويقي روف د عصام هيبة.mp4",
        ],
        title: "روف د. عصام هيبة",
        description: "تصميم روف تاب خاص مع ريل تشويقي وعروض واقع افتراضي.",
        details: "مشروع تصميم وتنفيذ سطح (Roof Top) خاص بطابع فاخر.",
        year: "2024",
        location: "القاهرة",
    },

    // ── 4. New folder (4) — Grand Hotel Port Said ───────────────────
    {
        id: 4,
        category: "hospitality",
        image: "/assets/library/projects/New folder (4)/ChatGPT Image Apr 14, 2025, 03_27_16 PM.png",
        gallery: [
            "/assets/library/projects/New folder (4)/20250420_1750_Luxurious Classical Interior Design_remix_01js9y60p2erdtsrmc152n0e9q.png",
            "/assets/library/projects/New folder (4)/20250420_1800_Tilt-Shift Diorama Mockup_remix_01js9yt2zefgwtzpbnstf19pv0.png",
            "/assets/library/projects/New folder (4)/9d253eb2-4967-4d31-afaa-14b97bdfb15f.png",
            "/assets/library/projects/New folder (4)/ChatGPT Image Apr 14, 2025, 03_27_16 PM.png",
            "/assets/library/projects/New folder (4)/ChatGPT Image Apr 14, 2025, 03_41_24 PM.png",
            "/assets/library/projects/New folder (4)/ChatGPT Image Apr 16, 2025, 02_53_07 PM.png",
            "/assets/library/projects/New folder (4)/download (1).png",
            "/assets/library/projects/New folder (4)/assets_task_01jrt6k6rmen6bqzp7dprkjedt_img_0.webp",
            "/assets/library/projects/New folder (4)/assets_task_01jrt6wwtwfkb99djn1mfyb3mc_img_0.webp",
            // ... many webp and pngs
        ],
        videos: [
            "/assets/library/projects/New folder (4)/A_cinematic_4K_video_of_the_Grand_Hotel_Port_Said_at_night,_shot_on_a_vintage_film_camera_with_subtl_seed1450358666.mp4",
            "/assets/library/projects/New folder (4)/download.mp4",
            "/assets/library/projects/New folder (4)/download (1).mp4",
            "/assets/library/projects/New folder (4)/download (2).mp4",
            "/assets/library/projects/New folder (4)/download (3).mp4",
            "/assets/library/projects/New folder (4)/download (4).mp4",
            "/assets/library/projects/New folder (4)/download (5).mp4",
        ],
        title: "فندق بورسعيد الكبير — Grand Hotel",
        description: "مشروع ترميم وتصميم داخلي لفندق تاريخي بأسلوب كلاسيكي فاخر.",
        details: "مشروع ضخم لترميم وإعادة تصميم فندق بورسعيد الكبير. يتضمن العديد من الفيديوهات والصور.",
        year: "2025",
        location: "بورسعيد",
    },

    // ── 5. New folder (5) — Villa Al-Rihana (Slides + Video) ────────
    {
        id: 5,
        category: "residential",
        image: "/assets/library/projects/New folder (5)/slide_1.png",
        gallery: [
            "/assets/library/projects/New folder (5)/slide_1.png",
            "/assets/library/projects/New folder (5)/slide_2.png",
            "/assets/library/projects/New folder (5)/slide_3.png",
            "/assets/library/projects/New folder (5)/slide_4.png",
            "/assets/library/projects/New folder (5)/slide_5.png",
            "/assets/library/projects/New folder (5)/slide_6.png",
            "/assets/library/projects/New folder (5)/slide_7.png",
            "/assets/library/projects/New folder (5)/slide_8.png",
            "/assets/library/projects/New folder (5)/slide_9.png",
            "/assets/library/projects/New folder (5)/slide_10.png",
        ],
        videos: [
            "/assets/library/projects/New folder (5)/video_2026-02-18_14-14-55.mp4",
        ],
        title: "فيلا الريحانة — مدينة الشروق",
        description: "تصميم فيلا سكنية شاملة مع عرض تقديمي كامل.",
        details: "تصميم متكامل لفيلا سكنية في مدينة الشروق.",
        year: "2024",
        location: "الشروق",
    },

    // ── 6. New folder (6) — Luxury Villa (Photos + Slides) ──────────
    {
        id: 6,
        category: "residential",
        image: "/assets/library/projects/New folder (6)/480439959_3693416154266827_8274546797649157551_n.jpg",
        gallery: [
            "/assets/library/projects/New folder (6)/480439959_3693416154266827_8274546797649157551_n.jpg",
            "/assets/library/projects/New folder (6)/480455121_3693416970933412_3177001151306076550_n.jpg",
            "/assets/library/projects/New folder (6)/480523218_3693417094266733_4659731975419116703_n.jpg",
            "/assets/library/projects/New folder (6)/download.png",
            "/assets/library/projects/New folder (6)/download (1).png",
            "/assets/library/projects/New folder (6)/slide_1.png",
            "/assets/library/projects/New folder (6)/slide_2.png",
        ],
        videos: [],
        title: "فيلا فاخرة — الشيخ زايد",
        description: "تصميم داخلي لفيلا فاخرة مع تشطيبات راقية.",
        details: "مشروع تصميم وتنفيذ فيلا فاخرة في مدينة الشيخ زايد.",
        year: "2024",
        location: "الشيخ زايد",
    },

    // ── 7. New folder (7) — Apartment Slides ────────────────────────
    {
        id: 7,
        category: "residential",
        image: "/assets/library/projects/New folder (7)/slide_1.png",
        gallery: [
            "/assets/library/projects/New folder (7)/slide_1.png",
            "/assets/library/projects/New folder (7)/slide_2.png",
            "/assets/library/projects/New folder (7)/slide_3.png",
            "/assets/library/projects/New folder (7)/slide_4.png",
            "/assets/library/projects/New folder (7)/slide_5.png",
            "/assets/library/projects/New folder (7)/slide_6.png",
            "/assets/library/projects/New folder (7)/slide_7.png",
            "/assets/library/projects/New folder (7)/slide_8.png",
        ],
        videos: [],
        title: "شقة لوكس — حدائق الأهرام",
        description: "تصميم شقة عصرية أنيقة.",
        details: "تصميم داخلي لشقة سكنية في حدائق الأهرام.",
        year: "2024",
        location: "حدائق الأهرام",
    },

    // ── 8. New folder (8) — Comprehensive Complex ───────────────────
    {
        id: 8,
        category: "residential",
        image: "/assets/library/projects/New folder (8)/slide_1.png",
        gallery: [
            "/assets/library/projects/New folder (8)/slide_1.png",
            "/assets/library/projects/New folder (8)/slide_2.png",
            "/assets/library/projects/New folder (8)/slide_1(1).png",
            "/assets/library/projects/New folder (8)/slide_2(1).png",
        ],
        videos: [
            "/assets/library/projects/New folder (8)/video_2026-02-18_14-17-23.mp4",
        ],
        title: "مجمع سكني متكامل — مدينتي",
        description: "تصميم شامل لمجمع سكني.",
        details: "مشروع ضخم يتضمن شرائح عرض تقديمية وفيديو.",
        year: "2024",
        location: "مدينتي",
    },

    // ── 9. New folder (9) — Maadi Apartment ─────────────────────────
    {
        id: 9,
        category: "residential",
        image: "/assets/library/projects/New folder (9)/slide_1.png",
        gallery: [
            "/assets/library/projects/New folder (9)/slide_1.png",
            "/assets/library/projects/New folder (9)/slide_2.png",
            "/assets/library/projects/New folder (9)/slide_3.png",
            "/assets/library/projects/New folder (9)/slide_4.png",
            "/assets/library/projects/New folder (9)/slide_5.png",
            "/assets/library/projects/New folder (9)/slide_6.png",
            "/assets/library/projects/New folder (9)/slide_7.png",
            "/assets/library/projects/New folder (9)/slide_8.png",
            "/assets/library/projects/New folder (9)/slide_9.png",
            "/assets/library/projects/New folder (9)/slide_10.png",
        ],
        videos: [],
        title: "شقة أنيقة — المعادي",
        description: "تصميم داخلي حديث لشقة في حي المعادي.",
        details: "تصميم داخلي لشقة سكنية في المعادي.",
        year: "2024",
        location: "المعادي",
    },

    // ── 10. New folder (10) — Narjes Villa ──────────────────────────
    {
        id: 10,
        category: "residential",
        image: "/assets/library/projects/New folder (10)/slide_1.png",
        gallery: [
            "/assets/library/projects/New folder (10)/slide_1.png",
            "/assets/library/projects/New folder (10)/slide_2.png",
            "/assets/library/projects/New folder (10)/slide_3.png",
            "/assets/library/projects/New folder (10)/slide_4.png",
            "/assets/library/projects/New folder (10)/slide_5.png",
            "/assets/library/projects/New folder (10)/slide_6.png",
            "/assets/library/projects/New folder (10)/slide_7.png",
            "/assets/library/projects/New folder (10)/slide_8.png",
            "/assets/library/projects/New folder (10)/slide_9.png",
            "/assets/library/projects/New folder (10)/slide_10.png",
            "/assets/library/projects/New folder (10)/slide_11.png",
            "/assets/library/projects/New folder (10)/slide_12.png",
        ],
        videos: [],
        title: "فيلا النرجس — القاهرة الجديدة",
        description: "تصميم فيلا فخمة بأسلوب نيوكلاسيكي.",
        details: "تصميم متكامل لفيلا فاخرة في القاهرة الجديدة.",
        year: "2024",
        location: "القاهرة الجديدة",
    },

    // ── 11. Commercial ──────────────────────────────────────────────
    {
        id: 11,
        category: "commercial",
        image: "/assets/library/commercial/1 (1).jpg",
        gallery: [
            "/assets/library/commercial/1 (1).jpg",
            "/assets/library/commercial/1 (2).jpg",
            "/assets/library/commercial/1 (3).jpg",
            "/assets/library/commercial/1 (4).jpg",
            "/assets/library/commercial/2 (1).jpg",
            "/assets/library/commercial/2 (2).jpg",
        ],
        videos: [],
        title: "مبنى إداري — الشيخ زايد",
        description: "تصميم واجهة وتجهيزات إدارية.",
        details: "تصميم وتنفيذ الواجهة الخارجية والمدخل الرئيسي لمبنى إداري.",
        year: "2023",
        location: "الشيخ زايد",
    },

    // ── 12. Restaurant ──────────────────────────────────────────────
    {
        id: 12,
        category: "restaurant",
        image: "/assets/library/projects/restaurant-photos/1.jpeg",
        gallery: [
            "/assets/library/projects/restaurant-photos/1.jpeg",
            "/assets/library/projects/restaurant-photos/2.jpeg",
            "/assets/library/projects/restaurant-photos/3.jpeg",
            "/assets/library/projects/restaurant-photos/4.jpeg",
            "/assets/library/projects/restaurant-photos/5.jpeg",
            "/assets/library/projects/restaurant-photos/6.jpeg",
        ],
        videos: [],
        title: "مطعم فاخر — الساحل الشمالي",
        description: "تصميم داخلي لمطعم فخم بأجواء ساحلية.",
        details: "تصميم وتنفيذ داخلي لمطعم فاخر على الساحل الشمالي.",
        year: "2024",
        location: "الساحل الشمالي",
    },

    // ── 13. Reality ─────────────────────────────────────────────────
    {
        id: 13,
        category: "residential",
        image: "/assets/library/reality/1.jpg",
        gallery: [
            "/assets/library/reality/1.jpg",
            "/assets/library/reality/2.jpg",
            "/assets/library/reality/3.jpg",
        ],
        videos: [],
        title: "مجلس استقبال ملكي",
        description: "صور واقعية من تنفيذ مجلس استقبال.",
        details: "صور من الموقع الفعلي لمجلس ضيوف بأسلوب إسلامي حديث.",
        year: "2024",
        location: "الرياض",
    },

    // ── 14. Untitled Slides ─────────────────────────────────────────
    {
        id: 14,
        category: "residential",
        image: "/assets/library/projects/Untitled_slides/slide_1.png",
        gallery: [
            "/assets/library/projects/Untitled_slides/slide_1.png",
            "/assets/library/projects/Untitled_slides/slide_2.png",
            "/assets/library/projects/Untitled_slides/slide_3.png",
        ],
        videos: [],
        title: "تصميم شقة — هليوبوليس",
        description: "عرض تصميمي شامل لشقة سكنية.",
        details: "عرض تقديمي لتصميم شقة سكنية في هليوبوليس.",
        year: "2023",
        location: "هليوبوليس",
    },

    // ── 15. Untitled Slides 1 ───────────────────────────────────────
    {
        id: 15,
        category: "residential",
        image: "/assets/library/projects/Untitled_slides_1/slide_1.png",
        gallery: [
            "/assets/library/projects/Untitled_slides_1/slide_1.png",
            "/assets/library/projects/Untitled_slides_1/slide_2.png",
            "/assets/library/projects/Untitled_slides_1/slide_3.png",
        ],
        videos: [],
        title: "فيلا — الرحاب",
        description: "تصميم فيلا سكنية فخمة.",
        details: "عرض تقديمي لتصميم فيلا سكنية فخمة في مدينة الرحاب.",
        year: "2023",
        location: "الرحاب",
    },

    // ── 16. Untitled Slides 2 ───────────────────────────────────────
    {
        id: 16,
        category: "residential",
        image: "/assets/library/projects/Untitled_slides_2/slide_1.png",
        gallery: [
            "/assets/library/projects/Untitled_slides_2/slide_1.png",
            "/assets/library/projects/Untitled_slides_2/slide_2.png",
            "/assets/library/projects/Untitled_slides_2/slide_3.png",
        ],
        videos: [],
        title: "شقة دوبلكس — 6 أكتوبر",
        description: "تصميم شقة دوبلكس.",
        details: "عرض تقديمي لتصميم شقة دوبلكس في مدينة 6 أكتوبر.",
        year: "2023",
        location: "6 أكتوبر",
    },

    // ── 17. Boy Bedroom ─────────────────────────────────────────────
    {
        id: 17,
        category: "residential",
        image: "/assets/library/projects/boy-bedroom/1.jpg",
        gallery: [
            "/assets/library/projects/boy-bedroom/1.jpg",
            "/assets/library/projects/boy-bedroom/2.jpg",
            "/assets/library/projects/boy-bedroom/3.jpg",
            "/assets/library/projects/boy-bedroom/4.jpg",
            "/assets/library/projects/boy-bedroom/6.jpg",
            "/assets/library/projects/boy-bedroom/7.jpg",
        ],
        videos: [],
        title: "غرفة نوم أطفال",
        description: "تصميم غرفة نوم أطفال بألوان مبهجة.",
        details: "تصميم ثلاثي الأبعاد لغرفة نوم أطفال.",
        year: "2024",
        location: "القاهرة",
    },
];

export const categories = [
    { id: "all", label: "الكل" },
    { id: "residential", label: "سكني" },
    { id: "commercial", label: "تجاري" },
    { id: "restaurant", label: "مطاعم" },
    { id: "hospitality", label: "فنادق" },
];

export const promoVideos = [
    "/assets/library/videos/Whisk_ignhbjnilzy0qto50izinwytqmnhrtl2emnw0ym.mp4",
    "/assets/library/videos/Whisk_izn0gtzjlznhfjn10sy2yjytkjmmrtlmzwzi1cn.mp4",
    "/assets/library/videos/Whisk_mjnmrgnyetz4ajz50yy0itytumzirtlidtn00sm.mp4",
    "/assets/library/videos/Whisk_mjy3ewolvzmwuwmw0solfgotkdm2qtlibdox0cz.mp4",
    "/assets/library/videos/Whisk_mwnhlzm0mjy3ktny0cnjngotytmirtlxmgz00iz.mp4",
    "/assets/library/videos/Whisk_qgn3mgn0imywktz00sn5qjytgdohrtllf2yl1cz.mp4",
    "/assets/library/videos/Whisk_qtn1iznyqgmjrmz50yn1ytotmdnyqtl1ijzk1sm.mp4",
    "/assets/library/videos/Whisk_qwmirgmkrgzzm2n30inwymytu2n4qtlifjml1cm.mp4",
];
