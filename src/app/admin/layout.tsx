"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, LogOut } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { name: "Projects", href: "/admin", icon: LayoutDashboard },
        { name: "Content (CMS)", href: "/admin/content", icon: FileText },
    ];

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-black-rich flex">
            {/* Sidebar */}
            <aside className="w-64 bg-charcoal border-r border-gold/10 hidden md:flex flex-col">
                <div className="p-8 border-b border-gold/10">
                    <h1 className="text-2xl font-serif text-gold">ART DECOR <span className="text-xs text-gray-500 block font-sans mt-1">Admin Panel</span></h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-gold text-black-rich font-bold"
                                        : "text-gray-400 hover:text-gold hover:bg-white/5"
                                    }`}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gold/10">
                    <button className="flex items-center space-x-3 text-red-400 hover:text-red-300 px-4 py-3 w-full transition-colors">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
