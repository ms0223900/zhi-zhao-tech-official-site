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
                        <div className="text-[#2196F3] font-medium text-center mb-2">500+</div>
                        <div className="text-gray-500 text-sm text-center">Projects completed</div>
                        <div className="text-[#2196F3] font-medium text-center mt-8 mb-2">300+</div>
                        <div className="text-gray-500 text-sm text-center">Satisfied clients</div>
                        <div className="absolute inset-0">
                            <img src="/images/welcome-person-right.png" alt="歡迎來到智兆科技" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
