import React from 'react';
import { ProductCarousel } from './ProductCarousel';
import RwdComponent from '../common/RwdComponent';
import ServiceCarousel from '../common/CarouselWithNavList';
import MainContentContainer from '../common/MainContentContainer';
import ProductAdvantageCard from './ProductAdvantageCard';

const particleSensorProductImageList = [
    "/images/particle-sensor/product-1.jpg",
    "/images/particle-sensor/product-2.jpg",
    "/images/particle-sensor/product-3.jpg",
]

const productAdvantageList = [
    {
        title: "實時監控",
        detailDescription: "實時記錄資料，反查問題更便利，異常當下立即反應，防範更即時。",
        iconSrc: "/images/machine-vision/product-advantage-1.svg"
    },
    {
        title: "體積小",
        detailDescription: "體積優勢適用不同場合及各類型設備。",
        iconSrc: "/images/machine-vision/product-advantage-2.svg"
    },
    {
        title: "無線傳輸",
        detailDescription: "數據藉由WiFi回傳伺服器，省去手動佈線。",
        iconSrc: "/images/machine-vision/product-advantage-3.svg"
    },
    {
        title: "客製化",
        detailDescription: "依據客戶不同製程要求，撰寫相對應辨識程式。",
        iconSrc: "/images/machine-vision/product-advantage-4.svg"
    },
    {
        title: "鏡頭可選",
        detailDescription: "預設搭載具夜視鏡頭，依據客戶需求可更換高速攝像鏡頭、廣角鏡頭......",
        iconSrc: "/images/machine-vision/product-advantage-5.svg"
    },
    {
        title: "封閉式作業系統",
        detailDescription: "所有影像只儲存在工廠伺服器，數據資料不外流。",
        iconSrc: "/images/machine-vision/product-advantage-6.svg"
    },
    {
        title: "無盲點",
        detailDescription: "搭配支架可呈現720度無盲點監控。",
        iconSrc: "/images/machine-vision/product-advantage-7.svg"
    },
    {
        title: "關鍵製程AI協助判定",
        detailDescription: "避免後端製程不良引發內/外部失效成本。",
        iconSrc: "/images/machine-vision/product-advantage-8.svg"
    }
]

export function ParticleSensorContent() {
    return (
        <div className="container">
            <RwdComponent
                mobileComponent={<h2 className="text-2xl font-bold mb-4 text-center">Particle Sensor</h2>}
                desktopComponent={<></>}
            />
            <section className="flex flex-col md:flex-row gap-8 mb-6 md:items-end">
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
            <section>
                <h2 className="text-h2 font-bold mb-[80px] text-center">產品優勢</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
    );
} 