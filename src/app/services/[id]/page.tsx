/* eslint-disable @next/next/no-img-element */

import { services } from '@/components/services/data'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ServiceCarousel from '@/components/common/CarouselWithNavList'
import RwdComponent from '@/components/common/RwdComponent'

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const service = services[id as keyof typeof services]

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

export default async function ServicePage({ params }: Props) {
    const { id } = await params
    const service = services[id as keyof typeof services]

    if (!service) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-[960px]">
            {/* Back button */}
            <Link
                href="/services"
                className="inline-flex items-center px-6 py-2 mb-8 rounded-full bg-blue-500 transition-colors"
            >
                回上一頁
            </Link>
            <RwdComponent
                mobileComponent={
                    <div className='pb-9'>
                        <TitleSubtitle title={service.title} subtitle={service.subtitle} />
                    </div>
                }
                desktopComponent={<div />}
            />
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Content */}

                <div className="flex flex-col items-stretch justify-end gap-[48px] order-2 md:order-1">
                    <RwdComponent
                        mobileComponent={<div />}
                        desktopComponent={<TitleSubtitle title={service.title} subtitle={service.subtitle} />}
                    />

                    <div className="border-2 border-[#C5ECFF] rounded-lg p-8 min-h-[170px] bg-gradient-to-br from-[#FFFFFF] to-[#F8FDFF] shadow-[3.12px_9.37px_21.85px_rgba(0,0,0,0.06)]">
                        <div className="prose prose-lg max-w-none leading-[2] text-center">
                            {service.content.split('，').map((paragraph, index) => (
                                <p key={index}>
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
                {/* Right Content */}
                <div className="md:pl-8 order-1 md:order-2">
                    <ServiceCarousel imageList={service.imageList} />
                </div>
            </div>
        </div>
    )
}

function TitleSubtitle({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="flex flex-col gap-2 items-center justify-center">
            <h1 className="text-4xl font-bold text-[#044E7B]">{title}</h1>
            <p className="text-xl text-gray-400">{subtitle}</p>
        </div>
    )
}