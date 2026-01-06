'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PaginationControls } from './PaginationControls';

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

export function CareerNewsPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
}: CareerNewsPaginationProps) {
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
    watch,
    formState: { errors },
    reset,
  } = useForm<PaginationFormValues>({
    resolver: zodResolver(paginationSchema),
    defaultValues: {
      itemsPerPage: itemsPerPage.toString(),
      pageJump: '',
    },
  });

  // 監聽 itemsPerPage 的變化
  const watchedItemsPerPage = watch('itemsPerPage');

  // 當 itemsPerPage 從外部改變時，同步更新表單值
  useEffect(() => {
    setValue('itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage, setValue]);

  // 當 currentPage 或 totalPages 改變時，清除頁碼跳轉輸入
  useEffect(() => {
    setValue('pageJump', '1');
  }, [currentPage, totalPages, watchedItemsPerPage]);

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
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}

