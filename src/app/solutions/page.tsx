import Banner from "@/components/common/Banner"

export const metadata = {
    title: '解決方案',
    description: '我們的解決方案',
}

export default function SolutionsPage() {
    return (
        <main className="min-h-screen">
            <BannerSection />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">解決方案</h1>
            </div>
        </main>
    )
}

function BannerSection() {
    const title = "解決方案"
    const subtitle = "Solutions"
    const imageSrc = "/images/solutions-banner.jpg"
    return <Banner title={title} subtitle={subtitle} imageSrc={imageSrc} />
}