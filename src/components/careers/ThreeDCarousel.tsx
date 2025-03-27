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
        centerPadding: "0",
        slidesToShow: 3,
        speed: 500,
        dots: true,
        arrows: true,
        beforeChange: (current, next) => setCurrentSlide(next),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
        customPaging: (i: number) => (
            <div
                className={cn(
                    "w-3 h-3 rounded-full transition-colors",
                    i === currentSlide ? "bg-primary-600" : "bg-gray-300",
                )}
            />
        ),
    }

    if (!mounted) return null

    return (
        <div className="w-full">
            <Slider {...settings}>
                {carouselItems.map((item, index) => (
                    <div key={item.id} className="px-4">
                        <div
                            className={cn(
                                "transform transition-all duration-300",
                                index === currentSlide
                                    ? "scale-100 opacity-100"
                                    : "scale-90 opacity-70"
                            )}
                        >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-end justify-center p-4">
                                    <h3 className="text-white text-xl font-semibold">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
} 