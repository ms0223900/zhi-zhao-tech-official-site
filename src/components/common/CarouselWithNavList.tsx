"use client"
/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from "react"
import Slider, { Settings } from "react-slick"
import ArrowLeftIcon from "/public/images/icons/arrow-left.svg"
import ArrowRightIcon from "/public/images/icons/arrow-right.svg"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

type Props = {
    imageList: string[]
}

export default function ServiceCarousel({ imageList, }: Props) {
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
                    className="gap-slider"
                >
                    {imageList.map((image, index) => (
                        <div key={index} className="aspect-w-16 aspect-h-9 px-1">
                            <img
                                src={image}
                                alt={`圖片 ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg shadow-md"
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* 縮略圖導航 */}
            <div className="mt-2 relative">
                <Slider
                    ref={thumbnailSliderRef}
                    {...thumbnailSliderSettings}
                    asNavFor={nav1}
                    afterChange={(currentSlide: number) => setCurrentSlide(currentSlide)}
                    className="gap-slider text-[0px]"
                >
                    {imageList.map((image, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer transition-all duration-300 px-1 ${currentSlide === index
                                ? 'opacity-100'
                                : 'opacity-70'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`縮略圖 ${index + 1}`}
                                className="w-full object-cover rounded shadow-md"
                            />
                        </div>
                    ))}
                </Slider>

                {/* 左右箭頭按鈕 */}
                <div className="absolute left-0 top-0 bottom-0 m-auto h-full  w-[50px] flex items-center justify-center bg-white/50 transition-colors">
                    <button
                        className="w-full h-full flex items-center justify-center"
                        onClick={() => thumbnailSliderRef.current?.slickPrev()}
                    >
                        <ArrowLeftIcon width={12} />
                    </button>
                </div>

                <div className="absolute right-0 top-0 bottom-0 m-auto h-full  w-[50px] flex items-center justify-center bg-white/50 transition-colors">
                    <button
                        className="w-full h-full flex items-center justify-center"
                        onClick={() => thumbnailSliderRef.current?.slickNext()}
                    >
                        <ArrowRightIcon width={12} />
                    </button>
                </div>
            </div>
        </div>
    )
}
