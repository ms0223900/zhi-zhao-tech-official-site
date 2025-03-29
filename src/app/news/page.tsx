import { NewsClient } from '@/components/news/NewsClient';
import { fetchNewsList } from '@/lib/graphql';

export default async function NewsPage() {
    const news = await fetchNewsList();

    return (
        <main className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-2">最新消息</h1>
                <p className="text-xl text-gray-600 uppercase tracking-wider">News</p>
            </div>

            <NewsClient news={news} />
        </main>
    );
} 