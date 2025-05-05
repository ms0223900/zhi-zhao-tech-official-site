/* eslint-disable @next/next/no-img-element */
import { cn } from '@/utils/cn';
import React from 'react';

interface BannerProps {
    title: string;
    subtitle: string;
    imageSrc: string;
    imgClassName?: string;
}

function Banner({ title, subtitle, imageSrc, imgClassName }: BannerProps) {
    return (
        <section className="relative h-[400px]">
            <div className="absolute inset-0">
                <img
                    src={imageSrc}
                    alt={title}
                    className={cn("w-full h-full object-cover", imgClassName)}
                />
            </div>
            <div className="relative h-full flex flex-col items-center justify-center text-center">
                <div className="relative z-1 p-2 bg-[#161616]/50 py-4 px-8">
                    {/* <div className="w-full h-full z-0 absolute bg-[#161616]/50 mx-auto left-0" /> */}
                    <h1 className="relative text-white z-1 text-5xl font-bold mb-4">{title}</h1>
                    <p className="relative text-white z-1 text-xl tracking-widest">{subtitle}</p>
                </div>
            </div>
        </section>
    );
}

export default Banner;