'use client'

import { useEffect, useState } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CareerCarouselItem } from './data'
import { cn } from '@/utils/cn'

interface ThreeDCarouselProps {
    carouselItems: CareerCarouselItem[]
    settings?: Settings
}

export default function ThreeDCarousel({ carouselItems, settings }: ThreeDCarouselProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    const _settings: Settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "0px",
        slidesToShow: 3,
        arrows: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    centerPadding: "0px",
                }
            }
        ],
        ...settings
    }

    if (!mounted) return null

    // clone carouselItems for safety
    const clonedCarouselItems = [...carouselItems, ...carouselItems, ...carouselItems, ...carouselItems]

    return (
        <div className={cn(
            "w-full my-10 slider-container overflow-hidden rounded-lg ",
            "px-4 relative",
            "careers-carousel"
        )}>
            <Slider {..._settings}>
                {clonedCarouselItems.map((item) => (
                    <div key={item.id} className="px-1">
                        <div className={"my-[60px]"}>
                            <div className="relative aspect-[25/27]">
                                <img
                                    src={item.image}
                                    alt={`${item.id}`}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
} 