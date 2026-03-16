/**
 * URL 擷取器：從 Strapi 媒體物件或字串取得有效 URL
 */

/** URL 擷取器：從 Strapi 媒體物件或字串取得有效 URL */
export class UrlExtractor {
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
