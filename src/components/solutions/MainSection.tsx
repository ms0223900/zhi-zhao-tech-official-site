"use client"

import { useState } from "react"
import { ParticleSensorContent } from "./ParticleSensorContent"
import SolutionTabs from "../common/SolutionTabs"
import { MachineVisionContent } from "./MachineVisionContent"
import SectionTitle from "./SectionTitle"

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
            <div className="mx-auto px-4 md:px-0 py-8">
                {activeTab === 'particleSensor' ? (
                    <ParticleSensorContent />
                ) : (
                    <MachineVisionContent />
                )}
            </div></div>
    )
}

export default MainSection