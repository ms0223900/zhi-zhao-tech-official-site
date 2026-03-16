/**
 * 專業證照素材轉換 - 公開 API
 * 將 GraphQL certifications 轉換為前端可用的 CertificateMediaItem[]
 */
import type { CertificationGqlItem } from "@/lib/graphql";
import type { CertificateMediaItem } from "./types";
import { CertificateMediaEntity } from "./entity";
import { MediaTypeDetector } from "./media-type-detector";

/**
 * 依據 GraphQL 單筆資料判斷素材類型
 * @param certification GraphQL 回傳的單筆證照資料
 * @returns 素材類型，若無法判斷則回傳 null
 */
export function detectMediaType(
  certification: Pick<CertificationGqlItem, "videoUrl" | "mediaFile">
): CertificateMediaItem["mediaType"] | null {
  return MediaTypeDetector.detect(certification);
}

/**
 * 將 GraphQL certifications 陣列轉換為 CertificateMediaItem[]
 * 對不合法輸入有基本防禦，忽略不完整資料或回傳空陣列
 *
 * @param certifications GraphQL certifications 陣列
 * @returns 轉換後的專業證照素材陣列
 */
export function convertCertificateMedia(
  certifications: CertificationGqlItem[] | null | undefined
): CertificateMediaItem[] {
  if (!Array.isArray(certifications)) return [];

  return certifications
    .map((item) => CertificateMediaEntity.fromGqlItem(item))
    .filter((entity): entity is CertificateMediaEntity => entity !== null)
    .map((entity) => entity.toPlainObject());
}
