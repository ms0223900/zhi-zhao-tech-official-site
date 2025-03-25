'use client'

import { useEffect, useState } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CarouselItem } from './data'
import { cn } from '@/utils/cn'

interface ImageCarouselProps {
    carouselItems: CarouselItem[]
    dotActiveClassName?: string
    dotClassName?: string
    settings?: Settings
}
export default function ImageCarousel({
    carouselItems,
    dotActiveClassName = "bg-blue-500",
    dotClassName = "bg-[#D9D9D9]",
    settings = {},
}: ImageCarouselProps) {
    const [mounted, setMounted] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    useEffect(() => {
        setMounted(true)
    }, [])

    const _settings: Settings = {
        className: "max-h-[280px]",
        dots: true,
        dotsClass: "slick-dots !bottom-[-60px]",
        customPaging: (index: number) => (
            <div
                className={cn(
                    "mx-0 w-[14px] h-[14px] rounded-full transition-colors cursor-pointer",
                    index === currentSlide ? dotActiveClassName : dotClassName,
                    "hover:bg-[#D9D9D9]/80",
                )}
            />
        ),
        beforeChange: (current, next) => setCurrentSlide(next),
        infinite: true,
        speed: 500,
        variableWidth: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
        ...settings,
    }

    return (
        <section className="container py-12 px-4 md:px-8">
            {mounted && (
                <Slider {..._settings}>
                    {carouselItems.map((item) => (
                        <div key={item.id} className="px-2">
                            <div className="flex flex-col items-center">
                                <div className="h-[240px] w-full overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-center mt-4">
                                    <h3 className="text-lg font-medium">{item.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </section>
    )
} 