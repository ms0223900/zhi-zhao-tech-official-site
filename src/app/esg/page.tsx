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
        <section className="max-w-[1440px] mx-auto relative h-0 pt-[60%] overflow-hidden">
            <div className="absolute inset-0">
                <RwdComponent
                    mobileComponent={<img src="/images/esg/esg-banner-mobile.png" alt="ESG" className="w-full h-full object-cover" />}
                    desktopComponent={<img src="/images/esg/esg-banner-desktop.png" alt="ESG" className="max-w-[130%] xl:max-w-[100%] translate-y-[-30%] translate-x-[-50px] xl:translate-x-0" />}
                />

            </div>

        </section>
    )
}