/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ProductCarousel } from './ProductCarousel';
import RwdComponent from '../common/RwdComponent';
import ServiceCarousel from '../common/CarouselWithNavList';
import { SpecificationTable, SpecificationItem } from './SpecificationTable';
import MainContentContainer from '../common/MainContentContainer';
import SectionTitle from './SectionTitle';
import ProductAdvantageCard from './ProductAdvantageCard';

const machineVisionProductImageList = [
    "/images/machine-vision/machine-vision-1.jpg",
    "/images/machine-vision/machine-vision-2.jpg",
    "/images/machine-vision/machine-vision-3.jpg",
    "/images/machine-vision/machine-vision-4.jpg",
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


const cameraSpecifications: SpecificationItem[] = [
    { label: "輸出格式", value: "RawRGB, RGB(RGB565/RGB555), GRB422, YUV(422/420), YCbCr(422), JPEG 數據" },
    { label: "輸出位寬", value: "8位" },
    { label: "輸出像素", value: "300萬" },
    { label: "分辨率", value: "2048*1564" },
    {
        label: "最大幀率", value: [
            "UXGA 15 幀/秒",
            "SVGA 30幀/秒",
            "CIF 60幀/秒"
        ]
    },
    { label: "傳感器尺寸", value: "1/4 英寸" },
    { label: "靈敏度", value: "0.6V/Lux-sec" },
    { label: "信噪比", value: "40dB" },
    { label: "動態範圍", value: "50dB" },
    { label: "鏡頭光圈", value: "F2.0" },
    { label: "鏡頭視角", value: "115°" },
    { label: "鏡頭焦距", value: "3.6mm" },
    { label: "鏡頭濾光片", value: "850nm, 感紅外濾光片" },
    { label: "工作溫度", value: "-30°C-70°C" },
];

export function MachineVisionContent() {
    return (
        <div className="container">
            <div className="flex flex-col gap-10">
                <section className="flex flex-col md:flex-row gap-8 mb-6">
                    <div className="w-full md:w-[420px] flex flex-col items-center gap-6">
                        <h1 className="text-center text-h1 text-[#044E7B] font-bold mb-4">機器視覺</h1>
                        <SpecificationTable
                            specifications={cameraSpecifications}
                            className="shadow-sm"
                        />
                    </div>
                    <div className="w-full md:w-[540px]">
                        <RwdComponent
                            mobileComponent={<ProductCarousel productImageList={machineVisionProductImageList} />}
                            desktopComponent={<ServiceCarousel imageList={machineVisionProductImageList} />}
                        />
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-center">適用範圍</h2>
                    <MainContentContainer className="py-6">
                        <RwdComponent
                            mobileComponent={<p className="whitespace-pre-line text-left md:px-[92px] leading-8 text-h4">
                                {` a. 判讀工廠基礎設施數值：讀取畫面來判定指針型或數字型液壓、氣壓計……等， 將圖型轉換為文字，24小時監視數值是否位於安全範圍內。

b. 監視設備重要參數，如電壓、電流值是否穩定輸出，可將影像轉換為文字，24小 時監視數值是否位於作業範圍內。

c. 監視關鍵製程或人員作業是否按SOP執行，比對機器或人員實際作業影像與標準流程是否一致。
                    `}
                            </p>}
                            desktopComponent={<p className="whitespace-pre-line text-left md:px-[92px] leading-8 text-h4">
                                {` a. 判讀工廠基礎設施數值：讀取畫面來判定指針型或數字型液壓、氣壓計……等， 將圖型轉換為文字，24小時監視數值是否位於安全範圍內。
b. 監視設備重要參數，如電壓、電流值是否穩定輸出，可將影像轉換為文字，24小 時監視數值是否位於作業範圍內。
c. 監視關鍵製程或人員作業是否按SOP執行，比對機器或人員實際作業影像與標準流程是否一致。
                    `}
                            </p>}
                        />
                    </MainContentContainer>
                </section>

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

                <section>
                    <div className="container">
                        <SectionTitle title="實際案例分享" />
                        <div className="flex flex-col gap-7 items-center">
                            <RwdComponent
                                mobileComponent={<></>}
                                desktopComponent={<h2 className="text-h2 font-regular text-center">適用範圍</h2>}
                            />
                            <button className="bg-transparent border-2 border border-blue-300 rounded-full py-2 px-[80px] text-center">
                                {"IQC進料檢驗"}
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                <div className="w-full">
                                    <img src="/images/particle-sensor/IQC-material-purchased-detection.jpg" alt="IQC進料檢驗" className="w-full rounded-md" />
                                </div>
                                <div className="flex flex-col w-full justify-center ">
                                    <MainContentContainer className="py-6">
                                        <ul className="space-y-2">
                                            <h4> 高速攝影辨識： </h4>
                                            <li className="flex items-start">
                                                <span className="mr-2">•</span>
                                                <span>組裝時間計算 流程管制</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2">•</span>
                                                <span>人員管控</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2">•</span>
                                                <span>開關步驟檢測</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2">•</span>
                                                <span>圖像轉文字 → 匯入excel → 生成管制圖</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2">•</span>
                                                <span>組裝元件檢測</span>
                                            </li>
                                        </ul>
                                    </MainContentContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
} 