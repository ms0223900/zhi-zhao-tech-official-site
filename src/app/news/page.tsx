import { graphQLClient, GET_NEWS_LIST, NewsItem } from '@/lib/graphql';
import { NewsCard } from '@/components/news/NewsCard';

// 定義 GraphQL 響應類型
interface NewsArticlesResponse {
    newses: {
        documentId: string;
        title: string;
        subtitle: string;
        content: string;
        publishedAt: string;
        cover: {
            documentId: string;
            url: string;
        };
        newsGenre: {
            title: string;
        };
    }[];
}


async function getNewsList() {
    try {
        const response = await graphQLClient.request<NewsArticlesResponse>(GET_NEWS_LIST);
        const { newses } = response;

        // 處理 Strapi 返回的資料結構
        return newses.map((item) => ({
            id: item.documentId,
            title: item.title,
            subtitle: item.subtitle,
            publishedAt: item.publishedAt,
            cover: item.cover?.url ? {
                url: item.cover.url,
            } : null,
            newsGenre: item.newsGenre?.title ? {
                id: item.newsGenre.title,
                name: item.newsGenre.title
            } : null
        })) as NewsItem[];
    } catch (error) {
        console.error('Failed to fetch news list:', error);
        return [];
    }
}

export default async function NewsPage() {
    const news = await getNewsList();

    return (
        <main className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-2">最新消息</h1>
                <p className="text-xl text-gray-600 uppercase tracking-wider">News</p>
            </div>

            {/* 分類選擇器 */}
            <div className="mb-8 flex justify-center">
                <div className="relative inline-block">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>全部</option>
                        <option>EVENT</option>
                        <option>NEWS</option>
                        <option>OTHER</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* 新聞卡片網格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                    <NewsCard key={item.id} item={item} />
                ))}
            </div>

            {/* 沒有新聞時顯示 */}
            {news.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-500">目前沒有新聞</p>
                </div>
            )}
        </main>
    );
} 