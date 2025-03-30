import { NewsClient } from '@/components/news/NewsClient';
import { fetchNewsList } from '@/lib/graphql';

export default async function NewsPage() {
    const news = await fetchNewsList();

    return (
        <main className="container mx-auto px-4 py-12 min-h-screen">
            <NewsClient news={news} />
        </main>
    );
} 