
import { getProjects } from "@/lib/supabase-data";
import PortfolioGallery from "@/components/PortfolioGallery";

export const revalidate = 0;

export default async function Portfolio() {
    const projects = await getProjects();

    const categories = [
        { id: "all", label: "All" },
        { id: "residential", label: "Residential" },
        { id: "commercial", label: "Commercial" },
        { id: "restaurant", label: "Restaurant" },
        { id: "hospitality", label: "Hospitality" },
    ];

    return <PortfolioGallery projects={projects} />;
}
