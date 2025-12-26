'use client';

import { CareerNewsItem } from '@/lib/graphql';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/formatDate';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CareerNewsArticleCardProps {
  item: CareerNewsItem;
}

export function CareerNewsArticleCard({ item }: CareerNewsArticleCardProps) {
  const formattedDate = formatDate(item.publishedAt);

  return (
    <Link href={`/careers/career-news/${item.slug}`} className="group">
      <div className="flex items-center gap-4 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
        {/* 箭頭圖示 */}
        <ArrowRight className="w-4 h-7 text-[#55BBF9]" />

        {/* 文章內容 */}
        <div className="flex-1 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
          {/* 標題 */}
          <h3 className="text-h3 font-medium text-[#282423] group-hover:text-[#088DDE] transition-colors flex-1 min-w-0">
            {item.title}
          </h3>

          {/* 日期和標籤 */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* 日期 */}
            <span className="text-sm text-[#6E6E6E] whitespace-nowrap">
              {formattedDate}
            </span>

            {/* 標籤徽章 */}
            {item.newsGenre && (
              <div className="flex gap-2">
                <span
                  className={cn(
                    "px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap bg-[#55BBF9] text-white",
                    item.newsGenre.title === 'TOP'
                      ? 'bg-[#E57B42] text-white'
                      : 'bg-white border border-[#55BBF9] text-[#55BBF9]'
                  )}>
                  {item.newsGenre.title}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link >
  );
}

