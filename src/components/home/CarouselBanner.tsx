import React from "react";

export function CarouselBanner() {
    return (
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent">
            <div className="container mx-auto px-8 h-full flex flex-col justify-center">
                <img src="/images/home-banner-carousel-1.jpg" alt="Carousel Banner" className="w-full h-full object-cover" />
            </div>
        </div>
    );
}
