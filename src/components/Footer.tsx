"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function Footer() {
    return (
        <footer className="bg-white text-black-rich py-16 border-t border-gray-100">
            <FadeIn className="container mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-serif font-bold tracking-tighter">
                            ART DECOR
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Creating timeless interiors that reflect your unique style and personality.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-serif text-lg mb-6">Explore</h4>
                        <ul className="space-y-3 text-gray-600 text-sm">
                            <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
                            <li><Link href="/portfolio" className="hover:text-black transition-colors">Portfolio</Link></li>
                            <li><Link href="/services" className="hover:text-black transition-colors">Services</Link></li>
                            <li><Link href="/about" className="hover:text-black transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-serif text-lg mb-6">Contact</h4>
                        <ul className="space-y-3 text-gray-600 text-sm">
                            <li>123 Design Avenue, Creative City</li>
                            <li>New Cairo, Egypt</li>
                            <li>+20 100 123 4567</li>
                            <li>hello@artdecor.com</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-serif text-lg mb-6">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Art Decor. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-black">Terms of Service</Link>
                    </div>
                </div>
            </FadeIn>
        </footer>
    );
}
