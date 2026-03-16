/**
 * 專業證照素材轉換 - 公開 API
 * 將 CMS raw JSON 轉換為前端可用的 CertificateMediaItem[]
 */
import type { CertificateMediaItem } from "./types";
import { RawDataResolver } from "./raw-data-resolver";
import { CertificateMediaEntity } from "./entity";
import { MediaTypeDetector } from "./media-type-detector";

/**
 * 依據 sourceUrl 判斷素材類型
 * @param sourceUrl 內容來源 URL
 * @returns 素材類型，若無法判斷則回傳 null
 */
export function detectMediaType(
  sourceUrl: string
): CertificateMediaItem["mediaType"] | null {
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
