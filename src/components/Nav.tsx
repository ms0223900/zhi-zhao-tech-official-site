/* eslint-disable @next/next/no-img-element */
'use client'

import Link from "next/link";
import { useState } from "react";
import routerConfig from "./routerConfig";

const navLinks = [
    routerConfig.about,
    routerConfig.solutions,
    routerConfig.projects,
    routerConfig.news,
    routerConfig.esg,
    routerConfig.careers,
    routerConfig.contact,
    routerConfig.downloads,
];

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="relative bg-white shadow">
            {/* Desktop Navigation */}
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo 區域 */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold">
                            <img src="/images/zhi-zhao-logo.svg" alt="智兆科技" className="w-[110px] h-24" />
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-gray-900 hover:underline"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* 漢堡選單按鈕 */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/30 transition-opacity animate-fade-in"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drawer panel */}
                    <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl animate-slide-in-right">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Nav;