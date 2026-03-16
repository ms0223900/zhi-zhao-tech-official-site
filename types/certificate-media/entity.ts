/**
 * 專業證照素材 Entity
 * 封裝單筆素材的領域邏輯，提供從 Raw 建立的工廠方法
 */
import type { CertificateMediaItem, RawCertificateMediaItem } from "./types";
import { UrlExtractor } from "./url-extractor";
import { MediaTypeDetector } from "./media-type-detector";

/** 專業證照素材 Entity */
export class CertificateMediaEntity implements CertificateMediaItem {
  readonly id: string;
  readonly previewImageUrl: string;
  readonly sourceUrl: string;
  readonly name: string;
  readonly mediaType: CertificateMediaItem["mediaType"];

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
