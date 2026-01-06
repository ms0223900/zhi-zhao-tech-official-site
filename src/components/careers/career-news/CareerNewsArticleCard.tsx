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
    <Link href={`/careers/career-news/${item.slug}`} className="group flex items-center gap-8">
      <div className="flex items-center gap-4 flex-shrink-0">
        <span className="text-xl text-[#afafaf] whitespace-nowrap">
          {formattedDate}
        </span>
      </div>

      <div className="flex items-center gap-4 py-4 transition-colors bg-white rounded-full p-8 shadow-lg">
        {/* 文章內容 */}
        <div className="flex-1 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
          {/* 標題 */}
          <h3 className="text-h3 font-medium text-[#282423] group-hover:text-[#088DDE] transition-colors flex-1 min-w-0">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

