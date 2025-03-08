/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

function RelatedIndustriesSection() {
    const [expandedIndustry, setExpandedIndustry] = useState<string | null>("semiconductor");

    const industries = [
        {
            id: "semiconductor",
            name: "半導體 產業",
            companies: [
                { name: "ASE GROUP 日月光集團", logo: "/images/companies/ase.png" },
                { name: "FUJIFILM 台灣富士電子材料股份有限公司", logo: "/images/companies/fujifilm.png" },
                { name: "PSA 華新科技", logo: "/images/companies/psa.png" },
                { name: "MTC 美亞半導體設備股份有限公司", logo: "/images/companies/mtc.png" },
                { name: "NANMAT 南茂科技", logo: "/images/companies/nanmat.png" },
                { name: "TANAKA 台灣田中金屬礦業股份有限公司", logo: "/images/companies/tanaka.png" },
                { name: "WISN", logo: "/images/companies/wisn.png" },
                { name: "ChipMOS 南茂科技", logo: "/images/companies/chipmos.png" },
                { name: "NXP", logo: "/images/companies/nxp.png" },
            ]
        },
        { id: "biotech", name: "生技化學 產業", companies: [] },
        { id: "electronics", name: "電子零組件 產業", companies: [] },
        { id: "optoelectronics", name: "光電 產業", companies: [] },
        { id: "othertech", name: "其他科技 產業", companies: [] },
    ];

    const toggleIndustry = (industryId: string) => {
        if (expandedIndustry === industryId) {
            setExpandedIndustry(null);
        } else {
            setExpandedIndustry(industryId);
        }
    };

    return (
        <section className="relative bg-white md:bg-[url('/images/engineer-control-panel.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="container mx-auto max-w-[958px]">


                <div className="flex flex-col md:flex-row justify-end">
                    {/* Right side with collapsible industry sections */}
                    <div className="md:w-4/5 w-full md:bg-[url('/images/about-bottom-section-right-card-bg.svg')] bg-cover bg-left bg-center bg-no-repeat">
                        <div className="space-y-4 pl-[40px] md:pl-[100px] pr-[40px] py-[70px]">
                            <div className="text-center mb-12 md:hidden">
                                <h2 className="text-4xl font-bold mb-2">工程實績</h2>
                            </div>
                            {industries.map((industry) => (
                                <div key={industry.id} className="border-b border-gray-200">
                                    <button
                                        className="w-full py-4 px-2 flex justify-between items-center text-left"
                                        onClick={() => toggleIndustry(industry.id)}
                                    >
                                        <h3 className="text-xl font-medium">{industry.name}</h3>
                                        <svg
                                            className={`w-6 h-6 transform transition-transform ${expandedIndustry === industry.id ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {expandedIndustry === industry.id && industry.companies.length > 0 && (
                                        <div className="py-4 grid grid-cols-3 gap-4">
                                            {industry.companies.map((company, idx) => (
                                                <div key={idx} className="flex flex-col items-center">
                                                    <img
                                                        src={company.logo}
                                                        alt={company.name}
                                                        className="h-12 object-contain"
                                                    />
                                                    <span className="text-xs text-center mt-2">{company.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RelatedIndustriesSection;