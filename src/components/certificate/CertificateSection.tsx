"use client";

import type { CertificateMediaItem } from "@/types/certificate-media";
import TitleWithEngSubtitle from "@/components/common/TitleWithEngSubtitle";
import { CertificateCarousel } from "./CertificateCarousel";

export interface CertificateSectionProps {
  /** 專業證照素材列表 */
  items: CertificateMediaItem[];
  /** 區塊標題（預設：專業認證） */
  title?: string;
  /** 區塊副標題（預設：Professional License） */
  subtitle?: string;
}

/**
 * 專業證照區塊
 * 包含區塊標題、副標題與輪播元件
 */
export function CertificateSection({
  items,
  title = "專業認證",
  subtitle = "Professional License",
}: CertificateSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="container py-16 px-4 md:px-8" aria-labelledby="certificate-section-title">
      <TitleWithEngSubtitle
        title={title}
        subtitle={subtitle}
        className="mb-8 md:mb-12"
      />
      <CertificateCarousel items={items} />
    </section>
  );
}
