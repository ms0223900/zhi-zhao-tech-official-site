'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PaginationControls } from './PaginationControls';

// 分頁計算相關常數
const MAX_VISIBLE_PAGES_WITHOUT_ELLIPSIS = 7;
const PAGES_BEFORE_ELLIPSIS_WHEN_NEAR_START = 4;
const PAGES_TO_SHOW_WHEN_NEAR_START = 5;
const PAGES_FROM_END_TO_TRIGGER_END_MODE = 3;
const PAGES_TO_SHOW_WHEN_NEAR_END = 5;
const PAGES_AROUND_CURRENT = 2;

interface CareerNewsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

interface PaginationFormValues {
  itemsPerPage: string;
  pageJump?: string;
}

/**
 * 計算要顯示的頁碼陣列
 * 總頁數 ≤ 7：顯示所有頁碼
 * 總頁數 > 7：顯示首頁、末頁、當前頁及前後各 2 頁，中間用「...」省略
 */
function calculatePageNumbers(
  currentPage: number,
  totalPages: number
): (number | 'ellipsis')[] {
  if (totalPages <= MAX_VISIBLE_PAGES_WITHOUT_ELLIPSIS) {
    // 顯示所有頁碼
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];

  // 總是顯示首頁
  pages.push(1);

  if (currentPage <= PAGES_BEFORE_ELLIPSIS_WHEN_NEAR_START) {
    // 當前頁在前 4 頁，顯示 1-5 和末頁
    for (let i = 2; i <= PAGES_TO_SHOW_WHEN_NEAR_START; i++) {
      pages.push(i);
    }
    pages.push('ellipsis');
    pages.push(totalPages);
  } else if (currentPage >= totalPages - PAGES_FROM_END_TO_TRIGGER_END_MODE) {
    // 當前頁在後 4 頁，顯示首頁和最後 5 頁
    pages.push('ellipsis');
    for (let i = totalPages - (PAGES_TO_SHOW_WHEN_NEAR_END - 1); i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // 當前頁在中間，顯示首頁、當前頁前後各 2 頁、末頁
    pages.push('ellipsis');
    for (let i = currentPage - PAGES_AROUND_CURRENT; i <= currentPage + PAGES_AROUND_CURRENT; i++) {
      pages.push(i);
    }
    pages.push('ellipsis');
    pages.push(totalPages);
  }

  return pages;
}


export function CareerNewsPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
}: CareerNewsPaginationProps) {
  const pageNumbers = useMemo(
    () => calculatePageNumbers(currentPage, totalPages),
    [currentPage, totalPages]
  );

  // 使用 useMemo 創建動態驗證 schema，避免每次渲染都重新創建
  const paginationSchema = useMemo(() => {
    return z.object({
      itemsPerPage: z.string().refine(
        (val) => {
          const num = parseInt(val, 10);
          return !isNaN(num) && itemsPerPageOptions.includes(num);
        },
        { message: '請選擇有效的每頁顯示數量' }
      ),
      pageJump: z.string().optional().refine(
        (val) => {
          if (!val || val.trim() === '') return true;
          const pageNum = parseInt(val, 10);
          if (isNaN(pageNum)) return false;
          return pageNum >= 1 && pageNum <= totalPages;
        },
        { message: `頁碼必須在 1 到 ${totalPages} 之間` }
      ),
    });
  }, [itemsPerPageOptions, totalPages]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<PaginationFormValues>({
    resolver: zodResolver(paginationSchema),
    defaultValues: {
      itemsPerPage: itemsPerPage.toString(),
      pageJump: '',
    },
  });

  // 當 itemsPerPage 從外部改變時，同步更新表單值
  useEffect(() => {
    setValue('itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage, setValue]);

  // 當 currentPage 或 totalPages 改變時，清除頁碼跳轉輸入
  useEffect(() => {
    setValue('pageJump', '');
  }, [currentPage, totalPages, setValue]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const onSubmit = (data: PaginationFormValues) => {
    // 處理每頁顯示數量變更
    const newItemsPerPage = parseInt(data.itemsPerPage, 10);
    if (newItemsPerPage && itemsPerPageOptions.includes(newItemsPerPage) && newItemsPerPage !== itemsPerPage) {
      onItemsPerPageChange(newItemsPerPage);
    }

    // 處理頁碼跳轉
    if (data.pageJump && data.pageJump.trim() !== '') {
      const targetPage = parseInt(data.pageJump, 10);
      if (targetPage >= 1 && targetPage <= totalPages) {
        onPageChange(targetPage);
        reset({
          itemsPerPage: data.itemsPerPage,
          pageJump: '',
        });
        // 滾動到列表頂部
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // 如果沒有輸入頁碼，只處理每頁顯示數量變更
      // 滾動到列表頂部
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-gray-50 py-4 px-4 md:px-8">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* 左側：每頁顯示數量選擇器和頁碼跳轉 */}
        <div className='flex flex-row items-center justify-start gap-2'>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap items-start gap-2 text-sm text-[#706F6F]">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span>每頁顯示</span>
                <div className="relative">
                  <select
                    {...register('itemsPerPage')}
                    className={`appearance-none bg-white border rounded px-2 py-1 pr-6 text-center text-sm text-[#282423] w-12 focus:outline-none focus:ring-2 focus:ring-[#55BBF9] focus:border-[#55BBF9] cursor-pointer ${errors.itemsPerPage ? 'border-red-500' : 'border-gray-300'}`}
                    aria-label="每頁顯示數量"
                  >
                    {itemsPerPageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                    <ChevronRight className="w-3 h-3 rotate-90" />
                  </div>
                </div>
                <span>筆，到第</span>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    {...register('pageJump')}
                    placeholder={currentPage.toString()}
                    disabled={totalPages <= 1}
                    className={`w-10 bg-white border rounded px-2 py-1 text-center text-sm text-[#282423] focus:outline-none focus:ring-2 focus:ring-[#55BBF9] focus:border-[#55BBF9] ${errors.pageJump
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300'
                      } ${totalPages <= 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : ''
                      }`}
                    aria-label="跳轉到第幾頁"
                    aria-invalid={errors.pageJump ? 'true' : 'false'}
                    aria-describedby={errors.pageJump ? 'page-jump-error' : undefined}
                  />
                </div>
                <span>頁</span>
                <button
                  type="submit"
                  className="bg-[#55BBF9] text-white px-3 py-1 rounded text-sm font-medium hover:bg-[#088DDE] transition-colors focus:outline-none focus:ring-2 focus:ring-[#55BBF9] focus:ring-offset-2 ml-1"
                >
                  送出
                </button>
              </div>
              {errors.pageJump && (
                <span
                  id="page-jump-error"
                  className="mt-1 text-xs text-red-500 whitespace-nowrap"
                  role="alert"
                >
                  {errors.pageJump.message}
                </span>
              )}
              {errors.itemsPerPage && (
                <span
                  className="mt-1 text-xs text-red-500 whitespace-nowrap"
                  role="alert"
                >
                  {errors.itemsPerPage.message}
                </span>
              )}
            </div>
          </form>

          {/* 中間：總筆數和當前頁碼顯示 */}
          <div className="flex items-center gap-2 text-sm text-[#706F6F]">
            <span>共 {totalItems} 筆資料</span>
            {totalPages > 1 && (
              <>
                <span>,</span>
                <span>第 {currentPage}/{totalPages} 頁</span>
              </>
            )}
          </div>
        </div>

        {/* 右側：分頁控制 */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          pageNumbers={pageNumbers}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onPageClick={handlePageClick}
        />
      </div>
    </div>
  );
}

