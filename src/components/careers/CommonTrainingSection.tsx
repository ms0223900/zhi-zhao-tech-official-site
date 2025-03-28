"use client"

import { CareerCarouselItem } from './data'
import ThreeDCarousel from './ThreeDCarousel'
import { cn } from '@/utils/cn'

interface TrainingSectionProps {
    title: string
    subTitle: string
    description: string
    detailDescriptions: {
        title: string
        content: string
    }[]
    carouselItems: CareerCarouselItem[]
    themeColor: string
}

export default function CommonTrainingSection({
    title,
    subTitle,
    description,
    detailDescriptions,
    carouselItems,
    themeColor
}: TrainingSectionProps) {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-4">
                    {/* Left side - Text content */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <SectionTitle title={title} subTitle={subTitle} themeColor={themeColor} />
                        <p className="text-h4 leading-relaxed">
                            {description}
                        </p>
                        <div className="space-y-4">
                            {detailDescriptions.map((item, index) => (
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
                        <ThreeDCarousel carouselItems={carouselItems} />
                    </div>
                </div>
            </div>
        </section>
    )
}

interface SectionTitleProps {
    title: string
    subTitle: string
    themeColor: string
}

const SectionTitle = ({
    title,
    subTitle,
    themeColor
}: SectionTitleProps) => {
    return (
        <div className={cn(
            "flex flex-row gap-[19px] items-center border-b border-b-[1px]",
        )} style={{
            borderColor: themeColor
        }}>
            <div className={cn(
                "w-[5px] h-[20px]",
            )} style={{
                backgroundColor: themeColor
            }} />
            <h2 className={cn(
                "text-h2 font-bold",
            )} style={{
                color: themeColor
            }}>
                {title}
            </h2>
            <span className="text-[12px] font-regular text-gray-600 leading-relaxed tracking-widest">
                {subTitle}
            </span>
        </div>
    )
} 