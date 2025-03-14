/* eslint-disable @next/next/no-img-element */
"use client"

import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CustomArrow({ direction, onClick }: { direction: "prev" | "next"; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-10 h-10 absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-gray-300/50 hover:bg-gray-300/80 transition-colors"
            style={{
                left: direction === "prev" ? "10px" : "auto",
                right: direction === "next" ? "10px" : "auto",
            }}
        >
            <span className="sr-only">{direction === "prev" ? "Previous" : "Next"} slide</span>
            {direction === "prev" ? (
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            ) : (
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            )}
        </button>
    );
}

type ProductCarouselProps = {
    productImageList: string[]
}

export function ProductCarousel({ productImageList }: ProductCarouselProps) {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <CustomArrow direction="next" />,
        prevArrow: <CustomArrow direction="prev" />,
        dotsClass: "slick-dots !bottom-4",
        customPaging: (index: number) => (
            <div
                className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-[#044E7B]' : 'bg-[#D9D9D9]'
                    } hover:bg-[#D9D9D9]/80 transition-colors cursor-pointer`}
            />
        ),
        beforeChange: (current, next) => setCurrentSlide(next),
    };

    return (
        <div className="relative">
            <Slider {...settings} className="w-full aspect-[16/9]">
                {productImageList.map((image, index) => (
                    <div key={index} className="relative aspect-[16/9]">
                        <img
                            src={image}
                            alt={`Product Image ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
