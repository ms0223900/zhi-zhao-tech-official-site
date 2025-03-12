import Banner from "@/components/common/Banner"
import SolutionTabs from "@/components/common/SolutionTabs"

export const metadata = {
    title: '解決方案',
    description: '我們的解決方案',
}

export default function SolutionsPage() {
    return (
        <main className="min-h-screen">
            <BannerSection />
            <div className="container mx-auto px-4 py-8 max-w-[960px]">
                <TabsSection />
                <SolutionContent />
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

function TabsSection() {
    const solutionTabs = [
        { label: "Particle Sensor", href: "#particle-sensor" },
        { label: "機器視覺", href: "#machine-vision" },
    ]

    return (
        <div className="mb-12">
            <SolutionTabs tabs={solutionTabs} />
        </div>
    )
}

function SolutionContent() {
    return (
        <div className="space-y-16">
            {/* Particle Sensor Section */}
            <section id="particle-sensor" className="scroll-mt-20">
                <h2 className="text-3xl font-bold mb-6">Particle Sensor</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-lg mb-4">
                            我們的粒子傳感器解決方案提供高精度的環境監測能力，能夠檢測空氣中的微小顆粒物質，為工業和環境監測提供可靠數據。
                        </p>
                        <p className="text-lg mb-4">
                            這些傳感器採用先進的光散射技術，能夠實時監測 PM2.5、PM10 等顆粒物，並通過我們的智能系統進行數據分析和報告。
                        </p>
                    </div>
                    <div className="bg-gray-100 h-64 flex items-center justify-center">
                        <p className="text-gray-500">粒子傳感器圖片</p>
                    </div>
                </div>
            </section>

            {/* 機器視覺 Section */}
            <section id="machine-vision" className="scroll-mt-20">
                <h2 className="text-3xl font-bold mb-6">機器視覺</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-lg mb-4">
                            我們的機器視覺解決方案結合了先進的圖像處理技術和人工智能算法，為製造業、品質控制和自動化系統提供高效的視覺檢測能力。
                        </p>
                        <p className="text-lg mb-4">
                            這些系統能夠識別產品缺陷、進行尺寸測量、讀取條碼和文字，並與生產線無縫集成，提高生產效率和產品質量。
                        </p>
                    </div>
                    <div className="bg-gray-100 h-64 flex items-center justify-center">
                        <p className="text-gray-500">機器視覺系統圖片</p>
                    </div>
                </div>
            </section>
        </div>
    )
}