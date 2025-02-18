/* eslint-disable @next/next/no-img-element */
"use client"

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselBannerImages = [
    "/images/home-banner.jpg",
    "/images/home-banner.jpg",
    "/images/home-banner.jpg",
];

// 客製化箭頭元件
function CustomArrow({ direction, onClick }: { direction: "prev" | "next"; onClick?: () => void }) {
    const Icon = direction === "prev" ? "<" : ">";
    return (
        <button
            onClick={onClick}
            className="md:block hidden w-10 h-10 absolute bottom-[100px] z-10 rounded-full border-2 border-white bg-transparent hover:bg-white/70 transition-colors text-white text-2xl"
            style={{
                right: direction === "prev" ? "100px" : "50px",
            }}
        >
            {Icon}
        </button>
    );
}

export function CarouselBanner() {
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <CustomArrow direction="next" />,
        prevArrow: <CustomArrow direction="prev" />,
    };

    return (
        <div className="relative">
            <Slider {...settings} className="w-full h-[600px]">
                {carouselBannerImages.map((image, index) => (
                    <div key={index} className="relative h-[600px]">
                        <img
                            src={image}
                            alt={`Carousel Banner ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
