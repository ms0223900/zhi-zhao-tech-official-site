import React from 'react';
import { ProductCarousel } from './ProductCarousel';
import RwdComponent from '../common/RwdComponent';
import ServiceCarousel from '../common/CarouselWithNavList';
import { SpecificationTable, SpecificationItem } from './SpecificationTable';

const machineVisionProductImageList = [
    "/images/machine-vision/machine-vision-1.jpg",
    "/images/machine-vision/machine-vision-2.jpg",
    "/images/machine-vision/machine-vision-3.jpg",
    "/images/machine-vision/machine-vision-4.jpg",
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
        <div>
            <h2 className="text-2xl font-bold mb-4">機器視覺</h2>

            <div className="flex flex-col md:flex-row gap-8 mb-6">
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
            </div>
        </div>
    );
} 