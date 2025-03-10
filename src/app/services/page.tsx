import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: '服務項目 | 智兆科技',
    description: '智兆科技提供全方位工程服務，包括無塵室、塗裝、機電、製程管路等專業工程解決方案。',
}

const services = [
    {
        id: 'clean-room',
        title: '無塵室工程',
        description: '提供全方位無塵室設計、建造與維護服務，適用於半導體、光電及高科技產業。',
        image: '/images/services/clean-room.jpg',
    },
    {
        id: 'painting',
        title: '塗裝工程',
        description: '專精於表面處理與防腐塗裝，提供長效耐用的塗裝方案。',
        image: '/images/services/painting.jpg',
    },
    {
        id: 'mechanical-electrical',
        title: '機電工程',
        description: '從系統規劃到施工與維護，涵蓋機電設備安裝、配線工程等。',
        image: '/images/services/mechanical-electrical.jpg',
    },
    {
        id: 'process-piping',
        title: '製程管路工程',
        description: '設計與安裝高精度製程管路系統，包含氣體、真空及化學管路。',
        image: '/images/services/process-piping.jpg',
    },
    {
        id: 'hvac',
        title: '冷氣空調工程',
        description: '專業提供中央空調、工業冷卻系統的設計與安裝。',
        image: '/images/services/hvac.jpg',
    },
    {
        id: 'duct',
        title: '風管工程',
        description: '提供高效能的空氣分配與排氣系統設計，適用於無塵室、實驗室及商業空間。',
        image: '/images/services/duct.jpg',
    },
    {
        id: 'civil',
        title: '土建工程',
        description: '提供專業的建築與土木工程服務，從基礎設計到施工管理。',
        image: '/images/services/civil.jpg',
    },
    {
        id: 'steel',
        title: '鋼構工程',
        description: '專注於鋼結構的設計、製造與安裝，提供高強度、耐用的建築解決方案。',
        image: '/images/services/steel.jpg',
    },
    {
        id: 'waste-treatment',
        title: '廢水與廢氣處理工程',
        description: '設計與建置廢水及廢氣處理系統，涵蓋一般、酸鹼、有機及熱排氣。',
        image: '/images/services/waste-treatment.jpg',
    },
]

export default function ServicesPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-12">服務項目</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                    <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                            {/* Add actual images later */}
                            <div className="w-full h-full bg-gray-200" />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
} 