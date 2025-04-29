/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import RelatedIndustriesSection from "@/components/common/RelatedIndustriesSection";
import React from "react";
import Banner from "@/components/common/Banner";
import TitleWithEngSubtitle from "@/components/common/TitleWithEngSubtitle";
import { formatPageTitle } from "@/constants/metadata";

export const metadata: Metadata = {
    title: formatPageTitle("關於智兆"),
    description: "關於智兆科技的介紹，我們的使命、價值觀和服務項目",
};

export default function About() {
    return (
        <div className="min-h-screen">
            <BannerSection />
            <WelcomeSection />
            <CoreValuesSection />
            <CompanyAdvantagesSection />
            <React.Fragment>
                <div className="md:hidden">
                    <MobileCompanyHistorySection />
                </div>
                <div className="hidden md:block">
                    <CompanyHistorySection />
                </div>
            </React.Fragment>
            <ProfessionalLicensesSection />
            <EnergyManagementSolutionSection />
            <RelatedIndustriesSection />
        </div>
    );
}

function BannerSection() {
    const title = "關於智兆"
    const subtitle = "About Us"
    const imageSrc = "/images/about-us-banner.jpg"
    return (
        <Banner title={title} subtitle={subtitle} imageSrc={imageSrc} />
    )
}

function WelcomeSection() {
    return (
        <section className="theme-gradient-blue">
            <div className="container mx-auto px-8 max-w-[958px]">
                <div className="flex flex-col md:flex-row md:gap-[90px] items-stretch gap-12">
                    <div className="flex-1 py-[38px] md:pb-[38px] pb-[100px]">
                        <h2 className="text-3xl font-bold mb-6">歡迎來到智兆科技</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">智兆科技企業有限公司成立於2012年，專注於無塵室工程、空調工程、製程管路及系統工程的整體解決方案。我們致力於為半導體、光電、生技化學及其他高科技產業提供優質的工程服務，以滿足客戶對高規格、高效率、高安全性的需求。</p>
                    </div>
                    <div className="flex-1 relative md:block hidden">
                        <div className="absolute inset-0">
                            <img src="/images/welcome-person-right.png" alt="歡迎來到智兆科技" className="w-full h-full object-contain" />
                        </div>
                        <div className="absolute top-[20px] right-[180px] bg-white rounded-lg p-2">
                            <div className="text-[#2196F3] text-h1 text-center mb-2">500+</div>
                            <div className="text-gray-500 text-sm text-center">專業</div>
                        </div>
                        <div className="absolute w-[150px] top-[100px] right-[260px] bg-white rounded-lg p-2">
                            <div className="text-[#2196F3] text-h1 text-center">300+</div>
                            <div className="text-gray-500 text-sm text-center">熱忱</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CoreValuesSection() {
    const coreValues = [
        { icon: "/images/icons/icon-passion.svg", title: "熱忱" },
        { icon: "/images/icons/icon-professional.svg", title: "專業" },
        { icon: "/images/icons/icon-team.svg", title: "團隊" },
        { icon: "/images/icons/icon-honest.svg", title: "誠信" },
    ];

    return (
        <section className="px-4 py-4 md:mt-0 -mt-[70px]">
            <div className="container mx-auto max-w-[958px]">
                <div className="shadow-lg rounded-lg p-8 bg-white">

                    <div className="flex flex-wrap justify-center md:gap-8 gap-4 gap-x-8">
                        {coreValues.map((value, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="bg-gray-100 rounded-full p-6  flex items-center justify-center">
                                    {/* Placeholder for icon */}
                                    <img src={value.icon} alt={value.title} className="w-[50px] h-[50px]" />
                                </div>
                                <span className="text-xl font-medium pt-2">{value.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 rounded-lg border border-2 border-[#95DDFF] p-8 bg-gradient-to-br from-[#FFFFFF] to-[#95DDFF20]">
                    <h3 className="text-2xl text-[#2196F3] font-bold text-left mb-6">智兆科技四大核心價值</h3>
                    <p className="text-gray-600 leading-relaxed">
                        智兆科技以「熱誠、專業、團隊、誠信」為核心價值，結合豐富的技術實力和豐富的產業經驗，成功打造了多個高端項目，包括日月光半導體廠、勝一化工、恩智浦、台虹科技、光寶科技、醫強科技、南茂科技、住華科技及多家國內科技企業的工程建設。
                    </p>
                </div>
            </div>
        </section>
    );
}

function CompanyAdvantagesSection() {
    const advantages = [
        {
            title: "完整服務鏈",
            description: "涵蓋設計、施工、維護的全方服務",
            mobileDescription: "涵蓋設計、施工、維護的全方服務",
            image: "/images/about/advantage-service-chain.jpg",
            bgColor: "bg-[#E57B42]",
        },
        {
            title: "嚴謹施工管理",
            description: "ISO-45001認證，確保施工過程的品質與安全",
            mobileDescription: "ISO-45001認證\n確保施工過程的品質與安全",
            image: "/images/about/advantage-service-chain-02.jpg",
            bgColor: "bg-[#55BBF9]",
        },
        {
            title: "快速應變能力",
            description: "與多家本地協力廠商合作，實現即時應變與高效交付",
            mobileDescription: "與多家本地協力廠商合作\n實現即時應變與高效交付",
            image: "/images/about/advantage-service-chain-03.jpg",
            bgColor: "bg-[#EACA00]",
        },
        {
            title: "創新與永續發展",
            description: "不斷研發新技術、新工法，並積極推動節能減碳方案，踐行ESG理念",
            mobileDescription: "不斷研發新技術、新工法\n並積極推動節能減碳方案，踐行ESG理念",
            image: "/images/about/advantage-service-chain-04.jpg",
            bgColor: "bg-[#55BBF9]",
        },
    ];

    return (
        <section className="py-16 theme-gradient-blue">
            <div className="container mx-auto px-8 max-w-[958px]">
                <h2 className="text-center text-3xl font-bold mb-12">智兆科技優勢</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {advantages.map((item, index) => (
                        <React.Fragment key={index}>
                            <div className="md:hidden">
                                <MobileAdvantageCard
                                    title={item.title}
                                    description={item.mobileDescription}
                                    bgColor={item.bgColor}
                                />
                            </div>
                            <div className="hidden md:block">
                                <AdvantageCard
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    image={item.image}
                                    bgColor={item.bgColor}
                                />
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className="mt-12 text-center bg-white border border-[#95DDFF] shadow-xl p-6 rounded-lg">
                    <p className="text-gray-700 max-w-2xl mx-auto text-h4 leading-[200%]">
                        智兆科技堅信，透過專業的技術、細緻的管理與客戶至上的理念<br />
                        我們能為各產業提供最佳的系統工程解決方案<br />
                        成為業界的領導者與客戶的最佳夥伴
                    </p>
                </div>
            </div>
        </section>
    );
}

interface AdvantageCardProps {
    title: string;
    description: string;
    image: string;
    bgColor: string;
}

function AdvantageCard({ title, description, image }: AdvantageCardProps) {
    return (
        <div className="relative group overflow-hidden rounded-lg h-[300px]">
            <img
                src={image}
                alt={title}
                className="w-full h-[300px] object-cover absolute inset-0"
            />
            <div className="relative h-full flex flex-col justify-end">
                <div className="flex flex-col justify-end items-center gap-2 p-6 py-10 pb-6 bg-gradient-to-t from-black/90 via-black/80 to-transparent">
                    <h3 className="text-white text-h3 font-bold">{title}</h3>
                </div>
                <div>
                    <div className={`md:group-hover:mb-0 md:-mb-[100%] transition-all duration-300 ease-in-out bg-[#E57B42] h-full p-6`}>
                        <p className="text-sm text-white">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// mobile advantage card
function MobileAdvantageCard({ title, description, bgColor }: Omit<AdvantageCardProps, 'image'>) {
    return (
        <div className="relative h-full flex flex-col justify-center items-center gap-4">
            <div className={`${bgColor} p-1 px-4 rounded-full`}>
                <h3 className="text-white text-h3 font-bold">{title}</h3>
            </div>
            <p className="text-md text-center whitespace-pre-line">{description}</p>
        </div>
    );
}

const historyItems = [
    {
        year: "2012",
        color: "bg-[#55B9F2]",
        borderColor: "border-[#55B9F2]",
        dotColor: "bg-[#088DDE]",
        items: ["無塵室工程", "空調工程", "維修保養"]
    },
    {
        year: "2015",
        color: "bg-[#E9C81D]",
        borderColor: "border-[#E9C81D]",
        dotColor: "bg-[#857200]",
        items: ["低壓配電", "製程配管", "土木裝修"]
    },
    {
        year: "2017",
        color: "bg-[#E57B42]",
        borderColor: "border-[#E57B42]",
        dotColor: "bg-[#D75F1E]",
        items: ["防鏽塗裝", "氣體管路工程"]
    },
    {
        year: "2020",
        color: "bg-[#E9C81D]",
        borderColor: "border-[#E9C81D]",
        dotColor: "bg-[#857200]",
        items: ["室內設計", "純水工程", "環保工程"]
    },
    {
        year: "2024",
        color: "bg-[#55B9F2]",
        borderColor: "border-[#55B9F2]",
        dotColor: "bg-[#088DDE]",
        items: ["節能方案", "公司創櫃", "BIM系統"]
    }
];


function CompanyHistorySection() {
    return (
        <section className="py-[56px] pb-[260px] bg-white">
            <div className="container mx-auto px-8 max-w-[958px]">
                <TitleWithEngSubtitle title="企業沿革" subtitle="Enterprise History" />

                <div className="relative mt-20 w-[92%]">
                    {/* Timeline line */}
                    <div className="absolute left-0 right-0 h-1 bg-gray-200 top-[100%] w-[108%]"></div>

                    {/* Timeline items */}
                    <div className="relative flex justify-between">
                        {historyItems.map((item, index) => (
                            <div key={index} className={`relative flex flex-col items-start justify-end ${index % 2 === 0 ? '' : 'translate-y-[100%]'}`}>
                                {/* Circle */}
                                <div className={`
                                    ${item.color} rounded-full w-24 h-24 flex items-center justify-center 
                                    ${index % 2 === 0 ? 'translate-y-[10px]' : 'order-last -translate-y-[10px]'}
                                `}>
                                    <div className="text-black text-2xl">{item.year}</div>
                                    <div className={`absolute ${index % 2 === 0 ? 'bottom-2' : 'top-2'} w-3 h-3 rounded-full ${item.dotColor}`} />
                                    <div className={`absolute bg-transparent w-[116%] h-[116%] rounded-full border-[1px] ${item.borderColor}`} />
                                </div>

                                <div className={`
                                    relative ${index % 2 === 0 ? 'left-[47px] border-l-[1px]' : 'left-[47px] border-l-[1px]'} 
                                    border-[#A6A4A4] py-4 pl-8 flex flex-col items-start gap-1
                                `}>
                                    {item.items.map((text, idx) => (
                                        <div key={idx} className="text-gray-700">{text}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Arrow at the end */}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-gray-200"></div>
                </div>
            </div>
        </section>
    );
}

function MobileCompanyHistorySection() {
    const leftItems = historyItems.filter((item, index) => index % 2 === 0);
    const rightItems = historyItems.filter((item, index) => index % 2 === 1);

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-[958px]">
                <TitleWithEngSubtitle title="企業沿革" subtitle="Enterprise History" />
                <div className="h-1" />

                <div className="relative mt-8 px-8">
                    {/* 中央垂直線 */}
                    <div className="absolute left-[50%] -top-[40px] bottom-0 w-[1px] bg-gray-300 transform -translate-x-1/2"></div>

                    {/* 時間軸項目 */}
                    <div className="relative flex justify-between">
                        <div className="flex flex-col gap-12 w-[50%]">
                            {leftItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative ml-[36px]"
                                >
                                    {/* 年份圓圈 */}
                                    <div className={`
                                    absolute z-0 top-0 -left-[36px] transform -translate-y-1/2
                                    ${item.color} rounded-full w-[72px] h-[72px] flex items-center justify-center z-10
                                `}>
                                        <div className="-translate-y-4 text-black text-md">{item.year}</div>
                                        {/* circle background with offset circle */}
                                        <div className={`absolute bg-transparent w-[120%] h-[120%] rounded-full border-[1px] ${item.borderColor}`} />
                                    </div>

                                    {/* // top border  */}
                                    <div className="relative z-10 w-full h-[1px] z-0 top-0 transform -translate-y-1/2 bg-gray-300">
                                        <div className={`absolute left-0 -translate-x-1/2 
                                        top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${item.dotColor}`}
                                        />
                                    </div>
                                    <div className="h-8" />
                                    {/* 內容區塊 */}
                                    <div className="relative z-10 flex flex-col items-end w-full pr-4">
                                        {item.items.map((text, idx) => (
                                            <div key={idx} className="text-gray-700 mb-1">{text}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-12 w-[50%] translate-y-[90px]">
                            {rightItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative mr-[36px]"
                                >
                                    {/* 年份圓圈 */}
                                    <div className={`
                                    absolute z-0 top-0 -right-[36px] transform -translate-y-1/2
                                    ${item.color} rounded-full w-[72px] h-[72px] flex items-center justify-center z-10
                                `}>
                                        <div className="-translate-y-4 text-black text-md">{item.year}</div>
                                        {/* circle background with offset circle */}
                                        <div className={`absolute bg-transparent w-[120%] h-[120%] rounded-full border-[1px] ${item.borderColor}`} />
                                    </div>

                                    {/* // top border  */}
                                    <div className="relative z-10 w-full h-[1px] z-0 top-0 transform -translate-y-1/2 bg-gray-300">
                                        <div className={`absolute right-0 translate-x-1/2 
                                        top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${item.dotColor}`}
                                        />
                                    </div>
                                    <div className="h-8" />
                                    {/* 內容區塊 */}
                                    <div className="relative z-10 flex flex-col items-start w-full pl-4">
                                        {item.items.map((text, idx) => (
                                            <div key={idx} className="text-gray-700 mb-1">{text}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProfessionalLicensesSection() {
    const licenses = [
        "急救人員", "有機溶劑作業主管", "搪士支撐作業主管主管", "高空作業車操作人員",
        "缺氧作業主管", "粉塵作業主管", "屋頂作業主管", "特定化學物質作業主管",
        "吊掛作業人員", "營造業甲種業務主管", "露天開挖作業主管", "防火管理人"
    ];

    return (
        <section className="py-16 bg-[#BBE4FF]">
            <div className="container mx-auto px-8 max-w-[958px]">
                <div className="flex flex-col items-center md:items-start md:flex-row">
                    <div className="bg-white/60 rounded-lg p-4 w-[80%] md:w-1/4 md:mb-0 md:mr-8 text-center md:text-left">
                        <h2 className="text-h4 font-bold mb-2 md:block hidden">專業<br />技術證照</h2>
                        <h2 className="text-h4 font-bold mb-2 md:hidden">專業技術證照</h2>
                        <p className="text-gray-600">Professional license</p>
                    </div>
                    <div className="md:w-3/4 pt-8 md:pt-0 ml-6 md:ml-0">
                        <div className="flex flex-wrap gap-x-6 gap-y-1">
                            {licenses.map((license, index) => (
                                <div key={index} className="relative bg-transparent py-2 text-h4">
                                    <p className="text-gray-800">{license}</p>
                                    <div className="absolute -left-4 top-4 h-[20px] w-2 bg-gray-900 md:hidden" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function EnergyManagementSolutionSection() {
    return (
        <section className="relative py-16 bg-white bg-gradient-to-r to-[#BBE4FF] from-[#FFFFFF]">
            <div className="container mx-auto max-w-[958px]">
                <TitleWithEngSubtitle title="能源管理解決方案" subtitle="Energy Management Solutions" />

                <div>
                    <div className="relative flex w-full">
                        <div className="relative flex z-10 md:text-h3">
                            <img src="/images/energy-circle.png" alt="能源管理解決方案" />
                            <p className="text-center font-bold absolute top-[46%] left-[38%]">能耗管理系統
                                <br />
                                (IEMS)</p>
                            <p className="absolute top-[19%] left-[15%]">能耗視覺化</p>
                            <p className="text-center absolute top-[23%] right-[17%]">能源統計<br />分析</p>
                            <p className="text-center absolute top-[72%] right-[22%]">節能績效<br />分析</p>
                            <p className="text-center absolute top-[62%] left-[13%]">能耗報表<br />異常警報</p>

                        </div>
                        <div className="relative w-[430px] z-1 md:block hidden">
                            <img className="absolute w-[430px]" src="/images/energy-tree.svg" alt="能源管理解決方案" />
                            <img className="absolute bottom-[40px] w-[314px]" src="/images/energy-plug.svg" alt="能源管理解決方案" />
                        </div>


                    </div>

                </div>
            </div>
            <div className="absolute w-[170px] right-0 bottom-0 md:hidden">
                <img className="absolute bottom-0 w-full" src="/images/energy-tree.svg" alt="能源管理解決方案" />
            </div>
        </section>
    );
}