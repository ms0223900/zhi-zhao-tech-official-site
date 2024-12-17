
async function getNewsArticle(slug: string) {
    const mockDataList = [
        {
            id: '1',
            title: '測試',
        },
        {
            id: '2',
            title: '測試2',
        },
    ]
    return mockDataList.find((item) => item.id === slug)
}

interface NewsArticleProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    return [{ slug: '1' }, { slug: '2' }]
}

export default async function NewsArticlePage({ params }: NewsArticleProps) {
    const { slug } = await params
    const article = await getNewsArticle(slug)

    return (
        <main className="container mx-auto px-4 py-8">
            {/* 文章內容 */}
            {article?.title}
        </main>
    )
} 