
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
    {
        title: "فيلا خاصة",
        description: "تصميم كلاسيكي فاخر يجمع بين الأصالة والحداثة.",
        details: "تم تنفيذ هذا المشروع في منطقة التجمع الخامس، ويتميز باستخدام الخشب الطبيعي المحفور يدوياً (Boiserie) والأسقف المزخرفة بأوراق الذهب.",
        category: "residential",
        image: "/assets/images/projects/residential-1.jpg",
        year: "2024",
        location: "القاهرة الجديدة"
    },
    {
        title: "شقة مودرن",
        description: "لمسات عصرية دافئة",
        details: "تصميم داخلي لشقة سكنية تعتمد على الخطوط البسيطة والإضاءة المخفية لخلق جو من الهدوء والراحة.",
        category: "residential",
        image: "/assets/images/projects/residential-2.jpg",
        year: "2023",
        location: "العاصمة الإدارية"
    },
    {
        title: "مبنى إداري",
        description: "تصميم واجهة وتجهيزات",
        details: "تصميم وتنفيذ الواجهة الخارجية والمدخل الرئيسي لمبنى إداري، مع التركيز على الهويا البصرية للشركات.",
        category: "commercial",
        image: "/assets/images/projects/commercial-1.jpg",
        year: "2023",
        location: "الشيخ زايد"
    },
    {
        title: "مجلس استقبال",
        description: "فخامة التراث",
        details: "تصميم مجلس ضيوف بأسلوب إسلامي حديث، مع استخدام الرخام والزخارف الجبسية.",
        category: "residential",
        image: "/assets/images/projects/residential-3.jpg",
        year: "2024",
        location: "الرياض"
    },
    {
        title: "مول تجاري",
        description: "تصميم داخلي وخارجي",
        details: "تخطيط وتصميم المساحات التجارية والممرات في مول تجاري لضمان تجربة تسوق مريحة.",
        category: "commercial",
        image: "/assets/images/projects/commercial-2.jpg",
        year: "2022",
        location: "الإسكندرية"
    },
    {
        title: "مطعم فاخر",
        description: "أجواء تعزز الشهية",
        details: "تصميم داخلي لمطعم يقدم تجربة طعام فاخرة، مع توزيع إضاءة مدروس واختيار أثاث مريح.",
        category: "restaurant",
        image: "/assets/images/projects/restaurant-1.jpg",
        year: "2023",
        location: "الساحل الشمالي"
    },
    {
        title: "غرفة نوم أطفال مودرن",
        description: "تصميم عصري وألوان هادئة",
        details: "تصميم غرفة نوم أطفال يراعي المساحة والحركة، مع استخدام ألوان مريحة للعين.",
        category: "residential",
        image: "/assets/images/projects/kids-bedroom-1.jpg",
        year: "2024",
        location: "القاهرة"
    },
    {
        title: "جراند هوتيل بورسعيد",
        description: "إعادة إحياء التراث",
        details: "تجديد وتطوير فندق جراند هوتيل التاريخي ببورسعيد، مع الحفاظ على الطابع المعماري الكلاسيكي.",
        category: "commercial",
        image: "/assets/images/projects/grand-hotel.png",
        year: "2025",
        location: "بورسعيد"
    },
    {
        title: "شقة سكنية فاخرة",
        description: "تشطيبات هاي لوكس",
        details: "تصميم وتنفيذ شقة سكنية بأعلى معايير الجودة، مع استخدام الرخام والأخشاب الطبيعية.",
        category: "residential",
        image: "/assets/images/projects/luxury-apartment-1.png",
        year: "2024",
        location: "الشيخ زايد"
    },
    {
        title: "فيلا كلاسيكية",
        description: "فخامة القصور",
        details: "تصميم داخلي لفيلا بأسلوب كلاسيكي غني بالتفاصيل والزخارف الذهبية.",
        category: "residential",
        image: "/assets/images/projects/classic-villa-1.png",
        year: "2023",
        location: "التجمع الخامس"
    },
    {
        title: "مطعم وكافيه",
        description: "تجربة ضيافة مميزة",
        details: "تصميم مطعم وكافيه يجمع بين الراحة والأناقة، مناسب للعائلات والأصدقاء.",
        category: "restaurant",
        image: "/assets/images/projects/fine-dining-1.jpg",
        year: "2024",
        location: "المعادي"
    }
];

const contentBlocks = [
    // Home Page
    { key: "home_hero_title", value: "ART DECOR", section: "home", label: "Hero Title", type: "text" },
    { key: "home_hero_subtitle", value: "Elevating Spaces. Inspiring Lives.", section: "home", label: "Hero Subtitle", type: "text" },
    { key: "home_intro_title", value: "Design Beyond Boundaries.", section: "home", label: "Intro Title", type: "text" },
    { key: "home_intro_text", value: "Step into a world where imagination meets precision. We transform spaces into breathtaking works of art that reflect your unique vision.", section: "home", label: "Intro Text", type: "textarea" },

    // About Page
    { key: "about_title", value: "Crafting Legacy.", section: "about", label: "Main Title", type: "text" },
    { key: "about_text", value: "Founded on the principles of timeless elegance and functional luxury, Art Decor has been transforming spaces for over a decade. We believe that every interior should tell a unique story—yours.", section: "about", label: "Main Description", type: "textarea" },

    // Contact Page
    { key: "contact_email", value: "hello@artdecor.com", section: "contact", label: "Email Address", type: "text" },
    { key: "contact_phone", value: "+20 100 123 4567", section: "contact", label: "Phone Number", type: "text" },
    { key: "contact_address", value: "123 Design Avenue, New Cairo, Egypt", section: "contact", label: "Address", type: "text" }
];

async function main() {
    console.log(`Start seeding ...`);
    for (const project of projects) {
        const p = await prisma.project.create({
            data: project,
        });
    }

    console.log(`Seeding Content Blocks...`);
    for (const block of contentBlocks) {
        await prisma.contentBlock.upsert({
            where: { key: block.key },
            update: {},
            create: block,
        });
    }
    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
