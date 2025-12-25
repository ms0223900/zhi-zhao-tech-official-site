'use client';

import { CareerNewsItem } from '@/lib/graphql';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { CareerNewsArticleCard } from './CareerNewsArticleCard';
import { CareerNewsPagination } from './CareerNewsPagination';
import { mockCareerNewsData } from './mockCareerNewsData';

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

const DEFAULT_ITEMS_PER_PAGE = 3;
const ITEMS_PER_PAGE_OPTIONS = [3, 6, 9, 12];

function CareerNewsListContent() {
  // 使用假資料
  const data = mockCareerNewsData;
  const isFetching = false;

  // 原本的 useQuery 查詢（已註解）
  // const { data, isFetching } = useQuery({
  //   queryKey: ['careerNews'],
  //   queryFn: () => fetchCareerNewsList(),
  // });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  // 分頁邏輯
  const paginatedList = useMemo(
    () => new PaginatedList<CareerNewsItem>(data || [], currentPage, itemsPerPage),
    [data, currentPage, itemsPerPage]
  );

  const displayedArticles = paginatedList.paginatedItems;
  const totalPages = paginatedList.totalPages;
  const totalItems = data?.length || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滾動到列表頂部，提供更好的用戶體驗
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    // 重新計算當前頁碼：如果當前頁超出範圍，調整到最後一頁
    const newTotalPages = Math.ceil((data?.length || 0) / newItemsPerPage);
    const adjustedPage = currentPage > newTotalPages ? newTotalPages : currentPage;
    setCurrentPage(adjustedPage > 0 ? adjustedPage : 1);
    // 滾動到列表頂部
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
      {/* 標題欄 - 淺藍色背景 */}
      <div className="bg-[#55BBF9]/30 py-4 px-4 md:px-8 w-full flex flex-row items-center gap-2">
        <h2 className="text-h2 font-bold text-[#282423]">我們的日常</h2>
        <span className="text-h6 text-[#706F6F]">Career News</span>
      </div>

      {/* 文章列表 */}
      <div className="w-full px-4 md:px-8 py-8">
        <div className="w-full">
          {displayedArticles.map((article) => (
            <CareerNewsArticleCard key={article.id} item={article} />
          ))}
        </div>
      </div>

      {/* 分頁控制 */}
      <CareerNewsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
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

