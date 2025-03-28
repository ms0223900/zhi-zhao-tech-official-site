import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { graphQLClient, GET_NEWS_ARTICLE, GET_NEWS_SLUGS } from '@/lib/graphql';
import { ArrowLeft } from 'lucide-react';

interface NewsArticleResponse {
    newsArticles: {
        data: Array<{
            id: string;
            attributes: {
                title: string;
                subtitle: string;
                content: string;
                publishedAt: string;
                slug: string;
                cover?: {
                    data?: {
                        attributes: {
                            url: string;
                            alternativeText?: string;
                            width?: number;
                            height?: number;
                        }
                    }
                };
                newsGenre?: {
                    data?: {
                        attributes: {
                            name: string;
                        }
                    }
                };
            };
        }>;
    };
}

interface NewsSlugsResponse {
    newsArticles: {
        data: Array<{
            attributes: {
                slug: string;
            };
        }>;
    };
}

async function getNewsArticle(slug: string) {
    try {
        const response = await graphQLClient.request<NewsArticleResponse>(GET_NEWS_ARTICLE, { slug });
        const article = response.newsArticles.data[0];

        if (!article) {
            return null;
        }

        return {
            id: article.id,
            title: article.attributes.title,
            subtitle: article.attributes.subtitle,
            content: article.attributes.content,
            publishedAt: article.attributes.publishedAt,
            slug: article.attributes.slug,
            cover: article.attributes.cover?.data?.attributes ? {
                url: article.attributes.cover.data.attributes.url,
                alternativeText: article.attributes.cover.data.attributes.alternativeText || '',
                width: article.attributes.cover.data.attributes.width,
                height: article.attributes.cover.data.attributes.height,
            } : null,
            newsGenre: article.attributes.newsGenre?.data?.attributes ? {
                name: article.attributes.newsGenre.data.attributes.name
            } : null
        };
    } catch (error) {
        console.error('Failed to fetch news article:', error);
        return null;
    }
}

interface NewsArticleProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: NewsArticleProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getNewsArticle(slug);

    if (!article) {
        return {
            title: '找不到新聞 | 智昭科技',
            description: '找不到您請求的新聞文章',
        };
    }

    return {
        title: `${article.title} | 智昭科技`,
        description: article.subtitle,
        openGraph: {
            title: article.title,
            description: article.subtitle,
            images: article.cover ? [{ url: article.cover.url }] : [],
        },
    };
}

export async function generateStaticParams() {
    try {
        const response = await graphQLClient.request<NewsSlugsResponse>(GET_NEWS_SLUGS);
        const slugs = response.newsArticles.data.map((item) => ({
            slug: item.attributes.slug,
        }));
        return slugs;
    } catch (error) {
        console.error('Failed to generate static params:', error);
        return [];
    }
}

export default async function NewsArticlePage({ params }: NewsArticleProps) {
    const { slug } = await params;
    const article = await getNewsArticle(slug);

    if (!article) {
        notFound();
    }

    // 格式化日期
    const formattedDate = new Date(article.publishedAt).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).replace(/\//g, '-');

    return (
        <main className="container mx-auto px-4 py-12">
            {/* 返回按鈕 */}
            <div className="mb-8">
                <Link
                    href="/news"
                    className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span>返回列表</span>
                </Link>
            </div>

            {/* 文章頭部 */}
            <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    {article.newsGenre && (
                        <span className="px-4 py-1 bg-blue-500 text-white text-sm uppercase">
                            {article.newsGenre.name}
                        </span>
                    )}
                    <span className="text-gray-500">{formattedDate}</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
                <h2 className="text-2xl text-gray-600 mb-8">{article.subtitle}</h2>
            </div>

            {/* 封面圖片 */}
            {article.cover && (
                <div className="mb-12 relative">
                    <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] overflow-hidden rounded-lg">
                        <Image
                            src={article.cover.url}
                            alt={article.cover.alternativeText}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                        />
                    </div>
                </div>
            )}

            {/* 文章內容 - Markdown 格式 */}
            <div className="prose prose-lg max-w-4xl mx-auto">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {article.content}
                </ReactMarkdown>
            </div>
        </main>
    );
} 