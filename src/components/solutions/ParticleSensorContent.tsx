import React from 'react';
import { ProductCarousel } from './ProductCarousel';
import RwdComponent from '../common/RwdComponent';
import ServiceCarousel from '../common/CarouselWithNavList';
import MainContentContainer from '../common/MainContentContainer';

const particleSensorProductImageList = [
    "/images/particle-sensor/product-1.jpg",
    "/images/particle-sensor/product-2.jpg",
    "/images/particle-sensor/product-3.jpg",
]

export function ParticleSensorContent() {
    return (
        <div className="container">
            <h2 className="text-2xl font-bold mb-4">Particle Sensor Solution</h2>
            <div className="flex flex-col md:flex-row gap-8 mb-6">
                <div className="w-full md:w-[420px]">
                    <MainContentContainer>
                        <p className="whitespace-pre-wrap">
                            {`Particle : 測量0.3~10um Class 1,000
                            Temperature : -10 ~ 60°C
                            Humidity : 0~99%`}
                        </p>
                    </MainContentContainer>
                </div>
                <div className="w-full md:w-[540px]">
                    <RwdComponent
                        mobileComponent={<ProductCarousel productImageList={particleSensorProductImageList} />}
                        desktopComponent={<ServiceCarousel imageList={particleSensorProductImageList} />}
                    />
                </div>
            </div>
            <p className="text-gray-600">
                This is the content specific to the Particle Sensor solution.
                {/* Add more content here */}
            </p>
        </div>
    );
} 