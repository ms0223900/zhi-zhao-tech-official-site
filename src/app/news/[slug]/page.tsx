
async function getNewsArticle(slug: string) {
    console.log(slug)
    return {
        title: '測試',
    }
}

interface NewsArticleProps {
    params: Promise<{
        slug: string
    }>
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