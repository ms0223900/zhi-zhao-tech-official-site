'use client'

import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function ImageCarousel() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const carouselItems = [
        {
            id: 1,
            image: '/images/esg/esg-e/carousel-images/esg-e-image-1.jpg',
            title: '工程圖'
        },
        {
            id: 2,
            image: '/images/esg/esg-e/carousel-images/esg-e-image-2.jpg',
            title: '工程圖'
        },
        {
            id: 3,
            image: '/images/esg/esg-e/carousel-images/esg-e-image-3.jpg',
            title: '太陽能契約'
        },
        {
            id: 4,
            image: '/images/esg/esg-e/carousel-images/esg-e-image-4.jpg',
            title: '太陽能契約'
        },
        {
            id: 5,
            image: '/images/esg/esg-e/carousel-images/esg-e-image-5.jpg',
            title: '太陽能契約'
        },
    ]

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
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
        ]
    }

    return (
        <section className="max-w-[1440px] mx-auto py-12 px-4 md:px-8">
            {mounted && (
                <Slider {...settings}>
                    {carouselItems.map((item) => (
                        <div key={item.id} className="px-2">
                            <div className="flex flex-col items-center">
                                <div className="h-[180px] w-full overflow-hidden">
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