'use client';

import Image from 'next/image';
import Link from 'next/link';
import { NewsItem } from '@/lib/graphql';
import { ArrowRight } from 'lucide-react';

interface NewsCardProps {
    item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
    // 格式化日期
    const formattedDate = new Date(item.publishedAt).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).replace(/\//g, '-');

    // 根據 newsGenre 決定標籤顏色
    const getCategoryBgColor = () => {
        if (!item.newsGenre) return 'bg-gray-500';

        switch (item.newsGenre.name.toLowerCase()) {
            case 'event':
                return 'bg-yellow-400';
            case 'news':
                return 'bg-orange-400';
            case 'other':
                return 'bg-blue-400';
            default:
                return 'bg-gray-400';
        }
    };

    return (
        <div className="group">
            <div className="flex flex-col h-full">
                <div className="relative mb-4">
                    {/* 新聞類別標籤 */}
                    <span className={`absolute top-4 left-4 px-4 py-1 text-sm font-medium uppercase z-10 ${getCategoryBgColor()}`}>
                        {item.newsGenre?.name || '其他'}
                    </span>

                    {/* 日期標籤 */}
                    <span className="absolute top-4 right-4 px-4 py-1 text-sm font-medium z-10 bg-white">
                        {formattedDate}
                    </span>

                    {/* 新聞封面圖 */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                        <Image
                            src={item.cover?.url || '/placeholder-image.jpg'}
                            alt={item.cover?.alternativeText || item.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </div>

                {/* 標題和內容 */}
                <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-500 mb-4 text-sm flex-grow">{item.subtitle}</p>

                    {/* 箭頭按鈕 */}
                    <Link href={`/news/${item.slug}`} className="flex items-center self-end mt-auto text-blue-500 group-hover:text-blue-700 transition-colors">
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
} 