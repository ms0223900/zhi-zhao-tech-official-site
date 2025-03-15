"use client"

import { useState } from "react"
import { ParticleSensorContent } from "./ParticleSensorContent"
import SolutionTabs from "../common/SolutionTabs"
import { MachineVisionContent } from "./MachineVisionContent"

const solutionTabs = [
    { key: "particleSensor", label: "Particle Sensor", href: "#particle-sensor" },
    { key: "machineVision", label: "機器視覺", href: "#machine-vision" },
]

const MainSection = () => {
    const [activeTab, setActiveTab] = useState("particleSensor")

    return (
        <div>
            <h2 className="text-center text-h1 text-[#044E7B] pt-[30px] pb-6 font-bold mb-4 border-b border-[#044E7B] max-w-[732px] mx-auto">智能系統應用</h2>
            <div className="py-11 max-w-[960px] mx-auto">
                <SolutionTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={solutionTabs} />
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

export default MainSection