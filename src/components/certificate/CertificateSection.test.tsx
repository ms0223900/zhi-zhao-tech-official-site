import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CertificateMediaItem } from "@/types/certificate-media";

const { useQueryMock } = vi.hoisted(() => ({
  useQueryMock: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  QueryClient: class QueryClient {},
  QueryClientProvider: ({ children }: { children: ReactNode }) => children,
  useQuery: useQueryMock,
}));

vi.mock("./CertificateCarousel", () => ({
  CertificateCarousel: ({
    items,
    activeIndex,
  }: {
    items: CertificateMediaItem[];
    activeIndex?: number;
  }) => (
    <div
      data-testid="certificate-carousel"
      data-items={items.length}
      data-active-index={activeIndex ?? -1}
    >
      carousel
    </div>
  ),
}));

vi.mock("@/components/common/TitleWithEngSubtitle", () => ({
  default: ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) => (
    <div data-testid="certificate-title">
      <span>{title}</span>
      <span>{subtitle}</span>
    </div>
  ),
}));

import { CertificateSection } from "./CertificateSection";

const mockItems: CertificateMediaItem[] = [
  {
    id: "1",
    previewImageUrl: "https://example.com/preview-1.webp",
    sourceUrl: "https://example.com/source-1.webp",
    name: "證照一",
    mediaType: "image",
  },
  {
    id: "2",
    previewImageUrl: "https://example.com/preview-2.webp",
    sourceUrl: "https://example.com/source-2.pdf",
    name: "證照二",
    mediaType: "pdf",
  },
];

describe("CertificateSection", () => {
  beforeEach(() => {
    useQueryMock.mockReset();
  });

  it("有傳入 items 時應直接渲染輪播並帶入 activeIndex", () => {
    useQueryMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });

    const markup = renderToStaticMarkup(<CertificateSection items={mockItems} />);

    expect(markup).toContain("certificate-carousel");
    expect(markup).toContain('data-items="2"');
    expect(markup).toContain('data-active-index="0"');
    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      })
    );
  });

  it("未傳入 items 且查詢中時應顯示 loading 狀態", () => {
    useQueryMock.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const markup = renderToStaticMarkup(<CertificateSection />);

    expect(markup).toContain("載入中");
  });

  it("查詢失敗時應顯示錯誤訊息", () => {
    useQueryMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("boom"),
    });

    const markup = renderToStaticMarkup(<CertificateSection />);

    expect(markup).toContain("專業證照資料載入失敗");
  });

  it("查詢成功但無資料時應不渲染內容", () => {
    useQueryMock.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    const markup = renderToStaticMarkup(<CertificateSection />);

    expect(markup).toBe("");
  });
});
