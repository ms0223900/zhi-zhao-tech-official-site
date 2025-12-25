'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';

interface CareerNewsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
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
  if (totalPages <= 7) {
    // 顯示所有頁碼
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];

  // 總是顯示首頁
  pages.push(1);

  if (currentPage <= 4) {
    // 當前頁在前 4 頁，顯示 1-5 和末頁
    for (let i = 2; i <= 5; i++) {
      pages.push(i);
    }
    pages.push('ellipsis');
    pages.push(totalPages);
  } else if (currentPage >= totalPages - 3) {
    // 當前頁在後 4 頁，顯示首頁和最後 5 頁
    pages.push('ellipsis');
    for (let i = totalPages - 4; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // 當前頁在中間，顯示首頁、當前頁前後各 2 頁、末頁
    pages.push('ellipsis');
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
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
  onPageChange,
}: CareerNewsPaginationProps) {
  const pageNumbers = useMemo(
    () => calculatePageNumbers(currentPage, totalPages),
    [currentPage, totalPages]
  );

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

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-6 px-4 md:px-8">
      {/* 左側：總筆數顯示 */}
      <div className="text-sm text-[#706F6F]">
        共 {totalItems} 筆資料
      </div>

      {/* 中間：分頁控制 */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          {/* 上一頁按鈕 */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`
            flex items-center justify-center w-10 h-10 rounded-md
            transition-colors
            ${currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-[#282423] hover:bg-[#55BBF9]/10 hover:border-[#55BBF9] cursor-pointer'
              }
          `}
            aria-label="上一頁"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* 頁碼按鈕 */}
          <div className="flex items-center gap-1">
            {pageNumbers.map((page, index) => {
              if (page === 'ellipsis') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 text-[#706F6F]"
                  >
                    ...
                  </span>
                );
              }

              const isActive = page === currentPage;

              return (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`
                  min-w-[40px] h-10 px-3 rounded-md text-sm font-medium
                  transition-colors
                  ${isActive
                      ? 'bg-[#55BBF9] text-white'
                      : 'bg-white border border-gray-300 text-[#282423] hover:bg-[#55BBF9]/10 hover:border-[#55BBF9]'
                    }
                `}
                  aria-label={`第 ${page} 頁`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* 下一頁按鈕 */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`
            flex items-center justify-center w-10 h-10 rounded-md
            transition-colors
            ${currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-[#282423] hover:bg-[#55BBF9]/10 hover:border-[#55BBF9] cursor-pointer'
              }
          `}
            aria-label="下一頁"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 右側：當前頁碼顯示 */}
      {totalPages > 1 && (
        <div className="text-sm text-[#706F6F]">
          第 {currentPage} / {totalPages} 頁
        </div>
      )}
    </div>
  );
}

