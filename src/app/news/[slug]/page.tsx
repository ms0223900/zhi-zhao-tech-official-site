async function getNewsArticle(slug: string) {
    // TODO: 實作 API 串接
    console.log(slug)
    return {
        title: '測試',
    }
}

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
    const article = await getNewsArticle(params.slug)

    return (
        <main className="container mx-auto px-4 py-8">
            {/* 文章內容 */}
            {article?.title}
        </main>
    )
} 