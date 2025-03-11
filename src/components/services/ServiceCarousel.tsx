"use client"
/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from "react"
import Slider, { Settings } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

type Props = {
    serviceImageList: string[]
}

export default function ServiceCarousel({ serviceImageList }: Props) {
    const mainSliderRef = useRef<Slider>(null)
    const thumbnailSliderRef = useRef<Slider>(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [nav1, setNav1] = useState<Slider | undefined>(undefined)
    const [nav2, setNav2] = useState<Slider | undefined>(undefined)

    // 設置 slider 連接
    useEffect(() => {
        setNav1(mainSliderRef.current || undefined)
        setNav2(thumbnailSliderRef.current || undefined)
    }, [])

    // 主要輪播設定
    const mainSliderSettings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    // 縮略圖輪播設定
    const thumbnailSliderSettings: Settings = {
        dots: false,
        speed: 500,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        focusOnSelect: true,
        centerPadding: '10px',
        // variableWidth: true
        // arrows: true,
    }

    return (
        <div className="relative">
            {/* 主要輪播 */}
            <div className="mb-4">
                <Slider
                    ref={mainSliderRef}
                    {...mainSliderSettings}
                    asNavFor={nav2}
                    afterChange={(currentSlide: number) => setCurrentSlide(currentSlide)}
                >
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
                <Slider
                    ref={thumbnailSliderRef}
                    {...thumbnailSliderSettings}
                    asNavFor={nav1}
                    afterChange={(currentSlide: number) => setCurrentSlide(currentSlide)}
                >
                    {serviceImageList.map((image, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer transition-all duration-300 ${currentSlide === index
                                ? 'opacity-100 border-2 border-blue-500'
                                : 'opacity-70'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`縮略圖 ${index + 1}`}
                                className="w-full object-cover rounded"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}
