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
        // className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "0px",
        slidesToShow: 3,
        speed: 500,
        beforeChange: (current, next) => setCurrentSlide(next),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "0px",
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
        <div className="w-full my-10">
            <Slider {...settings}>
                {carouselItems.map((item, index) => (
                    <div key={item.id} className={cn(
                        "px-2",
                        "transform transition-all duration-500",
                        // index === currentSlide
                        //     ? "scale-[1.4] brightness-[1]"
                        //     : "scale-80 brightness-[0.8]"
                    )}>
                        <div
                            className={cn(
                                "transform transition-all duration-500",
                            )}
                        >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-end justify-center p-4">
                                    <h3 className="text-white text-xl font-semibold text-center">
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