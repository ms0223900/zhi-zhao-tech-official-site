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
            <RwdComponent
                mobileComponent={<h2 className="text-2xl font-bold mb-4 text-center">Particle Sensor</h2>}
                desktopComponent={<></>}
            />
            <div className="flex flex-col md:flex-row gap-8 mb-6 ">
                <div className="w-full md:w-[450px] order-2 md:order-1 md:px-6">
                    <MainContentContainer className="md:text-center text-left">
                        <RwdComponent
                            mobileComponent={<h3 className="text-h3 font-bold pb-8 text-primary-blue">粉塵溫濕度感測器 量測範圍</h3>}
                            desktopComponent={<></>}
                        />
                        <p className="whitespace-pre-line">
                            {`Particle : 測量0.3~10um Class 1,000
                            Temperature : -10 ~ 60°C
                            Humidity : 0~99%`}
                        </p>
                    </MainContentContainer>
                </div>
                <div className="w-full md:w-[480px] md:order-2 order-1">
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