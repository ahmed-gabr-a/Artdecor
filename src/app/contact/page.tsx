
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "./contact-form"; // We'll extract the form to a client component
import { getContent } from "@/lib/content";
import FadeIn from "@/components/FadeIn";

export default async function ContactPage() {
    const content = await getContent();

    return (
        <main className="min-h-screen bg-creme text-black-rich py-24 px-6 md:px-12">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <FadeIn direction="right" className="space-y-6 text-left">
                            <h1 className="text-5xl md:text-7xl font-serif leading-tight">
                                Get in <br /> Touch.
                            </h1>
                            <p className="text-lg text-gray-600 font-light max-w-md">
                                Have a project in mind? We'd love to hear from you. Let's discuss how we can bring your vision to life.
                            </p>
                        </FadeIn>

                        <div className="space-y-8 text-left">
                            <FadeIn delay={0.2} className="flex items-start space-x-6">
                                <Mail className="w-6 h-6 mt-1 text-gold-dark" />
                                <div>
                                    <h3 className="font-serif text-xl mb-1">Email</h3>
                                    <p className="text-gray-600">{content.contact_email || "hello@artdecor.com"}</p>
                                </div>
                            </FadeIn>
                            <FadeIn delay={0.3} className="flex items-start space-x-6">
                                <Phone className="w-6 h-6 mt-1 text-gold-dark" />
                                <div>
                                    <h3 className="font-serif text-xl mb-1">Phone</h3>
                                    <p className="text-gray-600">{content.contact_phone || "+20 100 123 4567"}</p>
                                </div>
                            </FadeIn>
                            <FadeIn delay={0.4} className="flex items-start space-x-6">
                                <MapPin className="w-6 h-6 mt-1 text-gold-dark" />
                                <div>
                                    <h3 className="font-serif text-xl mb-1">Studio</h3>
                                    <p className="text-gray-600">{content.contact_address || "123 Design Avenue, New Cairo, Egypt"}</p>
                                </div>
                            </FadeIn>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <FadeIn direction="left" className="bg-white p-8 md:p-12 shadow-sm border border-gray-100">
                        <ContactForm />
                    </FadeIn>
                </div>
            </div>
        </main>
    );
}
