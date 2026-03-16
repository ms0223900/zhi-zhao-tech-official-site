/**
 * 專業證照素材資料模型與型別定義
 * Certificate Media Data Model and Types
 *
 * 用於從 Strapi CMS 串接並在前端統一處理專業證照顯示與互動邏輯。
 * 採 OOP Entity 形式，轉換邏輯集中於專責模組。
 */

/** 專業證照素材類型，對應不同的顯示與互動邏輯 */

/** 專業證照素材常數，供型別安全使用 */
export const CERTIFICATE_MEDIA_TYPES = {
  IMAGE: "image",
  PDF: "pdf",
  VIDEO: "video",
} as const;

export type CertificateMediaType = (typeof CERTIFICATE_MEDIA_TYPES)[keyof typeof CERTIFICATE_MEDIA_TYPES];

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

// ─── 轉換邏輯模組 ───────────────────────────────────────────────────────

/** URL 擷取器：從 Strapi 媒體物件或字串取得有效 URL */
class UrlExtractor {
  /**
   * 從媒體物件 `{ url: string }` 或直接為 URL 字串取得有效 URL
   * @param value 媒體物件或 URL 字串
   * @returns 有效的 URL 字串，若無法取得則回傳 null
   */
  static extract(value: unknown): string | null {
    if (value == null) return null;
    if (typeof value === "string" && value.trim()) return value.trim();
    if (
      typeof value === "object" &&
      "url" in value &&
      typeof (value as { url: unknown }).url === "string"
    ) {
      const url = (value as { url: string }).url.trim();
      return url || null;
    }
    return null;
  }
}

/** 素材類型檢測器：依 sourceUrl 副檔名與網域判斷類型 */
class MediaTypeDetector {
  private static readonly IMAGE_EXTENSIONS =
    /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?|$)/i;
  private static readonly PDF_EXTENSION = /\.pdf(\?|$)/i;
  private static readonly VIDEO_PATTERNS =
    /\.(mp4|webm|mov|avi|mkv|m4v)(\?|$)|youtube\.com|youtu\.be|vimeo\.com/i;

  /**
   * 依據 sourceUrl 判斷素材類型
   * @param sourceUrl 內容來源 URL
   * @returns 素材類型，若無法判斷則回傳 null
   */
  static detect(sourceUrl: string): CertificateMediaType | null {
    if (!sourceUrl || typeof sourceUrl !== "string") return null;

    const url = sourceUrl.trim();
    if (!url) return null;

    if (this.PDF_EXTENSION.test(url)) return "pdf";
    if (this.VIDEO_PATTERNS.test(url)) return "video";
    if (this.IMAGE_EXTENSIONS.test(url)) return "image";

    return null;
  }
}

/** 原始資料解析器：從各種 CMS 回傳格式提取素材陣列 */
class RawDataResolver {
  private static hasDataArray(
    obj: unknown
  ): obj is { data: RawCertificateMediaItem[] } {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "data" in obj &&
      Array.isArray((obj as { data: unknown }).data)
    );
  }

  private static hasAttributes(obj: unknown): obj is {
    attributes: { items?: RawCertificateMediaItem[] };
  } {
    return typeof obj === "object" && obj !== null && "attributes" in obj;
  }

  /**
   * 從 raw JSON 解析出素材陣列
   * 支援：陣列、{ data: [...] }、{ attributes: { items: [...] } }
   */
  static resolve(raw: unknown): RawCertificateMediaItem[] {
    if (raw == null) return [];

    if (Array.isArray(raw)) return raw;
    if (this.hasDataArray(raw)) return raw.data;
    if (this.hasAttributes(raw)) {
      const attrs = raw.attributes;
      return Array.isArray(attrs?.items) ? attrs.items : [];
    }

    return [];
  }
}

// ─── Entity ───────────────────────────────────────────────────────────────

/**
 * 專業證照素材 Entity
 * 封裝單筆素材的領域邏輯，提供從 Raw 建立的工廠方法
 */
export class CertificateMediaEntity implements CertificateMediaItem {
  readonly id: string;
  readonly previewImageUrl: string;
  readonly sourceUrl: string;
  readonly name: string;
  readonly mediaType: CertificateMediaType;

  private constructor(props: CertificateMediaItem) {
    this.id = props.id;
    this.previewImageUrl = props.previewImageUrl;
    this.sourceUrl = props.sourceUrl;
    this.name = props.name;
    this.mediaType = props.mediaType;
  }

  /** 是否為圖片素材 */
  get isImage(): boolean {
    return this.mediaType === "image";
  }

  /** 是否為 PDF 素材 */
  get isPdf(): boolean {
    return this.mediaType === "pdf";
  }

  /** 是否為影片素材 */
  get isVideo(): boolean {
    return this.mediaType === "video";
  }

  /** 轉為純物件格式，供既有 API 相容 */
  toPlainObject(): CertificateMediaItem {
    return {
      id: this.id,
      previewImageUrl: this.previewImageUrl,
      sourceUrl: this.sourceUrl,
      name: this.name,
      mediaType: this.mediaType,
    };
  }

  /**
   * 從 Raw CMS 資料建立 Entity
   * @param rawItem 單筆原始素材
   * @param index 索引（用於 fallback id）
   * @returns Entity 或 null（資料不完整時）
   */
  static fromRaw(
    rawItem: RawCertificateMediaItem,
    index: number
  ): CertificateMediaEntity | null {
    if (!rawItem || typeof rawItem !== "object") return null;

    const previewImageUrl = UrlExtractor.extract(rawItem.previewImage);
    const sourceUrl = UrlExtractor.extract(rawItem.source);
    const name =
      typeof rawItem.name === "string" && rawItem.name.trim()
        ? rawItem.name.trim()
        : null;

    if (!previewImageUrl || !sourceUrl || !name) return null;

    const mediaType = MediaTypeDetector.detect(sourceUrl);
    if (!mediaType) return null; // 非 image / pdf / video 不納入規格

    const id =
      typeof rawItem.documentId === "string"
        ? rawItem.documentId
        : typeof rawItem.id === "string"
          ? rawItem.id
          : typeof rawItem.id === "number"
            ? String(rawItem.id)
            : `cert-media-${index}-${Date.now()}`;

    return new CertificateMediaEntity({
      id,
      previewImageUrl,
      sourceUrl,
      name,
      mediaType,
    });
  }
}

// ─── 公開 API ─────────────────────────────────────────────────────────────

/**
 * 依據 sourceUrl 判斷素材類型
 * @param sourceUrl 內容來源 URL
 * @returns 素材類型，若無法判斷則回傳 null
 */
export function detectMediaType(
  sourceUrl: string
): CertificateMediaType | null {
  return MediaTypeDetector.detect(sourceUrl);
}

/**
 * 將 CMS 回傳的 raw JSON 轉換為 CertificateMediaItem[]
 * 對不合法輸入有基本防禦，忽略不完整資料或回傳空陣列
 *
 * @param raw Strapi CMS API 回傳的 JSON
 * @returns 轉換後的專業證照素材陣列
 */
export function convertCertificateMedia(raw: unknown): CertificateMediaItem[] {
  const items = RawDataResolver.resolve(raw);

  return items
    .map((item, index) => CertificateMediaEntity.fromRaw(item, index))
    .filter((entity): entity is CertificateMediaEntity => entity !== null)
    .map((entity) => entity.toPlainObject());
}
