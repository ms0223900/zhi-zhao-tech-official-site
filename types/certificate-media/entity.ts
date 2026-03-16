/**
 * 專業證照素材 Entity
 * 封裝 GraphQL 單筆資料到前端 UI 使用的資料模型
 */
import type { CertificationGqlItem } from "@/lib/graphql";
import type { CertificateMediaItem } from "./types";
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

  /** 從 GraphQL 單筆證照資料建立 Entity */
  static fromGqlItem(
    certification: CertificationGqlItem
  ): CertificateMediaEntity | null {
    const id = certification.documentId?.trim();
    const previewImageUrl = certification.thumbnail?.url?.trim();
    const fileUrl = certification.mediaFile?.url?.trim();
    const videoUrl = certification.videoUrl?.trim();
    const sourceUrl = videoUrl || fileUrl;
    const name = certification.title?.trim();
    const mediaType = MediaTypeDetector.detect(certification);

    if (!id || !previewImageUrl || !sourceUrl || !name || !mediaType) return null;

    return new CertificateMediaEntity({
      id,
      previewImageUrl,
      sourceUrl,
      name,
      mediaType,
    });
  }
}
