'use client';

import { CareerNewsItem } from '@/lib/graphql';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';

interface CareerNewsArticleCardProps {
  item: CareerNewsItem;
}

export function CareerNewsArticleCard({ item }: CareerNewsArticleCardProps) {
  const formattedDate = formatDate(item.publishedAt);

  return (
    <Link href={`/careers/career-news/${item.slug}`} className="group flex items-center gap-[38px]">
      <div className="flex items-center gap-4 flex-shrink-0">
        <span className="text-xl font-medium tracking-widest text-[#A29C9C] whitespace-nowrap">
          {formattedDate}
        </span>
      </div>

      <div className="w-full flex items-center gap-4 py-6 transition-colors bg-white rounded-full p-8">
        {/* 文章內容 */}
        <div className="flex-1 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
          {/* 標題 */}
          <h3 className="text-h3 font-medium text-[#000000] group-hover:text-[#088DDE] transition-colors flex-1 min-w-0 line-clamp-1">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

