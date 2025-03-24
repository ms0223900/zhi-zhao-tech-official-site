/* eslint-disable @next/next/no-img-element */
import RwdComponent from "@/components/common/RwdComponent"
import { esgECarouselItems, esgSCarouselItems } from "@/components/esg/data"
import EnvironmentSection from "@/components/esg/EnvironmentSection"
import ESGSection from "@/components/esg/ESGSection"
import GovernanceSection from "@/components/esg/GovernanceSection"
import ImageCarousel from "@/components/esg/ImageCarousel"
import SocialSection from "@/components/esg/SocialSection"

export const metadata = {
    title: 'ESG',
    description: '企業永續發展',
}

export default function ESGPage() {
    return (
        <main className="mx-auto theme-gradient-blue" style={{ scrollBehavior: 'smooth' }}>
            <Banner />
            <ESGSection />
            <div className="flex flex-col gap-10">
                <EnvironmentSection />
                <RwdComponent
                    desktopComponent={<ImageCarousel carouselItems={esgECarouselItems} />}
                    mobileComponent={<></>}
                />
                <SocialSection />
                <RwdComponent
                    desktopComponent={<ImageCarousel
                        carouselItems={esgSCarouselItems}
                        dotActiveClassName="bg-[#E57B42]"
                    />}
                    mobileComponent={<></>}
                />
                <GovernanceSection />
            </div>
        </main>
    )
}

const Banner = () => {
    return (
        <section className="max-w-[1440px] mx-auto relative h-0 pt-[102%] md:pt-[60%] xl:pt-[600px] overflow-hidden">
            <div className="absolute inset-0">
                <RwdComponent
                    mobileComponent={<img src="/images/esg/esg-banner-mobile.png" alt="ESG" className="w-full h-full object-cover translate-y-[-30%]" />}
                    desktopComponent={<img src="/images/esg/esg-banner-desktop.png" alt="ESG" className="max-w-[130%] xl:max-w-[100%] translate-y-[-30%] translate-x-[-50px] xl:translate-x-0" />}
                />

            </div>

        </section>
    )
}