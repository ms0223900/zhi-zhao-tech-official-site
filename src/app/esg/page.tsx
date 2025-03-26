/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import RwdComponent from "@/components/common/RwdComponent"
import { certificateItem, esgECarouselItems, esgISO45001CarouselItems, esgSafetyCarouselItems, esgSCarouselItems } from "@/components/esg/data"
import EnvironmentSection from "@/components/esg/EnvironmentSection"
import ESGSection from "@/components/esg/ESGSection"
import GovernanceSection from "@/components/esg/GovernanceSection"
import ImageCarousel from "@/components/esg/ImageCarousel"
import SocialSection from "@/components/esg/SocialSection"
import { ProductCarousel } from "@/components/solutions/ProductCarousel"

export const metadata = {
    title: 'ESG',
    description: '企業永續發展',
}

export default function ESGPage() {
    return (
        <main className="relative mx-auto bg-gradient-to-r from-[#FFFFFF] md:to-[#55BBF9]/30 pb-12 overflow-hidden" style={{ scrollBehavior: 'smooth' }}>
            <Banner />
            <ESGSection />
            <div className="flex flex-col gap-10 relative z-10">
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
                <section id="requirements" className="container px-4 md:px-8">
                    <div className="flex flex-col gap-4 items-center px-2">
                        <h2 className="text-h2 leading-none font-black mb-2">落實工安需求</h2>
                        <hr className="w-full border-t border-gray-400" />
                        <RwdComponent
                            desktopComponent={
                                <p className="text-h4 text-xl max-w-[420px] text-center leading-[200%]">監工及工安人員依照規定每日工具箱宣導、工區巡檢及填寫工安日誌。</p>
                            }
                            mobileComponent={null}
                        />
                    </div>

                    <RwdComponent
                        desktopComponent={
                            <ImageCarousel
                                carouselItems={esgSafetyCarouselItems}
                                dotActiveClassName="bg-[#eaca00]"
                            />
                        }
                        mobileComponent={
                            <div className="flex flex-col gap-4 shadow-md rounded-md p-2 pt-8 bg-gradient-to-r from-[#FFFFFF] to-[#E0E0E0]">
                                <p className="text-h4 text-xl max-w-[420px] text-center leading-[200%]">監工及工安人員依照規定每日工具箱宣導、工區巡檢及填寫工安日誌。</p>
                                <ProductCarousel
                                    productImageList={esgSafetyCarouselItems.map(item => item.image)}
                                />
                            </div>
                        }
                    />
                </section>
                <section id="requirements" className="container px-4 flex flex-col gap-12">
                    <div className="flex flex-col gap-4 items-center px-2">
                        <h2 className="text-h2 leading-none font-black mb-2">ISO-45001執行</h2>
                        <hr className="w-full border-t border-gray-400" />
                        <RwdComponent
                            desktopComponent={
                                <p className="text-h4 text-xl max-w-[560px] text-center leading-[200%]">
                                    執行ISO-45001 程序,無塵室建置統包案,現場訪查輔導評鑑, 檢視智兆科技公司施工現場落實ISO-45001 程度。
                                </p>
                            }
                            mobileComponent={null}
                        />
                    </div>
                    <RwdComponent
                        desktopComponent={
                            <div className="flex flex-row gap-14">
                                <div className="md:w-1/3 xl:w-1/4">
                                    <Image
                                        src={certificateItem.image}
                                        alt="ISO-45001"
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover rounded-md object-left"
                                    />
                                </div>
                                <div className="md:w-2/3 xl:w-3/4">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row gap-4 items-center">
                                            <div className="md:w-1/2 xl:w-1/3">
                                                <h3 className="text-h3 leading-[250%] font-bold drop-shadow-md">{`智兆科技持續改善及提升品質、追求卓越\n致力於滿足顧客需求`}</h3>
                                            </div>
                                            <div className="md:w-2/3 xl:w-1/3 whitespace-pre-line text-[#A6A4A4]">
                                                <p className="text-h3 font-medium">{`2023.04\n通過ISO-45001認證`}</p>
                                                <p className="text-h3 font-medium">{`2023.06\n取得ISO-45001證書`}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            {esgISO45001CarouselItems.slice(1, 4).map((item) => (
                                                <div key={item.id}>
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        mobileComponent={
                            <div className="flex flex-col gap-4 shadow-md rounded-md p-2 pt-8 bg-gradient-to-r from-[#FFFFFF] to-[#E0E0E0]">
                                <p className="text-h4 text-xl max-w-[560px] text-center leading-[200%]">
                                    執行ISO-45001 程序,無塵室建置統包案,現場訪查輔導評鑑, 檢視智兆科技公司施工現場落實ISO-45001 程度。
                                </p>
                                <Image
                                    src={certificateItem.image}
                                    alt="ISO-45001"
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-cover rounded-md"
                                />
                                <div className="flex flex-col gap-1 items-center whitespace-pre-line py-6">
                                    <p className="text-h5 font-medium text-center">{`2023.04\n通過ISO-45001認證`}</p>
                                    <p className="text-h5 font-medium text-center">{`2023.06\n取得ISO-45001證書`}</p>
                                </div>
                                <ProductCarousel
                                    productImageList={esgISO45001CarouselItems.slice(1).map(item => item.image)}
                                />
                                <h3 className="text-h3 leading-[250%] font-bold drop-shadow-md text-center max-w-[200px] mx-auto">{`智兆科技持續改善及提升品質、追求卓越\n致力於滿足顧客需求`}</h3>
                            </div>
                        }
                    />
                </section>
            </div>
            <RwdComponent
                desktopComponent={
                    <>
                        <img src="/images/esg/esg-bg-circle-1.svg" alt="ESG" className="w-[580px] h-auto object-cover rounded-md absolute top-[1200px] left-[-200px]" />
                        <img src="/images/esg/esg-bg-circle-2.svg" alt="ESG" className="w-[1000px] h-auto object-cover rounded-md absolute top-[1800px] right-[-500px]" />
                        <img src="/images/esg/esg-bg-circle-3.svg" alt="ESG" className="w-[224px] h-auto object-cover rounded-md absolute top-[2400px] left-[-60px]" />
                    </>
                }
                mobileComponent={<></>}
            />
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