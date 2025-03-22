"use client"

import RwdComponent from "../common/RwdComponent";

export default function SocialSection() {
    return (
        <section id="social" className="container px-4 md:px-8">
            <div className="border-2 border-[#E57B42] rounded-2xl overflow-hidden theme-gradient-blue">
                <div className="flex flex-col md:flex-row gap-4 items-center px-2 md:px-12 py-10 md:py-6">
                    {/* 左側文字區塊 */}
                    <div className="w-full md:w-[55%] flex flex-col md:flex-row justify-start items-center gap-4 md:gap-12">
                        <div className="flex flex-col items-center">
                            <h2 className="text-[60px] leading-none font-black text-[#E57B42] mb-2">S</h2>
                            <h3 className="text-h2 text-primary-blue-dark md:text-2xl font-medium">企業社會責任</h3>
                            <p className="text-h2 text-xl text-primary-blue-dark">Social</p>
                        </div>

                        <div className="space-y-4 flex flex-col items-center md:items-start">
                            <h4 className="inline-block text-h2 text-xl font-medium border-b border-gray-400">社會公益</h4>
                            <h4 className="inline-block text-h2 text-xl font-medium border-b border-gray-400">員工關懷</h4>
                        </div>
                    </div>

                    {/* 右側圖片區塊 */}
                    <RwdComponent
                        desktopComponent={
                            <div className="flex items-center justify-center w-full">
                                <img
                                    src="/images/esg/esg-s/esg-s-cover.jpg"
                                    alt="社會公益"
                                    className="rounded-lg w-full h-auto max-h-[400px] object-cover"
                                />
                            </div>
                        }
                        desktopClassName="w-[45%]"
                        mobileComponent={
                            <div className="flex items-center justify-center w-full">
                                <img
                                    src="/images/esg/esg-s/esg-s-cover.jpg"
                                    alt="社會公益"
                                    className="rounded-lg w-full h-auto object-cover"
                                />
                            </div>
                        }
                        mobileClassName="w-full"
                    />
                </div>
            </div>
        </section>
    )
} 