import { services } from '@/components/services/data'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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