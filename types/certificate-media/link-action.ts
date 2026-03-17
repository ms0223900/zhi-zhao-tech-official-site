/**
 * 點擊行為型別與決策邏輯
 * Click Behavior Types and Decision Logic
 *
 * 依據素材類型決定點擊主素材卡片的行為：
 * - image：不做任何開啟行為，由輪播本身切換瀏覽
 * - pdf / video：以 target="_blank" 另開新分頁
 */
import type { CertificateMediaItem } from "./types";

/** 點擊行為描述，可直接對應 <a> tag 或 window.open 所需參數 */
export interface LinkAction {
  type: "none" | "openInNewTab";
  href?: string;
  target?: "_blank";
  rel?: string;
}

/**
 * 依據素材類型決定點擊行為
 * @param item 專業證照素材
 * @returns LinkAction 描述，UI 元件可直接對應 <a> tag 屬性
 */
export function getClickBehavior(item: CertificateMediaItem): LinkAction {
  if (item.mediaType === "image") {
    return { type: "none" };
  }

  return {
    type: "openInNewTab",
    href: item.sourceUrl,
    target: "_blank",
    rel: "noopener noreferrer",
  };
}
