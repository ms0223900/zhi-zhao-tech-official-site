'use client';

import { cn } from '@/utils/cn';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

interface NavigationButtonProps {
  direction: 'prev' | 'next';
  isDisabled: boolean;
  onClick: () => void;
}

/**
 * 導航按鈕組件（上一頁/下一頁）
 */
function NavigationButton({ direction, isDisabled, onClick }: NavigationButtonProps) {
  const label = direction === 'prev' ? '上一頁' : '下一頁';

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'flex items-center justify-center px-3 py-2 rounded-lg transition-colors',
        isDisabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-[#55BBF9] text-white hover:bg-[#088DDE] cursor-pointer'
      )}
      aria-label={label}
    >
      {label}
    </button>
  );
}

/**
 * 分頁控制組件
 * 負責顯示上一頁、下一頁按鈕以及頁碼顯示（第 X/Y 頁）
 */
export function PaginationControls({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-end gap-3">
      {/* 上一頁按鈕 */}
      <NavigationButton
        direction="prev"
        isDisabled={currentPage === 1}
        onClick={onPrevious}
      />

      {/* 下一頁按鈕 */}
      <NavigationButton
        direction="next"
        isDisabled={currentPage === totalPages}
        onClick={onNext}
      />

      {/* 頁碼顯示 */}
      <span className="text-lg font-medium tracking-widest text-[#707070] pl-2">
        第 {currentPage}/{totalPages} 頁
      </span>
    </div>
  );
}

