"use client"
/* eslint-disable @next/next/no-img-element */
import { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

type Props = {
    serviceImageList: string[]
}

export default function ServiceCarousel({ serviceImageList }: Props) {
    const [currentSlide, setCurrentSlide] = useState(0)

    // 主要輪播設定
    const mainSliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        beforeChange: (_: number, next: number) => setCurrentSlide(next),
    }

    // 縮略圖輪播設定
    const thumbnailSliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: serviceImageList.length,
        slidesToScroll: 1,
        focusOnSelect: true,
        centerMode: true,
        centerPadding: '0px',
        arrows: true,
    }

    return (
        <div className="relative">
            {/* 主要輪播 */}
            <div className="mb-4">
                <Slider {...mainSliderSettings}>
                    {serviceImageList.map((image, index) => (
                        <div key={index} className="aspect-w-16 aspect-h-9">
                            <img
                                src={image}
                                alt={`服務圖片 ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* 縮略圖導航 */}
            <div className="mt-2">
                <Slider {...thumbnailSliderSettings} onSwipe={() => { }}>
                    {serviceImageList.map((image, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer transition-all duration-300 ${currentSlide === index
                                ? 'opacity-100 border-2 border-blue-500'
                                : 'opacity-70'
                                }`}
                            onClick={() => setCurrentSlide(index)}
                        >
                            <img
                                src={image}
                                alt={`縮略圖 ${index + 1}`}
                                className="w-24 h-16 object-cover rounded"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}
