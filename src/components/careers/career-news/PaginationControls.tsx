'use client';

import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';

/**
 * 分頁計算相關常數
 */
const PAGINATION_CONFIG = {
  /** 不顯示省略號的最大頁碼數 */
  MAX_VISIBLE_PAGES_WITHOUT_ELLIPSIS: 7,
  /** 當前頁在前幾頁時觸發「靠近起始」模式 */
  PAGES_BEFORE_ELLIPSIS_WHEN_NEAR_START: 4,
  /** 靠近起始時顯示的頁碼數 */
  PAGES_TO_SHOW_WHEN_NEAR_START: 5,
  /** 當前頁距離末頁幾頁時觸發「靠近結束」模式 */
  PAGES_FROM_END_TO_TRIGGER_END_MODE: 3,
  /** 靠近結束時顯示的頁碼數 */
  PAGES_TO_SHOW_WHEN_NEAR_END: 5,
  /** 當前頁前後各顯示的頁碼數 */
  PAGES_AROUND_CURRENT: 2,
} as const;

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
  return cn(
    'flex items-center justify-center w-10 h-10 rounded-md transition-colors',
    isDisabled
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
      : 'bg-white border border-gray-300 text-[#282423] hover:bg-[#55BBF9]/10 hover:border-[#55BBF9] cursor-pointer'
  );
}

/**
 * 取得頁碼按鈕的 className
 */
function getPageNumberButtonClassName(isActive: boolean): string {
  return cn(
    'min-w-[40px] h-10 px-3 rounded-md text-sm font-medium transition-colors',
    isActive
      ? 'bg-[#55BBF9] text-white'
      : 'bg-white border border-gray-300 text-[#282423] hover:bg-[#55BBF9]/10 hover:border-[#55BBF9]'
  );
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
  const {
    MAX_VISIBLE_PAGES_WITHOUT_ELLIPSIS,
    PAGES_BEFORE_ELLIPSIS_WHEN_NEAR_START,
    PAGES_TO_SHOW_WHEN_NEAR_START,
    PAGES_FROM_END_TO_TRIGGER_END_MODE,
    PAGES_TO_SHOW_WHEN_NEAR_END,
    PAGES_AROUND_CURRENT,
  } = PAGINATION_CONFIG;

  // 如果總頁數不超過限制，顯示所有頁碼
  if (totalPages <= MAX_VISIBLE_PAGES_WITHOUT_ELLIPSIS) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [1]; // 總是顯示首頁

  const isNearStart = currentPage <= PAGES_BEFORE_ELLIPSIS_WHEN_NEAR_START;
  const isNearEnd = currentPage >= totalPages - PAGES_FROM_END_TO_TRIGGER_END_MODE;

  if (isNearStart) {
    // 當前頁靠近起始：顯示 1-5 和末頁
    for (let i = 2; i <= PAGES_TO_SHOW_WHEN_NEAR_START; i++) {
      pages.push(i);
    }
    pages.push('ellipsis', totalPages);
  } else if (isNearEnd) {
    // 當前頁靠近結束：顯示首頁和最後 5 頁
    const startPage = totalPages - (PAGES_TO_SHOW_WHEN_NEAR_END - 1);
    pages.push('ellipsis');
    for (let i = startPage; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // 當前頁在中間：顯示首頁、當前頁前後各 2 頁、末頁
    const startPage = currentPage - PAGES_AROUND_CURRENT;
    const endPage = currentPage + PAGES_AROUND_CURRENT;
    pages.push('ellipsis');
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    pages.push('ellipsis', totalPages);
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

