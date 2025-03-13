import React from 'react';
import { ProductCarousel } from './ProductCarousel';

const particleSensorProductImageList = [
    "/images/particle-sensor/product-1.jpg",
    "/images/particle-sensor/product-2.jpg",
    "/images/particle-sensor/product-3.jpg",
]

export function ParticleSensorContent() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Particle Sensor Solution</h2>
            <ProductCarousel productImageList={particleSensorProductImageList} />
            <p className="text-gray-600">
                This is the content specific to the Particle Sensor solution.
                {/* Add more content here */}
            </p>
        </div>
    );
} 