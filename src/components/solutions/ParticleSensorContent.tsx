/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ProductCarousel } from './ProductCarousel';
import RwdComponent from '../common/RwdComponent';
import ServiceCarousel from '../common/CarouselWithNavList';
import MainContentContainer from '../common/MainContentContainer';
import LinkCard from '../common/LinkCard';

const particleSensorProductImageList = [
    "/images/particle-sensor/product-1.jpg",
    "/images/particle-sensor/product-2.jpg",
    "/images/particle-sensor/product-3.jpg",
]
export function ParticleSensorContent() {
    return (
        <div className="">
            <RwdComponent
                mobileComponent={<h2 className="text-2xl font-bold mb-4 text-center">Particle Sensor</h2>}
                desktopComponent={<></>}
            />
            <section className="container flex flex-col md:flex-row gap-8 mb-6 md:items-end">
                <div className="w-full md:w-[450px] order-2 md:order-1 md:px-6">
                    <RwdComponent
                        mobileComponent={<></>}
                        desktopComponent={<h2 className="text-h2 font-bold mb-[80px] text-center">Particle Sensor</h2>}
                    />
                    <RwdComponent
                        mobileComponent={<></>}
                        desktopComponent={<h3 className="text-h3 font-bold pb-6 text-center">粉塵溫濕度感測器 量測範圍</h3>}
                    />
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
            </section>
            <LinkSection />
        </div>
    );
}

function LinkSection() {
    return (
        <div className="container flex md:flex-row flex-col gap-[30px] justify-center py-[75px]">
            <LinkCard
                link="https://www.google.com"
                image="/images/particle-sensor/product-1.jpg"
                title="中控台畫面圖"
                subtitle="廠房"
            />
            <LinkCard
                link="https://www.google.com"
                image="/images/particle-sensor/product-1.jpg"
                title="系統架構圖"
                subtitle="廠房"
            />
        </div>
    )
}