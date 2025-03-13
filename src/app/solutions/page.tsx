"use client"

import Banner from "@/components/common/Banner"
import SolutionTabs from "@/components/common/SolutionTabs"
import { MachineVisionContent } from "@/components/solutions/MachineVisionContent"
import { ParticleSensorContent } from "@/components/solutions/ParticleSensorContent"
import { useState } from "react"

// export const metadata = {
//     title: '解決方案',
//     description: '我們的解決方案',
// }

const solutionTabs = [
    { key: "particleSensor", label: "Particle Sensor", href: "#particle-sensor" },
    { key: "machineVision", label: "機器視覺", href: "#machine-vision" },
]

export default function SolutionsPage() {
    const [activeTab, setActiveTab] = useState("particleSensor")
    return (
        <main className="min-h-screen">
            <BannerSection />
            <div className="container mx-auto px-4 py-8 max-w-[960px]">
                <div className="mb-12">
                    <SolutionTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={solutionTabs} />
                </div>
                {activeTab === 'particleSensor' ? (
                    <ParticleSensorContent />
                ) : (
                    <MachineVisionContent />
                )}
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