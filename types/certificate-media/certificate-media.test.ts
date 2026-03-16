/**
 * 專業證照素材模組 - 單元測試
 * Certificate Media Module - Unit Tests
 *
 * 涵蓋：正常流程、邊界案例、錯誤處理
 */
import { describe, expect, it } from "vitest";
import {
  CERTIFICATE_MEDIA_TYPES,
  convertCertificateMedia,
  detectMediaType,
} from ".";

describe("detectMediaType", () => {
  describe("正常流程 - 圖片 URL", () => {
    it.each([
      ["https://example.com/photo.jpg", CERTIFICATE_MEDIA_TYPES.IMAGE],
      ["https://example.com/photo.jpeg", CERTIFICATE_MEDIA_TYPES.IMAGE],
      ["https://example.com/photo.png", CERTIFICATE_MEDIA_TYPES.IMAGE],
      ["https://example.com/photo.gif", CERTIFICATE_MEDIA_TYPES.IMAGE],
      ["https://example.com/photo.webp", CERTIFICATE_MEDIA_TYPES.IMAGE],
      ["https://example.com/photo.svg", CERTIFICATE_MEDIA_TYPES.IMAGE],
      ["https://example.com/photo.bmp", CERTIFICATE_MEDIA_TYPES.IMAGE],
      ["https://example.com/photo.JPG?size=large", CERTIFICATE_MEDIA_TYPES.IMAGE],
    ])("應將 %s 判斷為 image", (url, expected) => {
      expect(detectMediaType(url)).toBe(expected);
    });
  });

  describe("正常流程 - PDF URL", () => {
    it.each([
      ["https://example.com/doc.pdf", CERTIFICATE_MEDIA_TYPES.PDF],
      ["https://example.com/doc.PDF", CERTIFICATE_MEDIA_TYPES.PDF],
      ["https://example.com/doc.pdf?v=1", CERTIFICATE_MEDIA_TYPES.PDF],
    ])("應將 %s 判斷為 pdf", (url, expected) => {
      expect(detectMediaType(url)).toBe(expected);
    });
  });

  describe("正常流程 - 影片 URL", () => {
    it.each([
      ["https://example.com/video.mp4", CERTIFICATE_MEDIA_TYPES.VIDEO],
      ["https://example.com/video.webm", CERTIFICATE_MEDIA_TYPES.VIDEO],
      ["https://www.youtube.com/watch?v=xxx", CERTIFICATE_MEDIA_TYPES.VIDEO],
      ["https://youtu.be/xxx", CERTIFICATE_MEDIA_TYPES.VIDEO],
      ["https://vimeo.com/12345", CERTIFICATE_MEDIA_TYPES.VIDEO],
    ])("應將 %s 判斷為 video", (url, expected) => {
      expect(detectMediaType(url)).toBe(expected);
    });
  });

  describe("優先順序 - PDF 優先於影片", () => {
    it("若 URL 同時符合 PDF 與其他規則，應判斷為 pdf", () => {
      expect(detectMediaType("https://example.com/doc.pdf")).toBe("pdf");
    });
  });

  describe("邊界案例", () => {
    it("空字串應回傳 null", () => {
      expect(detectMediaType("")).toBeNull();
    });

    it("空白字串應回傳 null", () => {
      expect(detectMediaType("   ")).toBeNull();
    });

    it("null 應回傳 null", () => {
      expect(detectMediaType(null as unknown as string)).toBeNull();
    });

    it("undefined 應回傳 null", () => {
      expect(detectMediaType(undefined as unknown as string)).toBeNull();
    });

    it("非字串（數字）應回傳 null", () => {
      expect(detectMediaType(123 as unknown as string)).toBeNull();
    });

    it("無法判斷的副檔名應回傳 null", () => {
      expect(detectMediaType("https://example.com/file.xyz")).toBeNull();
    });

    it("無副檔名的 URL 應回傳 null", () => {
      expect(detectMediaType("https://example.com/page")).toBeNull();
    });
  });
});

describe("convertCertificateMedia", () => {
  const validItem = {
    id: "doc-1",
    previewImage: { url: "https://example.com/preview.jpg" },
    source: { url: "https://example.com/cert.pdf" },
    name: "專業證照 A",
  };

  describe("正常流程 - 陣列格式", () => {
    it("應正確轉換完整素材陣列", () => {
      const raw = [validItem];
      const result = convertCertificateMedia(raw);
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: "doc-1",
        previewImageUrl: "https://example.com/preview.jpg",
        sourceUrl: "https://example.com/cert.pdf",
        name: "專業證照 A",
        mediaType: "pdf",
      });
    });

    it("應支援 source 為字串", () => {
      const raw = [
        {
          ...validItem,
          source: "https://example.com/photo.png",
        },
      ];
      const result = convertCertificateMedia(raw);
      expect(result[0].sourceUrl).toBe("https://example.com/photo.png");
      expect(result[0].mediaType).toBe("image");
    });

    it("應支援 previewImage 為字串", () => {
      const raw = [
        {
          ...validItem,
          previewImage: "https://example.com/thumb.jpg",
        },
      ];
      const result = convertCertificateMedia(raw);
      expect(result[0].previewImageUrl).toBe("https://example.com/thumb.jpg");
    });
  });

  describe("正常流程 - { data: [...] } 格式", () => {
    it("應正確解析 Strapi data 結構", () => {
      const raw = { data: [validItem] };
      const result = convertCertificateMedia(raw);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("專業證照 A");
    });
  });

  describe("正常流程 - { attributes: { items: [...] } } 格式", () => {
    it("應正確解析 attributes.items 結構", () => {
      const raw = { attributes: { items: [validItem] } };
      const result = convertCertificateMedia(raw);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("專業證照 A");
    });

    it("當 items 不存在時應回傳空陣列", () => {
      const raw = { attributes: {} };
      expect(convertCertificateMedia(raw)).toEqual([]);
    });
  });

  describe("ID 產生邏輯", () => {
    it("應優先使用 documentId", () => {
      const raw = [{ ...validItem, documentId: "strapi-doc-123" }];
      const result = convertCertificateMedia(raw);
      expect(result[0].id).toBe("strapi-doc-123");
    });

    it("無 documentId 時應使用 id（字串）", () => {
      const raw = [{ ...validItem, id: "str-id" }];
      const result = convertCertificateMedia(raw);
      expect(result[0].id).toBe("str-id");
    });

    it("無 documentId 時應使用 id（數字）並轉為字串", () => {
      const raw = [{ ...validItem, id: 999 }];
      const result = convertCertificateMedia(raw);
      expect(result[0].id).toBe("999");
    });

    it("無 id 時應產生 fallback id", () => {
      const raw = [{ ...validItem }];
      delete (raw[0] as { documentId?: string; id?: string }).documentId;
      delete (raw[0] as { documentId?: string; id?: string }).id;
      const result = convertCertificateMedia(raw);
      expect(result[0].id).toMatch(/^cert-media-\d+-\d+$/);
    });
  });

  describe("邊界案例 - 略過不完整資料", () => {
    it("缺少 previewImage 應略過該筆", () => {
      const raw = [{ ...validItem, previewImage: null }];
      expect(convertCertificateMedia(raw)).toEqual([]);
    });

    it("缺少 source 應略過該筆", () => {
      const raw = [{ ...validItem, source: null }];
      expect(convertCertificateMedia(raw)).toEqual([]);
    });

    it("缺少 name 應略過該筆", () => {
      const raw = [{ ...validItem, name: "" }];
      expect(convertCertificateMedia(raw)).toEqual([]);
    });

    it("無法判斷 mediaType 應略過該筆", () => {
      const raw = [
        {
          ...validItem,
          source: { url: "https://example.com/file.xyz" },
        },
      ];
      expect(convertCertificateMedia(raw)).toEqual([]);
    });

    it("空白 name 應略過該筆", () => {
      const raw = [{ ...validItem, name: "   " }];
      expect(convertCertificateMedia(raw)).toEqual([]);
    });
  });

  describe("錯誤處理", () => {
    it("null 應回傳空陣列", () => {
      expect(convertCertificateMedia(null)).toEqual([]);
    });

    it("undefined 應回傳空陣列", () => {
      expect(convertCertificateMedia(undefined)).toEqual([]);
    });

    it("空陣列應回傳空陣列", () => {
      expect(convertCertificateMedia([])).toEqual([]);
    });

    it("非物件、非陣列應回傳空陣列", () => {
      expect(convertCertificateMedia("string")).toEqual([]);
      expect(convertCertificateMedia(123)).toEqual([]);
      expect(convertCertificateMedia(true)).toEqual([]);
    });

    it("data 非陣列時應回傳空陣列", () => {
      expect(convertCertificateMedia({ data: "not-array" })).toEqual([]);
    });

    it("應略過陣列中的 null/undefined 元素", () => {
      const raw = [null, undefined, validItem];
      const result = convertCertificateMedia(raw);
      expect(result).toHaveLength(1);
    });

    it("應略過陣列中的非物件元素", () => {
      const raw = ["string", 123, validItem];
      const result = convertCertificateMedia(raw);
      expect(result).toHaveLength(1);
    });
  });

  describe("行為驗證 - PRD 規格", () => {
    it("每筆結果應包含 previewImageUrl、sourceUrl、name、mediaType", () => {
      const raw = [validItem];
      const result = convertCertificateMedia(raw);
      expect(result[0]).toHaveProperty("previewImageUrl");
      expect(result[0]).toHaveProperty("sourceUrl");
      expect(result[0]).toHaveProperty("name");
      expect(result[0]).toHaveProperty("mediaType");
      expect(["image", "pdf", "video"]).toContain(result[0].mediaType);
    });
  });
});
