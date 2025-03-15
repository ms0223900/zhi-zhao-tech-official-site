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
                    {[
                        {
                            title: "電動監控",
                            detailDescription: "實時監測數據，啟動自動警示判斷，可進行下位控制器，預警參考值。",
                            iconSrc: "/images/icons/electric-monitor.svg"
                        },
                        {
                            title: "體積小",
                            detailDescription: "使用微型感測元件組合及各項整合器。",
                            iconSrc: "/images/icons/small-size.svg"
                        },
                        {
                            title: "無線傳輸",
                            detailDescription: "整建無線WiFi傳輸技術，完全手持操作。",
                            iconSrc: "/images/icons/wireless.svg"
                        },
                        {
                            title: "客製化",
                            detailDescription: "依據客戶不同製程需求，規劃可行解決方案。",
                            iconSrc: "/images/icons/customize.svg"
                        },
                        {
                            title: "經濟可靠",
                            detailDescription: "前期整備費用低廉，維護成本更低內建故障警報檢測。",
                            iconSrc: "/images/icons/economic.svg"
                        },
                        {
                            title: "封閉式作業系統",
                            detailDescription: "採用專屬化設備在工作環境中進行資料分析。",
                            iconSrc: "/images/icons/closed-system.svg"
                        },
                        {
                            title: "無污點",
                            detailDescription: "感測裝置可達到9.2公尺精確量點距。",
                            iconSrc: "/images/icons/no-pollution.svg"
                        },
                        {
                            title: "簡易型AI位點判定",
                            detailDescription: "針對海綿製作不良引發內外部失效成率。",
                            iconSrc: "/images/icons/ai-detection.svg"
                        }
                    ].map((item, index) => (
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