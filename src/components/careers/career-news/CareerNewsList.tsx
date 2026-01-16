'use client';

import { CareerNewsItem, fetchCareerNewsList } from '@/lib/graphql';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { CareerNewsArticleCard } from './CareerNewsArticleCard';
import { CareerNewsPagination } from './CareerNewsPagination';

// 分頁工具類
class PaginatedList<T> {
  constructor(
    private readonly items: T[],
    private readonly currentPage: number,
    private readonly itemsPerPage: number,
  ) { }

  get paginatedItems(): T[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.items.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }
}

const DEFAULT_ITEMS_PER_PAGE = 4;

function CareerNewsListContent() {
  // 使用假資料
  // const data = mockCareerNewsData;
  // const isFetching = false;

  const { data, isFetching } = useQuery({
    queryKey: ['careerNews'],
    queryFn: () => fetchCareerNewsList(),
  });

  const [currentPage, setCurrentPage] = useState(1);

  // 分頁邏輯
  const paginatedList = useMemo(
    () => new PaginatedList<CareerNewsItem>(data || [], currentPage, DEFAULT_ITEMS_PER_PAGE),
    [data, currentPage]
  );

  const displayedArticles = paginatedList.paginatedItems;
  const totalPages = paginatedList.totalPages;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滾動到列表頂部，提供更好的用戶體驗
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-gray-600">載入中...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">目前沒有文章</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="px-4 md:px-8 w-full flex flex-row items-center gap-4">
        <img src="/taiwanz2-favicon.ico" alt="Team Daily" className="h-10 flex-shrink-0" />
        <h2 className="text-h2 font-bold text-[#282423] flex-shrink-0">智兆日常</h2>
        <span className="text-[12px] tracking-widest text-[#706F6F] flex-shrink-0">Team Daily</span>
        <hr className="w-full border-t mr-4 border-[#088DDE]" />
      </div>

      <div className="h-[30px] w-full" />

      {/* 文章列表 */}
      <div className="w-full px-4 md:px-8">
        <div className="w-full flex flex-col gap-3">
          {displayedArticles.map((article) => (
            <CareerNewsArticleCard key={article.id} item={article} />
          ))}
        </div>
      </div>

      <div className="h-[64px] w-full" />

      {/* 分頁控制 */}
      <CareerNewsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export function CareerNewsList() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <CareerNewsListContent />
    </QueryClientProvider>
  );
}

