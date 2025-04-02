/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface BannerProps {
    title: string;
    subtitle: string;
    imageSrc: string;
}

function Banner({ title, subtitle, imageSrc }: BannerProps) {
    return (
        <section className="relative h-[400px]">
            <div className="absolute inset-0">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative h-full flex flex-col items-center justify-center text-center">
                <h1 className="text-white text-5xl font-bold mb-4">{title}</h1>
                <p className="text-white text-xl tracking-widest">{subtitle}</p>
            </div>
        </section>
    );
}

export default Banner;