/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ProductCarousel } from './ProductCarousel';
import RwdComponent from '../common/RwdComponent';
import ServiceCarousel from '../common/CarouselWithNavList';
import MainContentContainer from '../common/MainContentContainer';
import LinkCard from '../common/LinkCard';
import SectionTitle from './SectionTitle';
import ProductAdvantageCard from './ProductAdvantageCard';

const particleSensorProductImageList = Array.from({ length: 6 },
    (_, i) => `/images/particle-sensor/particle-sensor-product-${i + 1}.jpg`
);
export function ParticleSensorContent() {
    return (
        <div className="">
            <RwdComponent
                mobileComponent={<h2 className="text-2xl font-bold mb-4 text-center">Particle Sensor</h2>}
                desktopComponent={<></>}
            />
            <ProductIntroductionSection />
            <LinkSection />
            <ProductAdvantageSection />
            <ActualCaseSection />
        </div>
    );
}

function ProductIntroductionSection() {
    return (
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
    )
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

// actual case section
const actualCaseList = [
    {
        title: "工廠簡介",
        description: <>
            中國Mini LED、COB封裝技術的龍頭企業，<br />
            全球員工人數超過1000人。
        </>,
    },
    {
        title: "導入過程",
        description: <>
            隨插隨用，方便安裝，在金屬機殼屏蔽條件下，<br />
            WiFi訊息仍可連接AP，順利上傳環境數值。
        </>,
    },
    {
        title: "試用背景",
        description: <>
            現有的手持式粒子計數器為人工定時定點測試，<br />
            人工記錄數據，人工監控有無異常，<br />
            無法做到動態測試，即時監控及異常自動警報，<br />
            為實現此功能有選用一款粒子計數器(PTH Sensor)進行試用，<br />
            以提高潔淨車間粒子監測的準確性和及時性，和滿足新客戶/新產品對潔淨車間的需求。
        </>,
    },
    {
        title: "試用總結",
        description: <ul className="text-gray-700 space-y-2">
            <li className="flex items-start">
                <span className="font-medium mr-2">1.</span>
                <span>無需人員維護及手動量測</span>
            </li>
            <li className="flex items-start">
                <span className="font-medium mr-2">2.</span>
                <span>測量數據即時且真實</span>
            </li>
            <li className="flex items-start">
                <span className="font-medium mr-2">3.</span>
                <span>WiFi訊號達50公尺幅射半徑，且能穿透機台金屬屏蔽</span>
            </li>
            <li className="flex items-start">
                <span className="font-medium mr-2">4.</span>
                <span>監測頁面可結合現有電子廣告看板，執行走動目視管理</span>
            </li>
            <li className="flex items-start">
                <span className="font-medium mr-2">5.</span>
                <span>得出環境數值與現有量測儀器比較之下無顯著差異</span>
            </li>
        </ul>
    }
]

function ActualCaseItem({ title, description }: { title: string, description: React.ReactNode }) {
    return (
        <div className="rounded-lg">
            <h3 className="text-lg font-bold pb-3 text-primary-blue flex items-center">
                <span className="mr-2 text-xl">::</span> {title}
            </h3>
            <p className="text-gray-700">
                {description}
            </p>
        </div>
    )
}
function ActualCaseSection() {
    return (
        <section className="md:mx-0 px-4 py-12">
            <SectionTitle title="實際應用案例" />

            <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {actualCaseList.map((item, index) => (
                    <ActualCaseItem key={index} title={item.title} description={item.description} />
                ))}
            </div>

            <div className="container mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4 items-center">
                        <button className="bg-transparent border-2 border border-blue-300 rounded-full py-2 md:px-[80px] px-[60px] text-center">
                            {"ESP03：T3固晶機內櫃"}
                        </button>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <img src="/images/particle-sensor/ESP03-1.jpg" alt="ESP02：T3印刷機內" className="w-full h-auto" />
                            <img src="/images/particle-sensor/ESP03-2.jpg" alt="ESP02：T3印刷機內" className="w-full h-auto" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                        <button className="bg-transparent border-2 border border-blue-300 rounded-full py-2 md:px-[80px] px-[60px] text-center">
                            {"ESP02：T3印刷機內"}
                        </button>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <img src="/images/particle-sensor/ESP02-1.jpg" alt="ESP02：T3印刷機內" className="w-full h-auto" />
                            <img src="/images/particle-sensor/ESP02-2.jpg" alt="ESP02：T3印刷機內" className="w-full h-auto" />
                        </div>
                    </div>
                </div>

                <MainContentContainer className="py-6 md:max-w-[700px] mx-auto">
                    <p className="text-gray-700 leading-7">
                        通過本次使用，我們對粒子計數器(PT+ Sensor)有了更深入的了解，比粒子計數器具有自動測量、全程監測、掌握操作變數、預了解子計數功能以外，附帶的溫溼度功能能夠適度提供環境溫濕度監測的數據，讓控管更加可靠且大幅上傳材料產量/成品/半成品等，可再性更穩定、QC為一段行政附公差。
                    </p>
                </MainContentContainer>
            </div>
        </section>
    );
}


