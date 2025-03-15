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

    return <div className="container mx-auto px-4 md:px-0 py-8 max-w-[960px]">
        <div className="mb-12">
            <SolutionTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={solutionTabs} />
        </div>
        {activeTab === 'particleSensor' ? (
            <ParticleSensorContent />
        ) : (
            <MachineVisionContent />
        )}
    </div>
}

export default MainSection