/**
 * 素材類型檢測器：依 GraphQL 回傳的 mediaFile.mime / videoUrl 判斷類型
 */
import type { CertificationGqlItem } from "@/lib/graphql";
import type { CertificateMediaType } from "./types";

/** 素材類型檢測器 */
export class MediaTypeDetector {
  /**
   * 依據 GraphQL 單筆證照資料判斷素材類型
   * @param certification GraphQL 回傳的單筆證照資料
   * @returns 素材類型，若無法判斷則回傳 null
   */
  static detect(
    certification: Pick<CertificationGqlItem, "videoUrl" | "mediaFile">
  ): CertificateMediaType | null {
    const videoUrl = certification.videoUrl?.trim();
    if (videoUrl) return "video";

    const mime = certification.mediaFile?.mime?.trim().toLowerCase();
    if (!mime) return null;

    if (mime === "application/pdf") return "pdf";
    if (mime.startsWith("video/")) return "video";
    if (mime.startsWith("image/")) return "image";

    return null;
  }
}
