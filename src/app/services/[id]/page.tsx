import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const services = {
    'clean-room': {
        title: '無塵室工程',
        subtitle: '提供全方位無塵室設計、建造與維護服務',
        content: '提供全方位無塵室設計、建造與維護服務，適用於半導體、光電及高科技產業，確保高潔淨度與穩定的製程環境。',
        image: '/images/services/clean-room.jpg',
    },
    'painting': {
        title: '塗裝工程',
        subtitle: '專精於表面處理與防腐塗裝',
        content: '專精於表面處理與防腐塗裝，提供長效耐用的塗裝方案，有效保護設備和建築結構，提升使用壽命。',
        image: '/images/services/painting.jpg',
    },
    'mechanical-electrical': {
        title: '機電工程',
        subtitle: '從系統規劃到施工與維護的全方位服務',
        content: '從系統規劃到施工與維護，涵蓋機電設備安裝、配線工程等，助力打造高效運作的智慧建築與設施。',
        image: '/images/services/mechanical-electrical.jpg',
    },
    'process-piping': {
        title: '製程管路工程',
        subtitle: '高精度製程管路系統的專業服務',
        content: '設計與安裝高精度製程管路系統，包含氣體、真空及化學管路，確保高科技產業的穩定運作與生產需求。',
        image: '/images/services/process-piping.jpg',
    },
    'hvac': {
        title: '冷氣空調工程',
        subtitle: '專業的空調系統設計與安裝',
        content: '專業提供中央空調、工業冷卻系統的設計與安裝，確保良好的空調效能與節能表現。',
        image: '/images/services/hvac.jpg',
    },
    'duct': {
        title: '風管工程',
        subtitle: '高效能的空氣分配與排氣系統',
        content: '提供高效能的空氣分配與排氣系統設計，適用於無塵室、實驗室及商業空間，滿足空氣品質與能源效率需求。',
        image: '/images/services/duct.jpg',
    },
    'civil': {
        title: '土建工程',
        subtitle: '專業的建築與土木工程服務',
        content: '提供專業的建築與土木工程服務，從基礎設計到施工管理，保證建築結構的安全與穩定。',
        image: '/images/services/civil.jpg',
    },
    'steel': {
        title: '鋼構工程',
        subtitle: '專注於鋼結構的設計與施工',
        content: '專注於鋼結構的設計、製造與安裝，提供高強度、耐用的建築解決方案，適用於工業廠房與大型建築物。',
        image: '/images/services/steel.jpg',
    },
    'waste-treatment': {
        title: '廢水與廢氣處理工程',
        subtitle: '環保處理系統的專業規劃與建置',
        content: '設計與建置廢水及廢氣處理系統，涵蓋一般、酸鹼、有機及熱排氣，實現環保法規要求與永續經營目標。',
        image: '/images/services/waste-treatment.jpg',
    },
}

type Props = {
    params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const service = services[params.id as keyof typeof services]

    if (!service) {
        return {
            title: '服務項目 | 智兆科技',
        }
    }

    return {
        title: `${service.title} | 智兆科技`,
        description: service.subtitle,
    }
}

export async function generateStaticParams() {
    return Object.keys(services).map((id) => ({ id }))
}

export default function ServicePage({ params }: Props) {
    const service = services[params.id as keyof typeof services]

    if (!service) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-16">
            {/* 上一頁 */}
            <Link href="/services" className="inline-block mb-4">
                上一頁
            </Link>

            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
                <p className="text-xl text-gray-600 mb-8">{service.subtitle}</p>

                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-8">
                    {/* Add actual images later */}
                    <div className="w-full h-full bg-gray-200" />
                </div>

                <div className="prose prose-lg max-w-none">
                    {service.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">
                            {paragraph.split('\n').map((line, lineIndex) => (
                                <span key={lineIndex}>
                                    {line}
                                    {lineIndex < paragraph.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
} 