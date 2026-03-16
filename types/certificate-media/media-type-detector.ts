/**
 * 素材類型檢測器：依 sourceUrl 副檔名與網域判斷類型
 */
import type { CertificateMediaType } from "./types";

/** 素材類型檢測器 */
export class MediaTypeDetector {
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
