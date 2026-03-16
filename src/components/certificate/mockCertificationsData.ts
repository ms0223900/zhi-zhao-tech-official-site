import type {
  CertificationGqlItem,
  CertificationsResponse,
} from "@/lib/graphql";
import type { CertificateMediaItem } from "@/types/certificate-media";
import { transformCertificationsToCertificateMediaItems } from "@/lib/graphql";

/**
 * GraphQL GetCertifications 的 Mock Data
 * 方便在未啟動 CMS / GraphQL API 時本地開發使用。
 *
 * 結構對齊實際 GraphQL 響應：
 *
 * query GetCertifications {
 *   certifications {
 *     documentId
 *     title
 *     thumbnail { url }
 *     videoUrl
 *     mediaFile { url mime }
 *   }
 * }
 */
export const mockCertificationsResponse: { data: CertificationsResponse } = {
  data: {
    certifications: [
      {
        documentId: "b9udsymrvz9xp8oyophq2p7s",
        title: "證照1",
        thumbnail: {
          url: "https://zhi-zhao-s3.s3.us-east-1.amazonaws.com/DC_101255_page_0001_b43048a48b.webp",
        },
        videoUrl: null,
        mediaFile: {
          url: "https://zhi-zhao-s3.s3.us-east-1.amazonaws.com/DC_101255_page_0001_b43048a48b.webp",
          mime: "image/webp",
        },
      },
      {
        documentId: "mvlr1iy4l97f0qwmxwa8frds",
        title: "經濟部冷凍空調業登記證書",
        thumbnail: {
          url: "https://zhi-zhao-s3.s3.us-east-1.amazonaws.com/page_0001_4c56af1910.webp",
        },
        videoUrl: null,
        mediaFile: {
          url: "https://zhi-zhao-s3.s3.us-east-1.amazonaws.com/page_0001_4c56af1910.webp",
          mime: "image/webp",
        },
      },
      {
        documentId: "ymuuh5ptazbynibk2m5romft",
        title: "Logo",
        thumbnail: {
          url: "https://zhi-zhao-s3.s3.us-east-1.amazonaws.com/Snipaste_2026_03_16_20_39_32_6133df66da.png",
        },
        videoUrl: null,
        mediaFile: {
          url: "https://zhi-zhao-s3.s3.us-east-1.amazonaws.com/1_LOGO_2013_420e753cba.pdf",
          mime: "application/pdf",
        },
      },
    ] satisfies CertificationGqlItem[],
  },
};

/**
 * 將上方 GraphQL Mock Data 轉成前端直接可用的 CertificateMediaItem[]
 * - 完全沿用正式環境的轉換邏輯
 */
export const mockCertificateMediaItems: CertificateMediaItem[] =
  transformCertificationsToCertificateMediaItems(mockCertificationsResponse.data);

