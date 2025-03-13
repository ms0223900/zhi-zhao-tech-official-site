'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface TabProps {
    label: string;
    href?: string;
    isActive?: boolean;
    onClick?: () => void;
}

function Tab({ label, href, isActive = false, onClick }: TabProps) {
    return (
        <div className="relative group shadow-lg md:min-w-[420px] w-[44%]">
            {/* Top border with hover effect */}
            <div className={`absolute top-2 left-2 w-0 h-0 border-4 border-transparent transform ${isActive ? 'opacity-100 w-[calc(100%-16px)] h-[calc(100%-16px)] border-t-orange-500 border-r-orange-500' : 'group-hover:opacity-100 group-hover:w-[calc(100%-16px)] group-hover:h-[calc(100%-16px)] group-hover:border-t-orange-500 group-hover:border-r-orange-500'} duration-500 ease-in-out`} style={{
                transition: "height 0.2s ease-out 0.2s, width 0.2s ease-out"
            }}></div>

            {/* Bottom border with hover effect */}
            <div className={`absolute bottom-2 left-2 w-0 h-0 border-4 border-transparent transform ${isActive ? 'opacity-100 w-[calc(100%-16px)] h-[calc(100%-16px)] border-b-orange-500 border-l-orange-500' : 'group-hover:opacity-100 group-hover:w-[calc(100%-16px)] group-hover:h-[calc(100%-16px)] group-hover:border-b-orange-500 group-hover:border-l-orange-500'} duration-500 ease-in-out`} style={{
                transition: "height 0.2s ease-out 0.2s, width 0.2s ease-out"
            }}></div>
            <div className='relative z-10'>

                {href ? (
                    <Link
                        href={href}
                        className={`block px-12 py-8 text-center transition-colors duration-300 ${isActive ? 'text-orange-500' : 'text-black hover:text-orange-500'
                            }`}
                        onClick={onClick}
                    >
                        <span className="text-xl font-medium">{label}</span>
                    </Link>
                ) : (
                    <button
                        className={`w-full px-12 py-8 text-center transition-colors duration-300 ${isActive ? 'text-orange-500' : 'text-black hover:text-orange-500'
                            }`}
                        onClick={onClick}
                    >
                        <span className="text-xl font-medium">{label}</span>
                    </button>
                )}

            </div>
        </div>
    );
}

interface SolutionTabsProps {
    tabs: { key: string; label: string; href?: string }[];
    activeTab?: string;
    onTabChange?: (label: string) => void;
}

export default function SolutionTabs({ tabs, activeTab, onTabChange }: SolutionTabsProps) {
    const [activeTabState, setActiveTabState] = useState(activeTab || tabs[0]?.label);

    // Update active tab based on hash in URL
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const matchingTab = tabs.find(tab => tab.href === hash);
                if (matchingTab) {
                    setActiveTabState(matchingTab.label);
                    if (onTabChange) {
                        onTabChange(matchingTab.label);
                    }
                }
            }
        };

        handleHashChange(); // Check on initial load
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [tabs, onTabChange]);

    const handleTabClick = (label: string) => {
        setActiveTabState(label);
        if (onTabChange) {
            onTabChange(label);
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-[48px]">
            {tabs.map((tab) => (
                <Tab
                    key={tab.label}
                    label={tab.label}
                    href={tab.href}
                    isActive={tab.label === (activeTab || activeTabState)}
                    onClick={() => handleTabClick(tab.key)}
                />
            ))}
        </div>
    );
} 