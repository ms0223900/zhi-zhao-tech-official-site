
import Banner from "@/components/common/Banner";
import MainSection from "@/components/solutions/MainSection"

export const metadata = {
    title: '解決方案',
    description: '智兆的解決方案',
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