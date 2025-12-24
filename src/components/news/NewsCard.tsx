'use client';

import { NewsItem } from '@/lib/graphql';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';
import LinkCard from '../common/LinkCard';

interface NewsCardProps {
    item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
    const formattedDate = formatDate(item.publishedAt);

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
        <Link href={`/news/${item.slug}`} className="group">
            <div className="flex flex-col w-full gap-2">
                <div className="flex justify-between w-full">
                    <span className={`top-4 left-4 px-4 text-white font-bold py-1 text-sm uppercase z-10 rounded-md ${getCategoryBgColor()}`}>
                        {item.newsGenre?.name || '其他'}
                    </span>

                    {/* 日期標籤 */}
                    <span className="top-4 right-4 py-1 text-sm font-medium z-10 tracking-widest">
                        {formattedDate}
                    </span>
                </div>
                <LinkCard
                    link={`/news/${item.slug}`}
                    image={item.cover.url}
                    title={item.title}
                    subtitle={item.subtitle}
                />
            </div>
        </Link>
    );
} 