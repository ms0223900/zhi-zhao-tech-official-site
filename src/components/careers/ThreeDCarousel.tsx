'use client'

import { useEffect, useState } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { TalentTrainingCarouselItem } from './data'
import { cn } from '@/utils/cn'

interface ThreeDCarouselProps {
    carouselItems: TalentTrainingCarouselItem[]
}

export default function ThreeDCarousel({ carouselItems }: ThreeDCarouselProps) {
    const [mounted, setMounted] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        setMounted(true)
    }, [])

    const settings: Settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "100px",
        slidesToShow: 1,
        beforeChange: (current, next) => setCurrentSlide(next),
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    centerPadding: "60px",
                }
            }
        ],
    }

    if (!mounted) return null

    return (
        <div className="w-full my-10 slider-container overflow-hidden rounded-lg">
            <Slider {...settings}>
                {carouselItems.map((item, index) => (
                    <div key={item.id} className={cn(
                        "px-4 relative",
                        "transform transition-all duration-500 transform-center",
                        index === currentSlide
                            ? "scale-[1.3] brightness-[1] z-10"
                            : "scale-80 brightness-[0.6]"
                    )}>
                        <div
                            className={cn(
                                "transform transition-all duration-500 my-[100px]",
                            )}
                        >
                            <div className="relative aspect-[2/3]">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                {index === currentSlide && (
                                    <h3 className="text-xl font-semibold text-center">
                                        {item.title}
                                    </h3>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
} 