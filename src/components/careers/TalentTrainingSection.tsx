"use client"

import ThreeDCarousel from './ThreeDCarousel'
import { talentTrainingCarouselItems } from './data'
import { cn } from '@/utils/cn'

export default function TalentTrainingSection() {
    return (
        <section className="py-16 bg-gray-50" id="talent-training">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                    {/* Left side - Text content */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <CareerTitle title="人才培養" subTitle="Talent Training" />
                        <p className="text-lg text-gray-600 leading-relaxed">
                            我們深信人才是企業的核心競爭力，致力於為員工提供多元化的學習與成長機會，與我們一起，透過持續學習，突破自我界限，攜手共創未來
                        </p>
                        <div className="space-y-4">
                            {[
                                { title: '- 內部訓練', content: '專業技能培訓、職場軟實力提升課程' },
                                { title: '- 外部學習資源', content: '補助專業證照考取與外部進修計畫' },
                                { title: '- 職涯發展', content: '量身打造個人化職涯規劃，助力員工實現長期成長' }
                            ].map((item, index) => (
                                <div key={index}>
                                    <h3 className="text-xl font-regular text-gray-800 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#706F6F]">
                                        {item.content}
                                    </p>
                                </div>
                            ))}
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

const CareerTitle = ({
    title,
    subTitle,
    themeColor = "#E57B42"
}: {
    title: string,
    subTitle: string,
    themeColor?: string
}) => {
    return (
        <div className={cn(
            "flex flex-row gap-[19px] items-center border-b border-b-[1px]",
            themeColor ? `border-[${themeColor}]` : "border-gray-200"
        )}>
            <div className={cn(
                "w-[5px] h-[20px]",
                themeColor ? `bg-[${themeColor}]` : "bg-gray-600"
            )} />
            <h2 className={cn(
                "text-h2 font-bold",
                themeColor ? `text-[${themeColor}]` : "text-gray-900"
            )}>
                {title}
            </h2>
            <span className="text-[12px] font-regular text-gray-600 leading-relaxed tracking-widest">
                {subTitle}
            </span>
        </div>
    )
}