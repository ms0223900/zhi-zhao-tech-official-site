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

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onPageClick: (page: number) => void;
}

interface NavigationButtonProps {
  direction: 'prev' | 'next';
  isDisabled: boolean;
  onClick: () => void;
}

interface PaginationButtonProps {
  page: number;
  isActive: boolean;
  onClick: (page: number) => void;
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
 * 省略號組件
 * 用於分頁控制中表示省略的頁碼
 */
function Ellipsis() {
  return (
    <span className="px-2 text-[#706F6F]">
      ...
    </span>
  );
}

/**
 * 導航按鈕組件（上一頁/下一頁）
 */
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

/**
 * 頁碼按鈕組件
 */
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
 * 分頁控制組件
 * 負責顯示上一頁、下一頁按鈕以及頁碼按鈕列表
 */
export function PaginationControls({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageClick,
}: PaginationControlsProps) {
  const pageNumbers = useMemo(
    () => calculatePageNumbers(currentPage, totalPages),
    [currentPage, totalPages]
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {/* 上一頁按鈕 */}
      <NavigationButton
        direction="prev"
        isDisabled={currentPage === 1}
        onClick={onPrevious}
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
              onClick={onPageClick}
            />
          );
        })}
      </div>

      {/* 下一頁按鈕 */}
      <NavigationButton
        direction="next"
        isDisabled={currentPage === totalPages}
        onClick={onNext}
      />
    </div>
  );
}

