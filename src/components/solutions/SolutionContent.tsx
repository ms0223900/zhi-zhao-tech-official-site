import React, { useState } from 'react';
import { ParticleSensorContent } from './ParticleSensorContent';
import { MachineVisionContent } from './MachineVisionContent';

export function SolutionContent() {
    const [activeTab, setActiveTab] = useState<'particleSensor' | 'machineVision'>('particleSensor');

    return (
        <div className="space-y-4">
            <div className="flex space-x-4 border-b">
                <button
                    className={`px-4 py-2 ${activeTab === 'particleSensor' ? 'border-b-2 border-blue-500' : ''
                        }`}
                    onClick={() => setActiveTab('particleSensor')}
                >
                    Particle Sensor
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'machineVision' ? 'border-b-2 border-blue-500' : ''
                        }`}
                    onClick={() => setActiveTab('machineVision')}
                >
                    Machine Vision
                </button>
            </div>

            <div className="p-4">
                {activeTab === 'particleSensor' ? (
                    <ParticleSensorContent />
                ) : (
                    <MachineVisionContent />
                )}
            </div>
        </div>
    );
} 