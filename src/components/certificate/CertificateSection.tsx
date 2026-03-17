"use client";

import { fetchCertificateMediaItems } from "@/lib/graphql";
import type { CertificateMediaItem } from "@/types/certificate-media";
import TitleWithEngSubtitle from "@/components/common/TitleWithEngSubtitle";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { CertificateCarousel } from "./CertificateCarousel";

export interface CertificateSectionProps {
  /** 專業證照素材列表 */
  items?: CertificateMediaItem[];
  /** 區塊標題（預設：專業認證） */
  title?: string;
  /** 區塊副標題（預設：Professional License） */
  subtitle?: string;
}

const certificateQueryClient = new QueryClient();

function CertificateSectionContent({
  items: initialItems,
  title = "專業認證",
  subtitle = "Professional License",
}: CertificateSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldFetch = initialItems === undefined;
  const { data, isLoading, error } = useQuery({
    queryKey: ["certificate-media-items"],
    queryFn: fetchCertificateMediaItems,
    enabled: shouldFetch,
  });

  const items = useMemo(
    () => initialItems ?? data ?? [],
    [data, initialItems]
  );

  useEffect(() => {
    if (items.length === 0) {
      setActiveIndex(0);
      return;
    }

    if (activeIndex >= items.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, items.length]);

  if (isLoading) {
    return (
      <section className="container py-16 px-4 md:px-8" aria-labelledby="certificate-section-title">
        <TitleWithEngSubtitle
          title={title}
          subtitle={subtitle}
          className="mb-8 md:mb-12"
        />
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-600" />
          <span className="ml-4 text-gray-600">載入中...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container py-16 px-4 md:px-8" aria-labelledby="certificate-section-title">
        <TitleWithEngSubtitle
          title={title}
          subtitle={subtitle}
          className="mb-8 md:mb-12"
        />
        <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-8 text-center text-red-600">
          專業證照資料載入失敗，請稍後再試。
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="container py-16 px-4 md:px-8" aria-labelledby="certificate-section-title">
      <TitleWithEngSubtitle
        title={title}
        subtitle={subtitle}
        className="mb-8 md:mb-12"
      />
      <CertificateCarousel
        items={items}
        activeIndex={activeIndex}
        onChangeActive={setActiveIndex}
      />
    </section>
  );
}

/**
 * 專業證照區塊
 * 包含區塊標題、副標題與輪播元件
 */
export function CertificateSection({
  items,
  title,
  subtitle,
}: CertificateSectionProps) {
  return (
    <QueryClientProvider client={certificateQueryClient}>
      <CertificateSectionContent
        items={items}
        title={title}
        subtitle={subtitle}
      />
    </QueryClientProvider>
  );
}
