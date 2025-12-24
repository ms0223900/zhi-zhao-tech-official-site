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
    <Link href={`/careers/career-news/${item.slug}`} className="group">
      <div className="flex items-center gap-4 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
        {/* 箭頭圖示 */}
        <div className="flex-shrink-0">
          <svg
            viewBox="0 0 15 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-7"
          >
            <path
              d="M2 26.2358L13.0482 14.0001L2 1.7644"
              stroke="#55BBF9"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

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
            {item.tags && item.tags?.length > 0 && (
              <div className="flex gap-2">
                {item.tags?.map((tag, index) => (
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
          </div>
        </div>
      </div>
    </Link>
  );
}

