import LinkCard from '@/components/common/LinkCard'
import { services } from '@/components/services/data'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "服務項目 Service｜智兆科技",
    description: "智兆科技以「熱誠、專業、團隊、誠信」為核心價值，提供完整的工程服務，包括無塵室設計、空調系統、製程管路與環保工程，從規劃到施工，滿足各產業高標準需求。",
}

const serviceList = [
    services['clean-room'],
    services['fire-engineering'],
    services['mechanical-electrical'],
    services['process-piping'],
    services['hvac'],
    services['duct'],
    services['civil'],
    services['steel'],
]

const ITEM_PER_ROW = 3;

export default function ServicesPage() {
    const getArrowColor = (index: number): string => {
        if (index < ITEM_PER_ROW) return "#1E88E5";
        if (index < ITEM_PER_ROW * 2) return "#E57B42";
        return "#EACA00";
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-12">服務項目</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[958px] mx-auto">
                {serviceList.map((service, i) => (
                    <LinkCard
                        key={service.id}
                        arrowColor={getArrowColor(i)}
                        link={`/services/${service.id}`}
                        image={service.imageList[0]}
                        title={service.title}
                        subtitle={service.subtitle}
                    />
                ))}
            </div>
        </div>
    )
}