
import FadeIn from "@/components/FadeIn";
import { Paintbrush, Ruler, Sofa, HardHat, Lightbulb, ChefHat } from "lucide-react";

export default function Services() {
    const services = [
        {
            icon: Paintbrush,
            title: "Interior Design",
            description: "Conceptualizing and crafting bespoke interiors that reflect your personality and lifestyle."
        },
        {
            icon: Ruler,
            title: "Architectural Planning",
            description: "Detailed spatial planning and blueprints to optimize every inch of your property."
        },
        {
            icon: Sofa,
            title: "Furniture Selection",
            description: "Curating luxury furniture pieces that blend comfort with sophisticated aesthetics."
        },
        {
            icon: HardHat,
            title: "Project Management",
            description: "End-to-end supervision of the execution process to ensure quality and timeliness."
        },
        {
            icon: Lightbulb,
            title: "Lighting Design",
            description: "Strategic lighting solutions to enhance mood, ambiance, and functionality."
        },
        {
            icon: ChefHat,
            title: "Restaurant Fit-outs",
            description: "Specialized design and execution for high-end dining establishments."
        }
    ];

    return (
        <div className="min-h-screen bg-white py-24 px-6 md:px-12">
            <div className="container mx-auto max-w-7xl">
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
                                className="group p-8 bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 text-left hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 flex items-center justify-center mb-6 text-black-rich group-hover:text-gold transition-colors duration-300">
                                    <div className="transform transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
                                        <Icon size={32} strokeWidth={1.5} />
                                    </div>
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
        </div>
    );
}
