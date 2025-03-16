/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ProductCarousel } from './ProductCarousel';
import RwdComponent from '../common/RwdComponent';
import ServiceCarousel from '../common/CarouselWithNavList';
import MainContentContainer from '../common/MainContentContainer';
import LinkCard from '../common/LinkCard';
import SectionTitle from './SectionTitle';
import ProductAdvantageCard from './ProductAdvantageCard';

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
            <ProductAdvantageSection />
        </div>
    );
}

function LinkSection() {
    return (
        <div className="container flex md:flex-row flex-col gap-[30px] justify-center py-[75px]">
            <LinkCard
                link="https://www.google.com" // TODO: 改成實際連結
                image="/images/particle-sensor/particle-sensor-console.jpg"
                title="中控台畫面圖"
                subtitle="廠房"
            />
            <LinkCard
                link="https://www.google.com" // TODO: 改成實際連結
                image="/images/particle-sensor/particle-sensor-system-structure.jpg"
                title="系統架構圖"
                subtitle="廠房"
            />
        </div>
    )
}

const productAdvantageList = [
    {
        title: "高性價比",
        detailDescription: "市售量測工具單價高，本產品具備多項功能可供搭配",
        iconSrc: "/images/particle-sensor/icon-cost-effective.svg"
    },
    {
        title: "體積小",
        detailDescription: "體積優勢適用各類型設備，可用於異物好發區域、機台腔體...等",
        iconSrc: "/images/particle-sensor/icon-compact-size.svg"
    },
    {
        title: "簡便",
        detailDescription: "隨插隨用、方便安裝、擴增性佳",
        iconSrc: "/images/particle-sensor/icon-easy-to-use.svg"
    },
    {
        title: "7*24實時監測",
        detailDescription: "貫徹工安第一、工區6S環境維護與整潔",
        iconSrc: "/images/particle-sensor/icon-7-24-monitoring.svg"
    },
    {
        title: "動態量測",
        detailDescription: "生產過程同步量測，毋須停機",
        iconSrc: "/images/particle-sensor/icon-dynamic-measurement.svg"
    },
    {
        title: "無線傳輸",
        detailDescription: "數據藉由WiFi回傳伺服器，省去佈線或手動檢測等潛在污染源",
        iconSrc: "/images/particle-sensor/icon-wireless-transmission.svg"
    }
]

// product advantage section
function ProductAdvantageSection() {
    return (
        <section className="bg-white -mx-4 md:mx-0 px-4">
            <SectionTitle title="產品優勢" />
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 py-6 ">
                {productAdvantageList.map((item, index) => (
                    <ProductAdvantageCard
                        key={index}
                        title={item.title}
                        subtitle=""
                        detailDescription={item.detailDescription}
                        iconSrc={item.iconSrc}
                    />
                ))}
            </div>
        </section>
    )
}