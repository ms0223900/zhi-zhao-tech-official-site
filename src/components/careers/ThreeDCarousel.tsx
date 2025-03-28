'use client'

import { useEffect, useState } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CareerCarouselItem } from './data'
import { cn } from '@/utils/cn'

interface ThreeDCarouselProps {
    carouselItems: CareerCarouselItem[]
}

export default function ThreeDCarousel({ carouselItems }: ThreeDCarouselProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const settings: Settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "0px",
        slidesToShow: 3,
        arrows: false,
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    centerPadding: "0px",
                }
            }
        ],
    }

    if (!mounted) return null

    return (
        <div className={cn(
            "w-full my-10 slider-container overflow-hidden rounded-lg ",
            "px-4 relative",
            "careers-carousel"
        )}>
            <Slider {...settings}>
                {carouselItems.map((item) => (
                    <div key={item.id} className="px-1">
                        <div className={"my-[60px]"}>
                            <div className="relative aspect-[25/27]">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <h3 className="text-h6 text-center opacity-0 pt-4">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
} 