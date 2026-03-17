import { mockCertificationsResponse } from "@/components/certificate/mockCertificationsData";
import { csrClient } from "@/gql/client";
import type { CertificateMediaItem } from "@/types/certificate-media";
import { convertCertificateMedia } from "@/types/certificate-media";
import replaceS3UrlWithCloudFront from "@/utils/replaceS3UrlWithCloudFront";
import { gql } from "@apollo/client";

// 新聞相關類型定義
export interface NewsGenre {
  id: string;
  name: string;
}

export interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  cover: {
    url: string;
    alternativeText?: string;
  };
  newsGenre?: NewsGenre;
  publishedAt: string;
  slug: string;
}

// GraphQL 響應類型定義
export interface NewsGqlItem {
  documentId: string;
  title: string;
  subtitle: string;
  content: string;
  publishedAt: string;
  cover: {
    documentId: string;
    url: string;
  };
  newsGenre: {
    title: string;
  };
}

export interface NewsListResponse {
  newses: NewsGqlItem[];
}

export interface NewsSlugsResponse {
  newses: {
    documentId: string;
  }[];
}

// 數據轉換函數: 將 GraphQL 響應轉換為應用使用的格式
export function transformNewsData(item: NewsGqlItem): NewsItem {
  return {
    id: item.documentId,
    title: item.title,
    subtitle: item.subtitle,
    publishedAt: item.publishedAt,
    content: item.content,
    slug: item.documentId,
    cover: {
      url: replaceS3UrlWithCloudFront(item.cover.url),
    },
    newsGenre: {
      id: item.newsGenre.title,
      name: item.newsGenre.title
    }
  };
}

export async function fetchNewsList(): Promise<NewsItem[]> {
  try {
    const response = await csrClient.query<NewsListResponse>({
      query: GET_NEWS_LIST,
    });
    return response.data?.newses.map(transformNewsData) || [];
  } catch (error) {
    console.error('Failed to fetch news list:', error);
    return [];
  }
}

export async function fetchLatestNews(): Promise<NewsItem[]> {
  try {
    const response = await csrClient.query<NewsListResponse>({
      query: HOME_GET_LATEST_NEWS,
    });
    return response.data?.newses.map(transformNewsData) || [];
  } catch (error) {
    console.error('Failed to fetch latest news:', error);
    return [];
  }
}

export async function fetchNewsArticle(slug: string): Promise<NewsItem | null> {
  try {
    const response = await csrClient.query<NewsListResponse>({
      query: GET_NEWS_ARTICLE,
      variables: { slug },
    });
    const article = response.data?.newses[0];

    if (!article) {
      return null;
    }

    return transformNewsData(article);
  } catch (error) {
    console.error('Failed to fetch news article:', error);
    return null;
  }
}
export const NEWS_FRAGMENT = gql`
  fragment NewsFragment on News {
    documentId
    title
    subtitle
    content
    publishedAt
    updatedAt
    cover {
      documentId
      url
    }
    newsGenre {
      title
    }
  }
`;

export const GET_NEWS_LIST = gql`
  query GetNewsList {
    newses(sort: ["updatedAt:desc"]) {
      ...NewsFragment
    }  
  }
  ${NEWS_FRAGMENT}
`;

// latest 3 news
export const HOME_GET_LATEST_NEWS = gql`
  query GetLatestNews {
    newses(pagination:  {
       limit: 3
    }, sort: ["publishedAt:desc"])  {
      ...NewsFragment
    }
  }
  ${NEWS_FRAGMENT}
`;

// 獲取單一新聞文章查詢
export const GET_NEWS_ARTICLE = gql`
  query GetNewsArticle($slug: ID!) {
    newses(filters: { documentId: { eq: $slug } }) {
      ...NewsFragment
    }
  }
  ${NEWS_FRAGMENT}
`;

// 用於 generateStaticParams 函數的查詢
export const GET_NEWS_SLUGS = gql`
  query GetNewsSlugs {
    newses {
      documentId
    }
  }
`;

// ==================== Career News 相關類型定義 ====================

export interface CareerNewsGenre {
  title: string;
}

export interface CareerNewsItem {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  slug: string;
  newsGenre?: CareerNewsGenre;
}

// GraphQL 響應類型
export interface CareerNewsGqlItem {
  documentId: string;
  title: string;
  subtitle: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  cover: {
    documentId: string;
    url: string;
  };
  newsGenre: {
    title: string;
  };
}

export interface CareerNewsListResponse {
  careerNewses: CareerNewsGqlItem[];
}

export interface CareerNewsSlugsResponse {
  careerNewses: {
    documentId: string;
  }[];
}

// 數據轉換函數: 將 GraphQL 響應轉換為應用使用的格式
export function transformCareerNewsData(item: CareerNewsGqlItem): CareerNewsItem {
  return {
    id: item.documentId,
    title: item.title,
    subtitle: item.subtitle,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    content: item.content,
    slug: item.documentId,
    newsGenre: item.newsGenre ? {
      title: item.newsGenre.title,
    } : undefined,
  };
}

// GraphQL Fragment
export const CAREER_NEWS_FRAGMENT = gql`
  fragment CareerNewsFragment on CareerNews {
    documentId
    title
    subtitle
    content
    publishedAt
    updatedAt
    newsGenre {
      title
    }
  }
`;

// 獲取文章列表查詢
export const GET_CAREER_NEWS_LIST = gql`
  query GetCareerNewsList {
    careerNewses(sort: ["updatedAt:desc"]) {
      ...CareerNewsFragment
    }
  }
  ${CAREER_NEWS_FRAGMENT}
`;

// 獲取單一文章查詢
export const GET_CAREER_NEWS_ARTICLE = gql`
  query GetCareerNewsArticle($slug: ID!) {
    careerNewses(filters: { documentId: { eq: $slug } }) {
      ...CareerNewsFragment
    }
  }
  ${CAREER_NEWS_FRAGMENT}
`;

// 用於 generateStaticParams 的查詢
export const GET_CAREER_NEWS_SLUGS = gql`
  query GetCareerNewsSlugs {
    careerNewses {
      documentId
    }
  }
`;

// 獲取文章列表
export async function fetchCareerNewsList(): Promise<CareerNewsItem[]> {
  try {
    const response = await csrClient.query<CareerNewsListResponse>({
      query: GET_CAREER_NEWS_LIST,
    });
    return response.data?.careerNewses.map(transformCareerNewsData) || [];
  } catch (error) {
    console.error('Failed to fetch career news list:', error);
    return [];
  }
}

// 獲取單一文章
export async function fetchCareerNewsArticle(slug: string): Promise<CareerNewsItem | null> {
  try {
    const response = await csrClient.query<CareerNewsListResponse>({
      query: GET_CAREER_NEWS_ARTICLE,
      variables: { slug },
    });
    const article = response.data?.careerNewses[0];

    if (!article) {
      return null;
    }

    return transformCareerNewsData(article);
  } catch (error) {
    console.error('Failed to fetch career news article:', error);
    return null;
  }
}

// ==================== Certificates / 專業證照 相關定義 ====================

/** GraphQL 回傳的單筆專業證照資料（對應 GetCertifications query） */
export interface CertificationGqlItem {
  documentId: string;
  title: string;
  thumbnail: {
    url: string;
  };
  videoUrl: string | null;
  mediaFile: {
    url: string;
    mime: string;
  } | null;
}

/** GetCertifications 查詢的 GraphQL 響應包裝 */
export interface CertificationsResponse {
  certifications: CertificationGqlItem[];
}

/**
 * 將 GraphQL 的 certifications 結果轉換成前端使用的 CertificateMediaItem[]
 * - 統一透過 convertCertificateMedia 處理
 * - 僅先做 URL 正規化，再直接交給 GraphQL 結構轉換
 */
export function transformCertificationsToCertificateMediaItems(
  response: CertificationsResponse
): CertificateMediaItem[] {
  const normalizedCertifications = response.certifications.map((item) => ({
    ...item,
    thumbnail: {
      url: replaceS3UrlWithCloudFront(item.thumbnail.url),
    },
    videoUrl: item.videoUrl,
    mediaFile: item.mediaFile ? {
        ...item.mediaFile,
        url: replaceS3UrlWithCloudFront(item.mediaFile.url),
      } : null,
  }));

  return convertCertificateMedia(normalizedCertifications);
}

// GraphQL 查詢：專業證照列表
export const GET_CERTIFICATIONS = gql`
  query GetCertifications {
    certifications {
      documentId
      title
      thumbnail {
        url
      }
      videoUrl
      mediaFile {
        url
        mime
      }
    }
  }
`;

/**
 * 從 CMS 取得專業證照素材並轉成 CertificateMediaItem[]
 * - 失敗時回傳空陣列
 */
export async function fetchCertificateMediaItems(): Promise<CertificateMediaItem[]> {
  try {
    // TODO: remove mock data
    const response = mockCertificationsResponse;
    // const response = await csrClient.query<CertificationsResponse>({
    //   query: GET_CERTIFICATIONS,
    // });

    // if (!response.data || !Array.isArray(response.data.certifications)) {
    //   return [];
    // }

    return transformCertificationsToCertificateMediaItems(response.data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch certifications:", error);
    throw error;
  }
}