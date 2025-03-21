/* eslint-disable @next/next/no-img-element */
import RwdComponent from "@/components/common/RwdComponent"

export const metadata = {
    title: 'ESG',
    description: '企業永續發展',
}

export default function ESGPage() {
    return (
        <main className="mx-auto">
            {/* 靜態圖文內容區域 */}
            <Banner />
        </main>
    )
}


// custom banner
const Banner = () => {
    return (
        <section className="container relative h-0 pt-[60%] overflow-hidden">
            <div className="absolute inset-0">
                <RwdComponent
                    mobileComponent={<img src="/images/esg/esg-banner-mobile.png" alt="ESG" className="w-full h-full object-cover" />}
                    desktopComponent={<img src="/images/esg/esg-banner-desktop.png" alt="ESG" className="w-[130%]  max-w-[300%]  translate-y-[-30%]" />}
                />
            </div>
            <div className="relative h-full flex flex-col items-center justify-center text-center">
                <h1 className="text-white text-5xl font-bold mb-4">ESG</h1>
                <p className="text-white text-xl">企業永續發展</p>
            </div>
        </section>
    )
}