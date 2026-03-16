/**
 * 原始資料解析器：從各種 CMS 回傳格式提取素材陣列
 */
import type { RawCertificateMediaItem } from "./types";

/** 原始資料解析器 */
export class RawDataResolver {
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
