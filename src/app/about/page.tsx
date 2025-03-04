/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "About page",
};

export default function About() {
    return (
        <div className="min-h-screen">
            <BannerSection />
            <WelcomeSection />
            <CoreValuesSection />
        </div>
    );
}

function BannerSection() {
    return (
        <section className="relative h-[400px]">
            <div className="absolute inset-0">
                <img
                    src="/images/about-us-banner.jpg"
                    alt="關於智兆"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative h-full flex flex-col items-center justify-center text-center">
                <h1 className="text-white text-5xl font-bold mb-4">關於智兆</h1>
                <p className="text-white text-xl">About Us</p>
            </div>
        </section>
    );
}

function WelcomeSection() {
    return (
        <section className="theme-gradient-blue">
            <div className="container mx-auto px-8 max-w-[958px]">
                <div className="flex flex-col md:flex-row md:gap-[90px] items-stretch gap-12">
                    <div className="flex-1 py-[38px]">
                        <h2 className="text-3xl font-bold mb-6">歡迎來到智兆科技</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">智兆科技企業有限公司成立於2012年，專注於無塵室工程、空調工程、製程管路及系統工程的整體解決方案。我們致力於為半導體、光電、生技化學及其他高科技產業提供優質的工程服務，以滿足客戶對高規格、高效率、高安全性的需求。</p>
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute top-[20px] right-[180px] bg-white rounded-lg p-2">
                            <div className="text-[#2196F3] font-medium text-center mb-2">500+</div>
                            <div className="text-gray-500 text-sm text-center">內容內容</div>
                        </div>
                        <div className="absolute top-[110px] right-[280px] bg-white rounded-lg p-2">
                            <div className="text-[#2196F3] font-medium text-center">300+</div>
                            <div className="text-gray-500 text-sm text-center">內容內容</div>
                        </div>
                        <div className="absolute inset-0">
                            <img src="/images/welcome-person-right.png" alt="歡迎來到智兆科技" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CoreValuesSection() {
    const coreValues = [
        { icon: "/images/icon-passion.svg", title: "熱忱" },
        { icon: "/images/icon-professional.svg", title: "專業" },
        { icon: "/images/icon-team.svg", title: "團隊" },
        { icon: "/images/icon-trust.svg", title: "誠信" },
    ];

    return (
        <section className="px-4">
            <div className="container mx-auto max-w-[958px]">
                <div className="shadow-lg rounded-lg p-8 bg-white">

                    <div className="flex flex-wrap justify-center gap-8">
                        {coreValues.map((value, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="bg-gray-100 rounded-full p-6 w-28 h-28 flex items-center justify-center mb-4">
                                    {/* Placeholder for icon */}
                                    <img src={value.icon} alt={value.title} className="w-16 h-16" />
                                </div>
                                <span className="text-xl font-medium">{value.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 rounded-lg border border-2 border-[#95DDFF] p-8 bg-gradient-to-br from-[#FFFFFF] to-[#95DDFF20]">
                    <h3 className="text-2xl text-[#2196F3] font-bold text-left mb-6">智兆科技四大核心價值</h3>
                    <p className="text-gray-600 leading-relaxed">
                        智兆科技以「熱誠、專業、團隊、誠信」為核心價值，結合豐富的技術實力和豐富的產業經驗，成功打造了多個高端項目，包括日月光半導體、聯一化工、旭智潔、台達科技、海洋生技、偉茂科技及多家國內科技企業的工程建設。
                    </p>
                </div>
            </div>
        </section>
    );
}