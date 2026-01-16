'use client';

import { PaginationControls } from './PaginationControls';

interface CareerNewsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CareerNewsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CareerNewsPaginationProps) {
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

  return (
    <div className="w-full px-4 md:px-0">
      <div className="w-full flex items-center justify-end gap-4 pr-4">
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

