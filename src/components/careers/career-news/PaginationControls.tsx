'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: (number | 'ellipsis')[];
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
  pageNumbers,
  onPrevious,
  onNext,
  onPageClick,
}: PaginationControlsProps) {
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

