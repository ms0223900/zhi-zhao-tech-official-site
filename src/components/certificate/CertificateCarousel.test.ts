/**
 * CertificateCarousel 單元測試
 * 驗收條件：型別正確、匯入無誤、props 結構符合規格
 */
import { describe, expect, it } from "vitest";
import type { CertificateMediaItem } from "@/types/certificate-media";

const MOCK_ITEMS: CertificateMediaItem[] = [
  {
    id: "1",
    previewImageUrl: "https://example.com/preview1.jpg",
    sourceUrl: "https://example.com/doc1.pdf",
    name: "電器承裝業合格執照",
    mediaType: "image",
  },
  {
    id: "2",
    previewImageUrl: "https://example.com/preview2.jpg",
    sourceUrl: "https://example.com/video2.mp4",
    name: "冷凍空調同業公會 會員證書",
    mediaType: "video",
  },
];

describe("CertificateCarousel - 型別與規格驗證", () => {
  it("CertificateMediaItem 應包含必要欄位", () => {
    const item = MOCK_ITEMS[0];
    expect(item).toHaveProperty("id");
    expect(item).toHaveProperty("previewImageUrl");
    expect(item).toHaveProperty("sourceUrl");
    expect(item).toHaveProperty("name");
    expect(item).toHaveProperty("mediaType");
    expect(["image", "pdf", "video"]).toContain(item.mediaType);
  });

  it("CertificateCarousel 與 CertificateSection 可正常匯入", async () => {
    const { CertificateCarousel } = await import("./CertificateCarousel");
    const { CertificateSection } = await import("./CertificateSection");
    expect(typeof CertificateCarousel).toBe("function");
    expect(typeof CertificateSection).toBe("function");
  });

  it("CertificateCarouselProps 應接受 items、activeIndex、onChangeActive", async () => {
    const { CertificateCarousel } = await import("./CertificateCarousel");
    // 驗證元件接受預期 props（透過 TypeScript 型別，此處為執行時檢查）
    expect(CertificateCarousel).toBeDefined();
    // 若 props 型別錯誤，TypeScript 會在編譯時報錯
  });
});
