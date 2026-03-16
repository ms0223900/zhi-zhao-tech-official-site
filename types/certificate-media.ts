/**
 * 專業證照素材資料模型與型別定義
 * Certificate Media Data Model and Types
 *
 * 用於從 Strapi CMS 串接並在前端統一處理專業證照顯示與互動邏輯。
 */

/** 專業證照素材類型，對應不同的顯示與互動邏輯 */
export type CertificateMediaType = "image" | "pdf" | "video";

/** 專業證照素材常數，供型別安全使用 */
export const CERTIFICATE_MEDIA_TYPES = {
  IMAGE: "image",
  PDF: "pdf",
  VIDEO: "video",
} as const satisfies Record<string, CertificateMediaType>;

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
interface RawCertificateMediaItem {
  id?: string | number;
  documentId?: string;
  previewImage?: { url?: string } | string | null;
  source?: { url?: string; mime?: string } | string | null;
  name?: string | null;
  [key: string]: unknown;
}

/** 型別守衛：是否為含 data 陣列的物件 */
function hasDataArray(obj: unknown): obj is { data: RawCertificateMediaItem[] } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "data" in obj &&
    Array.isArray((obj as { data: unknown }).data)
  );
}

/** 型別守衛：是否為含 attributes 的物件 */
function hasAttributes(obj: unknown): obj is {
  attributes: { items?: RawCertificateMediaItem[] };
} {
  return typeof obj === "object" && obj !== null && "attributes" in obj;
}

/** 圖片檔副檔名 */
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?|$)/i;

/** PDF 副檔名 */
const PDF_EXTENSION = /\.pdf(\?|$)/i;

/** 影片連結或副檔名（YouTube、Vimeo、常見影片格式） */
const VIDEO_PATTERNS =
  /\.(mp4|webm|mov|avi|mkv|m4v)(\?|$)|youtube\.com|youtu\.be|vimeo\.com/i;

/**
 * 依據 sourceUrl 判斷素材類型
 * @param sourceUrl 內容來源 URL
 * @returns 素材類型，若無法判斷則回傳 null
 */
export function detectMediaType(sourceUrl: string): CertificateMediaType | null {
  if (!sourceUrl || typeof sourceUrl !== "string") return null;

  const url = sourceUrl.trim();
  if (!url) return null;

  if (PDF_EXTENSION.test(url)) return "pdf";
  if (VIDEO_PATTERNS.test(url)) return "video";
  if (IMAGE_EXTENSIONS.test(url)) return "image";

  return null;
}

/**
 * 從 Strapi 媒體物件或字串取得 URL
 * @param value 媒體物件 `{ url: string }` 或直接為 URL 字串
 * @returns 有效的 URL 字串，若無法取得則回傳 null
 */
function extractUrl(value: unknown): string | null {
  if (value == null) return null;
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "object" && "url" in value && typeof (value as { url: unknown }).url === "string") {
    const url = (value as { url: string }).url.trim();
    return url || null;
  }
  return null;
}

/**
 * 將 CMS 回傳的 raw JSON 轉換為 CertificateMediaItem[]
 * 對不合法輸入有基本防禦，忽略不完整資料或回傳空陣列
 *
 * @param raw Strapi CMS API 回傳的 JSON
 * @returns 轉換後的專業證照素材陣列
 */
export function convertCertificateMedia(raw: unknown): CertificateMediaItem[] {
  if (raw == null) return [];

  let items: RawCertificateMediaItem[];
  if (Array.isArray(raw)) {
    items = raw;
  } else if (hasDataArray(raw)) {
    items = raw.data;
  } else if (hasAttributes(raw)) {
    const attrs = raw.attributes;
    items = Array.isArray(attrs?.items) ? attrs.items : [];
  } else {
    return [];
  }

  const result: CertificateMediaItem[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item || typeof item !== "object") continue;

    const previewImageUrl = extractUrl(item.previewImage);
    const sourceUrl = extractUrl(item.source);
    const name = typeof item.name === "string" && item.name.trim() ? item.name.trim() : null;

    if (!previewImageUrl || !sourceUrl || !name) continue;

    const mediaType = detectMediaType(sourceUrl);
    if (!mediaType) continue; // 非 image / pdf / video 不納入規格

    const id =
      typeof item.documentId === "string"
        ? item.documentId
        : typeof item.id === "string"
          ? item.id
          : typeof item.id === "number"
            ? String(item.id)
            : `cert-media-${i}-${Date.now()}`;

    result.push({
      id,
      previewImageUrl,
      sourceUrl,
      name,
      mediaType,
    });
  }

  return result;
}
