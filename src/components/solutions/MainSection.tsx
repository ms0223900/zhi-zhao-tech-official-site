"use client"

import { useState } from "react"
import { ParticleSensorContent } from "./ParticleSensorContent"
import SolutionTabs from "../common/SolutionTabs"
import { MachineVisionContent } from "./MachineVisionContent"
import { cn } from "@/utils/cn"

const solutionTabs = [
    { key: "particleSensor", label: "Particle Sensor", href: "#particle-sensor" },
    { key: "machineVision", label: "機器視覺", href: "#machine-vision" },
]

const MainSection = () => {
    const [activeTab, setActiveTab] = useState("particleSensor")

    return (
        <div>
            <SectionTitle className="text-[#044E7B]" title="智能系統應用" />
            <div className="py-11 max-w-[960px] mx-auto">
                <SolutionTabs onTabChange={setActiveTab} tabs={solutionTabs} />
            </div>
            <div className="container mx-auto px-4 md:px-0 py-8 max-w-[960px] ">
                {activeTab === 'particleSensor' ? (
                    <ParticleSensorContent />
                ) : (
                    <MachineVisionContent />
                )}
            </div></div>
    )
}

function SectionTitle({ title, className }: { title: string, className?: string }) {
    return (
        <h2 className={cn("text-center text-h1 pt-[30px] pb-6 font-bold mb-4 border-b border-[#044E7B] max-w-[732px] mx-auto", className)}>{title}</h2>
    )
}

export default MainSection