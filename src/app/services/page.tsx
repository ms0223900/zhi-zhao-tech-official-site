import Link from 'next/link'
import { Metadata } from 'next'
import { services } from '@/components/services/data'
import Image from 'next/image'
export const metadata: Metadata = {
    title: '服務項目 | 智兆科技',
    description: '智兆科技提供全方位工程服務，包括無塵室、塗裝、機電、製程管路等專業工程解決方案。',
}

import ArrowRight from './icon-arrow-right.svg'

const serviceList = [
    services['clean-room'],
    services['fire-engineering'],
    services['mechanical-electrical'],
    services['process-piping'],
    services['hvac'],
    services['duct'],
    services['civil'],
    services['steel'],
    services['waste-treatment'],
]

export default function ServicesPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-12">服務項目</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[958px] mx-auto">
                {serviceList.map((service, i) => (
                    <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="aspect-w-16 aspect-h-14 bg-gray-100 h-[230px] overflow-hidden">
                            <Image
                                src={service.imageList[0]}
                                alt={service.title}
                                width={268}
                                height={230}
                                className="w-full h-full min-h-[230px] object-cover rounded-md"
                            />
                        </div>
                        <div className="p-4 py-3 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-[#9D9D9D]">{service.subtitle}</p>
                            </div>
                            <div>
                                <ArrowRight width={22} fill={
                                    i < 2 ? "#1E88E5" : (
                                        i < 5 ? "#E57B42" : (
                                            "#EACA00"
                                        )
                                    )
                                } />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
} 