"use client"

import ThreeDCarousel from './ThreeDCarousel'
import { talentTrainingCarouselItems } from './data'

export default function TalentTrainingSection() {
    return (
        <section className="py-16 bg-gray-50" id="talent-training">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                    {/* Left side - Text content */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">
                            人才培養
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            我們深信人才是企業的核心競爭力，致力於為員工提供多元化的學習與成長機會，與我們一起，透過持續學習，突破自我界限，攜手共創未來
                        </p>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    內部訓練
                                </h3>
                                <p className="text-gray-600">
                                    專業技能培訓、職場軟實力提升課程
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    外部學習資源
                                </h3>
                                <p className="text-gray-600">
                                    補助專業證照考取與外部進修計畫
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    職涯發展
                                </h3>
                                <p className="text-gray-600">
                                    量身打造個人化職涯規劃，助力員工實現長期成長
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - 3D Carousel */}
                    <div className="w-full lg:w-1/2">
                        <ThreeDCarousel carouselItems={talentTrainingCarouselItems} />
                    </div>
                </div>
            </div>
        </section>
    )
} 