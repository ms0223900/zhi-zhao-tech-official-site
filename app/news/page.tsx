async function getNewsList() {
    // TODO: 實作 API 串接
    return []
}

export default async function NewsPage() {
    const news = await getNewsList()

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">最新消息</h1>
            <div className="space-y-6">
                {news.map(() => (
                    // 新聞列表項目
                    <></>
                ))}
            </div>
        </main>
    )
} 