import { mockCareerNewsData } from '@/components/careers/career-news/mockCareerNewsData';
import { formatPageTitle } from '@/constants/metadata';
import { formatDate } from '@/utils/formatDate';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface CareerNewsArticleProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CareerNewsArticleProps): Promise<Metadata> {
  const { slug } = await params;
  // 使用 mock 資料
  const article = mockCareerNewsData.find(item => item.slug === slug);

  // 原本的 fetchCareerNewsArticle（已註解）
  // TODO: 使用 GraphQL 查詢
  // const article = await fetchCareerNewsArticle(slug);

  if (!article) {
    return {
      title: formatPageTitle('找不到文章'),
      description: '找不到您請求的文章',
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

const CustomMarkdownAnchorElement = ({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
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
  // 使用 mock 資料生成靜態參數
  const slugs = mockCareerNewsData.map((item) => ({
    slug: item.slug,
  }));

  // TODO: 使用 GraphQL 查詢
  // try {
  //   const response = await clientForServer.query<CareerNewsSlugsResponse>({
  //     query: GET_CAREER_NEWS_SLUGS,
  //   });
  //   const slugs = response.data?.careerNewsArticles.map((item) => ({
  //     slug: item.documentId,
  //   }));
  //   return slugs;
  // } catch (error) {
  //   console.error('Failed to generate static params:', error);
  //   return [];
  // }

  return slugs;
}

export default async function CareerNewsArticlePage({ params }: CareerNewsArticleProps) {
  const { slug } = await params;
  // 使用 mock 資料
  const article = mockCareerNewsData.find(item => item.slug === slug);

  // TODO: 使用 GraphQL 查詢
  // const article = await fetchCareerNewsArticle(slug);

  if (!article) {
    notFound();
  }

  const formattedDate = formatDate(article.publishedAt);

  return (
    <main className="container mx-auto px-4 py-12">
      {/* 返回按鈕 */}
      <div className="mb-8">
        <Link
          href="/careers"
          className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>返回列表</span>
        </Link>
      </div>

      {/* 文章頭部 */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* 標籤徽章 */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`
                    px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap
                    ${tag.type === 'TOP'
                      ? 'bg-[#E57B42] text-white'
                      : 'bg-white border border-[#55BBF9] text-[#55BBF9]'
                    }
                  `}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}
          <span className="text-gray-500">{formattedDate}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        {article.subtitle && (
          <h2 className="text-2xl text-gray-600 mb-8">{article.subtitle}</h2>
        )}
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

