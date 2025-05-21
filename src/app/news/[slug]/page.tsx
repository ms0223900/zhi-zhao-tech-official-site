import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { fetchNewsArticle, GET_NEWS_SLUGS, NewsSlugsResponse } from '@/lib/graphql';
import { ArrowLeft } from 'lucide-react';
import { clientForServer } from '@/gql/client';
import { formatPageTitle } from '@/constants/metadata';

interface NewsArticleProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: NewsArticleProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await fetchNewsArticle(slug);

    if (!article) {
        return {
            title: formatPageTitle('找不到新聞'),
            description: '找不到您請求的新聞文章',
        };
    }

    return {
        title: formatPageTitle(article.title),
        description: article.content.replace(/\s+/g, ' ').trim(),
        openGraph: {
            title: article.title,
            description: article.subtitle,
            images: article.cover ? [{ url: article.cover.url }] : [],
        },
    };
}

const CustomMarkdownAnchorElement = ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const decodedHref = decodeURIComponent(href || '');
    const decodedChildren = typeof children === 'string' ? decodeURIComponent(children) : children;
    return (
        <a
            {...props}
            href={decodedHref}
            className="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
        >
            {decodedChildren}
        </a>
    );
};

export async function generateStaticParams() {
    try {
        const response = await clientForServer.query<NewsSlugsResponse>({
            query: GET_NEWS_SLUGS,
        });
        const slugs = response.data?.newses.map((item) => ({
            slug: item.documentId,
        }));
        return slugs;
    } catch (error) {
        console.error('Failed to generate static params:', error);
        return [];
    }
}

export default async function NewsArticlePage({ params }: NewsArticleProps) {
    const { slug } = await params;
    const article = await fetchNewsArticle(slug);

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
                            alt={article.title}
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
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        a: CustomMarkdownAnchorElement,
                    }}
                >
                    {article.content}
                </ReactMarkdown>
            </div>
        </main>
    );
} 