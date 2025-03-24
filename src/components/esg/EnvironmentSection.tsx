"use client"

import RwdComponent from "../common/RwdComponent";
import { ProductCarousel } from "../solutions/ProductCarousel";
import { esgECarouselItems } from './data';

export default function EnvironmentSection() {
    return (
        <section id="environment" className="container px-4 md:px-8">
            <div className="border-2 border-blue-500 rounded-2xl overflow-hidden theme-gradient-blue">
                <div className="flex flex-col md:flex-row gap-4 items-center px-2 md:px-12 py-10 md:py-6">
                    {/* 左側文字區塊 */}
                    <div className="w-full md:w-[55%] flex flex-col md:flex-row justify-start items-center gap-4 md:gap-12">
                        <div className="flex flex-col items-center">
                            <h2 className="text-[60px] leading-none font-black text-[#3EB1F3] mb-2">E</h2>
                            <h3 className="text-h2 text-primary-blue-dark md:text-2xl font-medium">環境保護</h3>
                            <p className="text-h2 text-xl text-primary-blue-dark">environment</p>
                        </div>

                        <div className="space-y-4 flex flex-col items-center md:items-start">
                            <h4 className="inline-block text-h2 text-xl font-medium border-b border-gray-400">太陽能發電綠能</h4>
                            <h4 className="inline-block text-h2 text-xl font-medium border-b border-gray-400">能源管理 節能減碳</h4>
                        </div>
                    </div>

                    {/* 右側圖片區塊 */}
                    <RwdComponent
                        desktopComponent={
                            <div className="flex items-center justify-center w-full">
                                <img
                                    src="/images/esg/esg-e/esg-e-cover.jpg"
                                    alt="太陽能發電"
                                    className="rounded-lg w-full h-auto max-h-[400px] object-cover"
                                />
                            </div>
                        }
                        desktopClassName="w-[45%]"
                        mobileComponent={
                            <ProductCarousel
                                productImageList={[
                                    "/images/esg/esg-e/esg-e-cover.jpg",
                                    // "/images/esg/esg-e/esg-e-cover.jpg",
                                    // "/images/esg/esg-e/esg-e-cover.jpg",
                                    ...esgECarouselItems.map((item) => item.image)
                                ]}
                            />
                        }
                        mobileClassName="w-full"
                    />
                </div>
            </div>
        </section>
    )
} 