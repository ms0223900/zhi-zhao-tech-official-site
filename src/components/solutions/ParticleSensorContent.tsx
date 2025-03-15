import React from 'react';
import { ProductCarousel } from './ProductCarousel';
import RwdComponent from '../common/RwdComponent';
import ServiceCarousel from '../common/CarouselWithNavList';

const particleSensorProductImageList = [
    "/images/particle-sensor/product-1.jpg",
    "/images/particle-sensor/product-2.jpg",
    "/images/particle-sensor/product-3.jpg",
]

export function ParticleSensorContent() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Particle Sensor Solution</h2>
            <RwdComponent
                mobileComponent={<ProductCarousel productImageList={particleSensorProductImageList} />}
                desktopComponent={<ServiceCarousel imageList={particleSensorProductImageList} />}
            />
            <p className="text-gray-600">
                This is the content specific to the Particle Sensor solution.
                {/* Add more content here */}
            </p>
        </div>
    );
} 