'use client'
import Link from "next/link";

const navLinks = [
    { href: "/", label: "首頁" },
    { href: "/services", label: "服務項目" },
    { href: "/solutions", label: "解決方案" },
    { href: "/projects", label: "工程實績" },
    { href: "/news", label: "最新消息" },
    { href: "/esg", label: "ESG" },
    { href: "/careers", label: "人才專區" },
    { href: "/contact", label: "聯絡我們" },
];

const Nav = () => {
    return (
        <nav className="flex gap-4 p-4 bg-gray-100 text-gray-800">
            {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="hover:underline">
                    {link.label}
                </Link>
            ))}
        </nav>
    );
};

export default Nav