/**
 * 專業證照素材資料模型與型別定義
 * Certificate Media Data Model and Types
 *
 * 用於從 Strapi CMS 串接並在前端統一處理專業證照顯示與互動邏輯。
 * 採 OOP Entity 形式，轉換邏輯集中於專責模組。
 */

export {
  type CertificateMediaType,
  type CertificateMediaItem,
  CERTIFICATE_MEDIA_TYPES,
} from "./types";

export { CertificateMediaEntity } from "./entity";

export { detectMediaType, convertCertificateMedia } from "./convert";

export { type LinkAction, getClickBehavior } from "./link-action";
