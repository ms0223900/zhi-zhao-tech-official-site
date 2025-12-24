'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CareerNewsArticleCard } from './CareerNewsArticleCard';
import { mockCareerNewsData } from './mockCareerNewsData';

function CareerNewsListContent() {
  // 使用假資料
  const data = mockCareerNewsData;
  const isFetching = false;

  // 原本的 useQuery 查詢（已註解）
  // const { data, isFetching } = useQuery({
  //   queryKey: ['careerNews'],
  //   queryFn: () => fetchCareerNewsList(),
  // });

  // 根據第一個使用者故事，只顯示前 3 篇文章
  const displayedArticles = data?.slice(0, 3) || [];

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
        <span className="text-h6 text-[#706F6F]">Team Daily</span>
      </div>

      {/* 文章列表 */}
      <div className="w-full px-4 md:px-8 py-8">
        <div className="w-full">
          {displayedArticles.map((article) => (
            <CareerNewsArticleCard key={article.id} item={article} />
          ))}
        </div>
      </div>
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

