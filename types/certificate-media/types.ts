/**
 * 專業證照素材型別定義
 * Certificate Media Type Definitions
 */

/** 專業證照素材常數，供型別安全使用 */
export const CERTIFICATE_MEDIA_TYPES = {
  IMAGE: "image",
  PDF: "pdf",
  VIDEO: "video",
} as const;

/** 專業證照素材類型，對應不同的顯示與互動邏輯 */
export type CertificateMediaType =
  (typeof CERTIFICATE_MEDIA_TYPES)[keyof typeof CERTIFICATE_MEDIA_TYPES];

/** 單筆專業證照素材 */
export interface CertificateMediaItem {
  /** 唯一識別碼 */
  id: string;
  /** 預覽圖 URL，用於輪播卡片顯示 */
  previewImageUrl: string;
  /** 內容來源 URL（圖片檔 / PDF 檔 / 影片連結） */
  sourceUrl: string;
  /** 素材名稱 */
  name: string;
  /** 素材類型，用於判斷互動邏輯 */
  mediaType: CertificateMediaType;
}

/** Strapi CMS 原始素材結構（推測格式，支援多種可能結構） */
export interface RawCertificateMediaItem {
  id?: string | number;
  documentId?: string;
  previewImage?: { url?: string } | string | null;
  source?: { url?: string; mime?: string } | string | null;
  name?: string | null;
  [key: string]: unknown;
}
