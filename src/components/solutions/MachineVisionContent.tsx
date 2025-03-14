import React from 'react';
import { ProductCarousel } from './ProductCarousel';

const machineVisionProductImageList = [
    "/images/machine-vision/machine-vision-1.jpg",
    "/images/machine-vision/machine-vision-2.jpg",
    "/images/machine-vision/machine-vision-3.jpg",
    "/images/machine-vision/machine-vision-4.jpg",
]

export function MachineVisionContent() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Machine Vision Solution</h2>
            <ProductCarousel productImageList={machineVisionProductImageList} />
            <p className="text-gray-600">
                This is the content specific to the Machine Vision solution.
                {/* Add more content here */}
            </p>
        </div>
    );
} 