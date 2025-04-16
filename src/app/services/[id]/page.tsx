/* eslint-disable @next/next/no-img-element */

import { services } from '@/components/services/data'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ServiceCarousel from '@/components/common/CarouselWithNavList'
import RwdComponent from '@/components/common/RwdComponent'
import MainContentContainer from '@/components/common/MainContentContainer'
import BackButton from '@/components/common/BackButton'
import RelatedProjects from '@/components/services/RelatedProjects'
import { formatPageTitle } from '@/constants/metadata'

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const service = services[id as keyof typeof services]

    if (!service) {
        return {
            title: formatPageTitle('服務項目'),
        }
    }

    return {
        title: formatPageTitle(service.title),
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
            <BackButton />
            <RwdComponent
                mobileComponent={
                    <div className='pb-9'>
                        <TitleSubtitle title={service.title} subtitle={service.subtitle} />
                    </div>
                }
                desktopComponent={<div />}
            />
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col items-stretch justify-end gap-[48px] order-2 md:order-1">
                    <RwdComponent
                        mobileComponent={<div />}
                        desktopComponent={<TitleSubtitle title={service.title} subtitle={service.subtitle} />}
                    />

                    <MainContentContainer className="min-h-[170px]">
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
                    </MainContentContainer>
                </div>
                {/* Right Content */}
                <div className="md:pl-8 order-1 md:order-2">
                    <ServiceCarousel imageList={service.imageList} />
                </div>
            </div>
            <section>
                <RelatedProjects slug={id} />
            </section>
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