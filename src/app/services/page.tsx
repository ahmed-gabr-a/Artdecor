import { Paintbrush, Home, Building2, Sofa, TreePine, HardHat } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const services = [
    {
        icon: Home,
        title: "Residential Design",
        description: "Tailored interiors for homes that blend comfort with sophisticated style.",
    },
    {
        icon: Building2,
        title: "Commercial Spaces",
        description: "Innovative designs for offices and retail that enhance brand identity and productivity.",
    },
    {
        icon: HardHat,
        title: "Fit-out & Execution",
        description: "Turnkey solutions ensuring quality craftsmanship from concept to handover.",
    },
    {
        icon: Sofa,
        title: "Custom Furniture",
        description: "Bespoke furniture pieces designed specifically for your space and needs.",
    },
    {
        icon: Paintbrush,
        title: "Design Consultation",
        description: "Expert advice on color palettes, layouts, and styling to refine your vision.",
    },
    {
        icon: TreePine,
        title: "Landscape Design",
        description: "Harmonizing indoor and outdoor living with thoughtful landscape architecture.",
    },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-creme text-black-rich py-24 px-6 md:px-12">
            <div className="container mx-auto max-w-6xl">
                <FadeIn>
                    <h1 className="text-5xl md:text-7xl font-serif text-center mb-6">Our Services</h1>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-20 text-lg font-light">
                        Comprehensive design solutions tailored to elevate your living and working environments.
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <FadeIn
                                key={index}
                                delay={index * 0.1}
                                className="group p-8 bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 text-left"
                            >
                                <div className="w-12 h-12 flex items-center justify-center mb-6 text-black-rich group-hover:text-gold transition-colors">
                                    <Icon size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-serif mb-4 group-hover:text-gold transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed font-light text-sm">
                                    {service.description}
                                </p>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
