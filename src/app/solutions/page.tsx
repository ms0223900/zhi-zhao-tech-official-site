import Banner from "@/components/common/Banner";
import MainSection from "@/components/solutions/MainSection"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "解決方案 Solutions｜智兆科技",
    description: "解決方案根據客戶需求，提供客製化的工程整合與系統規劃解決方案，提升運營效率與品質，實現最佳化的工程成果。",
}

export default function SolutionsPage() {
    return (
        <main className="min-h-screen md:theme-gradient-blue">
            <BannerSection />
            <MainSection />
        </main>
    )
}

function BannerSection() {
    const title = "解決方案"
    const subtitle = "Solutions"
    const imageSrc = "/images/solutions-banner.jpg"
    return <Banner title={title} subtitle={subtitle} imageSrc={imageSrc} />
}