"use client"
/* eslint-disable @next/next/no-img-element */
import Slider from "react-slick"

const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
}

type Props = {
    serviceImageList: string[]
}

export default function ServiceCarousel({ serviceImageList }: Props) {
    return (
        <Slider {...sliderSettings}>
            {/* Replace these with your actual images */}
            <div className="aspect-w-16 aspect-h-9">
                <img
                    src={serviceImageList[0]}
                    alt={serviceImageList[0]}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <div className="aspect-w-16 aspect-h-9">
                <img
                    src={serviceImageList[1]}
                    alt={`${serviceImageList[1]} 2`}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            {/* Add more slides as needed */}
        </Slider>
    )
}
