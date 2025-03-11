/* eslint-disable @next/next/no-img-element */

import { services } from '@/components/services/data'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ServiceCarousel from '@/components/services/ServiceCarousel'

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
            {/* Back button */}
            <Link
                href="/services"
                className="inline-flex items-center px-6 py-2 mb-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                回上一頁
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Content */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold">{service.title}</h1>
                    <p className="text-xl text-gray-600">{service.subtitle}</p>

                    <div className="border-2 border-gray-200 rounded-lg p-6">
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
                <div className="lg:pl-8">
                    <ServiceCarousel serviceImageList={service.imageList} />
                </div>
            </div>
        </div>
    )
} 