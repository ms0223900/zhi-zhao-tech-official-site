'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';

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

/**
 * 取得導航按鈕的 className
 */
function getNavigationButtonClassName(isDisabled: boolean): string {
  const baseClasses = 'flex items-center justify-center w-10 h-10 rounded-md transition-colors';

  if (isDisabled) {
    return `${baseClasses} bg-gray-100 text-gray-400 cursor-not-allowed`;
  }

  return `${baseClasses} bg-white border border-gray-300 text-[#282423] hover:bg-[#55BBF9]/10 hover:border-[#55BBF9] cursor-pointer`;
}

/**
 * 取得頁碼按鈕的 className
 */
function getPageNumberButtonClassName(isActive: boolean): string {
  const baseClasses = 'min-w-[40px] h-10 px-3 rounded-md text-sm font-medium transition-colors';

  if (isActive) {
    return `${baseClasses} bg-[#55BBF9] text-white`;
  }

  return `${baseClasses} bg-white border border-gray-300 text-[#282423] hover:bg-[#55BBF9]/10 hover:border-[#55BBF9]`;
}

/**
 * 省略號組件
 */
function Ellipsis() {
  return (
    <span className="px-2 text-[#706F6F]">
      ...
    </span>
  );
}

/**
 * 頁碼按鈕組件
 */
interface PaginationButtonProps {
  page: number;
  isActive: boolean;
  onClick: (page: number) => void;
}

function PaginationButton({ page, isActive, onClick }: PaginationButtonProps) {
  return (
    <button
      onClick={() => onClick(page)}
      className={getPageNumberButtonClassName(isActive)}
      aria-label={`第 ${page} 頁`}
      aria-current={isActive ? 'page' : undefined}
    >
      {page}
    </button>
  );
}

/**
 * 導航按鈕組件（上一頁/下一頁）
 */
interface NavigationButtonProps {
  direction: 'prev' | 'next';
  isDisabled: boolean;
  onClick: () => void;
}

function NavigationButton({ direction, isDisabled, onClick }: NavigationButtonProps) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  const ariaLabel = direction === 'prev' ? '上一頁' : '下一頁';

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={getNavigationButtonClassName(isDisabled)}
      aria-label={ariaLabel}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
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
          <NavigationButton
            direction="prev"
            isDisabled={currentPage === 1}
            onClick={handlePrevious}
          />

          {/* 頁碼按鈕 */}
          <div className="flex items-center gap-1">
            {pageNumbers.map((page, index) => {
              if (page === 'ellipsis') {
                return <Ellipsis key={`ellipsis-${index}`} />;
              }

              return (
                <PaginationButton
                  key={page}
                  page={page}
                  isActive={page === currentPage}
                  onClick={handlePageClick}
                />
              );
            })}
          </div>

          {/* 下一頁按鈕 */}
          <NavigationButton
            direction="next"
            isDisabled={currentPage === totalPages}
            onClick={handleNext}
          />
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

