/**
 * 專業證照素材模組 - 單元測試
 * Certificate Media Module - Unit Tests
 */
import { describe, expect, it } from "vitest";
import type { CertificationGqlItem } from "@/lib/graphql";
import {
  CERTIFICATE_MEDIA_TYPES,
  convertCertificateMedia,
  detectMediaType,
  getClickBehavior,
} from ".";
import type { CertificateMediaItem } from ".";

describe("detectMediaType", () => {
  it("應依 image mime 判斷為 image", () => {
    expect(
      detectMediaType({
        videoUrl: null,
        mediaFile: {
          url: "https://example.com/cert.webp",
          mime: "image/webp",
        },
      })
    ).toBe(CERTIFICATE_MEDIA_TYPES.IMAGE);
  });

  it("應依 pdf mime 判斷為 pdf", () => {
    expect(
      detectMediaType({
        videoUrl: null,
        mediaFile: {
          url: "https://example.com/cert.pdf",
          mime: "application/pdf",
        },
      })
    ).toBe(CERTIFICATE_MEDIA_TYPES.PDF);
  });

  it("有 videoUrl 時應優先判斷為 video", () => {
    expect(
      detectMediaType({
        videoUrl: "https://youtu.be/demo",
        mediaFile: {
          url: "https://example.com/poster.webp",
          mime: "image/webp",
        },
      })
    ).toBe(CERTIFICATE_MEDIA_TYPES.VIDEO);
  });

  it("未知 mime 應回傳 null", () => {
    expect(
      detectMediaType({
        videoUrl: null,
        mediaFile: {
          url: "https://example.com/file.bin",
          mime: "application/octet-stream",
        },
      })
    ).toBeNull();
  });
});

describe("convertCertificateMedia", () => {
  const validItem: CertificationGqlItem = {
    documentId: "doc-1",
    title: "專業證照 A",
    thumbnail: { url: "https://example.com/preview.webp" },
    videoUrl: null,
    mediaFile: {
      url: "https://example.com/cert.pdf",
      mime: "application/pdf",
    },
  };

  it("應正確轉換 GraphQL certifications", () => {
    const result = convertCertificateMedia([validItem]);

    expect(result).toEqual([
      {
        id: "doc-1",
        previewImageUrl: "https://example.com/preview.webp",
        sourceUrl: "https://example.com/cert.pdf",
        name: "專業證照 A",
        mediaType: "pdf",
      },
    ]);
  });

  it("有 videoUrl 時應使用 videoUrl 作為 sourceUrl", () => {
    const result = convertCertificateMedia([
      {
        ...validItem,
        videoUrl: "https://youtu.be/demo",
        mediaFile: {
          url: "https://example.com/poster.webp",
          mime: "image/webp",
        },
      },
    ]);

    expect(result[0]).toMatchObject({
      sourceUrl: "https://youtu.be/demo",
      mediaType: "video",
    });
  });

  it("資料不完整時應略過該筆", () => {
    const result = convertCertificateMedia([
      validItem,
      {
        ...validItem,
        documentId: "",
      },
      {
        ...validItem,
        documentId: "doc-2",
        title: "   ",
      },
      {
        ...validItem,
        documentId: "doc-3",
        mediaFile: {
          url: "https://example.com/file.bin",
          mime: "application/octet-stream",
        },
      },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("doc-1");
  });

  it("非陣列輸入應回傳空陣列", () => {
    expect(convertCertificateMedia(null)).toEqual([]);
    expect(convertCertificateMedia(undefined)).toEqual([]);
    expect(convertCertificateMedia({} as unknown as CertificationGqlItem[])).toEqual(
      []
    );
  });
});

describe("getClickBehavior", () => {
  const baseItem: CertificateMediaItem = {
    id: "1",
    previewImageUrl: "https://example.com/preview.webp",
    sourceUrl: "https://example.com/source",
    name: "測試素材",
    mediaType: "image",
  };

  it("image 素材應回傳 type: none，不帶 href", () => {
    const result = getClickBehavior({ ...baseItem, mediaType: "image" });
    expect(result).toEqual({ type: "none" });
    expect(result.href).toBeUndefined();
  });

  it("pdf 素材應回傳 openInNewTab，含正確 href、target 與 rel", () => {
    const result = getClickBehavior({
      ...baseItem,
      mediaType: "pdf",
      sourceUrl: "https://example.com/cert.pdf",
    });
    expect(result).toEqual({
      type: "openInNewTab",
      href: "https://example.com/cert.pdf",
      target: "_blank",
      rel: "noopener noreferrer",
    });
  });

  it("video 素材應回傳 openInNewTab，含正確 href、target 與 rel", () => {
    const result = getClickBehavior({
      ...baseItem,
      mediaType: "video",
      sourceUrl: "https://youtu.be/demo",
    });
    expect(result).toEqual({
      type: "openInNewTab",
      href: "https://youtu.be/demo",
      target: "_blank",
      rel: "noopener noreferrer",
    });
  });
});
