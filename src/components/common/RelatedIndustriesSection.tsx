/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import RwdComponent from "./RwdComponent";

function RelatedIndustriesSection() {
    const [expandedIndustry, setExpandedIndustry] = useState<string | null>("semiconductor");

    const industries: { id: string, name: string, companies: { name: string, logo: string }[] }[] = [
        {
            id: "semiconductor",
            name: "半導體 產業",
            companies: [
                { name: "ASE GROUP 日月光集團", logo: "/images/companies/semiconductor/ase.png" },
                { name: "FUJIFILM 台灣富士電子材料股份有限公司", logo: "/images/companies/semiconductor/fujifilm.png" },
                { name: "PSA 華新科技", logo: "/images/companies/semiconductor/psa.png" },
                { name: "NANMAT 南茂科技", logo: "/images/companies/semiconductor/nanmat.jpg" },
                { name: "TANAKA 台灣田中金屬礦業股份有限公司", logo: "/images/companies/semiconductor/tanaka.jpg" },
                { name: "MIC", logo: "/images/companies/semiconductor/mic.png" },
                { name: "NXP", logo: "/images/companies/semiconductor/nxp.jpg" },
            ]
        },
        {
            id: "biotech",
            name: "生技化學 產業",
            companies: [
                { name: "長興材料", logo: "/images/companies/biotech/eternal.jpg" },
                { name: "勝一化工", logo: "/images/companies/biotech/shiny_chemical.jpg" },
                { name: "潤勝化學", logo: "/images/companies/biotech/eshine.jpg" },
                { name: "醫強科技", logo: "/images/companies/biotech/estrong.png" },
                { name: "藥華製藥", logo: "/images/companies/biotech/pharma_essentia.png" },
            ]
        },
        {
            id: "electronics",
            name: "電子零組件 產業",
            companies: [
                { name: "台虹科技", logo: "/images/companies/electronics/taiflex.png" },
                { name: "新揚科技", logo: "/images/companies/electronics/xinyang.webp" },
            ]
        },
        {
            id: "optoelectronics",
            name: "光電 產業",
            companies: [
                { name: "元晶太陽能", logo: "/images/companies/optoelectronics/tsec.png" },
                { name: "台灣日東", logo: "/images/companies/optoelectronics/taiwan_nitto.png" },
                { name: "光寶科技", logo: "/images/companies/optoelectronics/liteon.jpg" },
                { name: "住華科技股份有限公司", logo: "/images/companies/optoelectronics/sumika.jpg" },
                { name: "愷威電子", logo: "/images/companies/optoelectronics/kway.jpg" },
                { name: "瀚宇彩晶", logo: "/images/companies/optoelectronics/hannstar.jpg" },
            ]
        },
        {
            id: "othertech", name: "其他科技 產業", companies: [
                { name: "動力安全", logo: "/images/companies/othertech/dynasafe.jpg" },
            ]
        },
    ];

    const toggleIndustry = (industryId: string) => {
        if (expandedIndustry === industryId) {
            setExpandedIndustry(null);
        } else {
            setExpandedIndustry(industryId);
        }
    };

    return (
        <section className="relative bg-white bg-cover bg-center bg-no-repeat">
            <div className="relative container mx-auto max-w-[958px] flex justify-end">
                <RwdComponent
                    desktopComponent={
                        <div className="absolute z-1 top-0 left-0 h-full w-[42%] -mr-[70px]">
                            <img src="/images/companies/engineer-control-panel.jpg" alt="engineer-control-panel" className="w-full h-full object-cover" />
                        </div>
                    }
                    mobileComponent={<></>}
                    mobileClassName="w-0"
                />


                <div className="relative z-10 flex flex-col md:flex-row justify-end md:w-2/3 w-full">
                    {/* Right side with collapsible industry sections */}
                    <div className="w-full md:bg-[url('/images/about-bottom-section-right-card-bg.svg')] bg-cover bg-left bg-center bg-no-repeat">
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
                                        <div className="py-4 flex flex-wrap gap-4">
                                            {industry.companies.map((company, idx) => (
                                                <div key={idx} className="flex flex-col items-center">
                                                    <img
                                                        src={company.logo}
                                                        alt={company.name}
                                                        className="h-12 object-contain"
                                                    />
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