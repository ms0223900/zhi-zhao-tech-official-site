import { csrClient } from '@/gql/client';
import replaceS3UrlWithCloudFront from '@/utils/replaceS3UrlWithCloudFront';
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

export interface ArticleTag {
  type: 'TOP' | 'NEW';
  label: string;
  color: string;
}

export interface CareerNewsItem {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  cover: {
    url: string;
    alternativeText?: string;
  };
  publishedAt: string;
  updatedAt: string;
  slug: string;
  tags?: ArticleTag[];
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
  tags?: {
    type: string;
    label: string;
  }[];
}

export interface CareerNewsListResponse {
  careerNewsArticles: CareerNewsGqlItem[];
}

export interface CareerNewsSlugsResponse {
  careerNewsArticles: {
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
    cover: {
      url: replaceS3UrlWithCloudFront(item.cover.url),
    },
    tags: item.tags?.map(tag => ({
      type: tag.type as 'TOP' | 'NEW',
      label: tag.label,
      color: tag.type === 'TOP' ? '#E57B42' : '#55BBF9'
    }))
  };
}

// GraphQL Fragment
export const CAREER_NEWS_FRAGMENT = gql`
  fragment CareerNewsFragment on CareerNewsArticle {
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
    tags {
      type
      label
    }
  }
`;

// 獲取文章列表查詢
export const GET_CAREER_NEWS_LIST = gql`
  query GetCareerNewsList {
    careerNewsArticles(sort: ["updatedAt:desc"]) {
      ...CareerNewsFragment
    }
  }
  ${CAREER_NEWS_FRAGMENT}
`;

// 獲取單一文章查詢
export const GET_CAREER_NEWS_ARTICLE = gql`
  query GetCareerNewsArticle($slug: ID!) {
    careerNewsArticles(filters: { documentId: { eq: $slug } }) {
      ...CareerNewsFragment
    }
  }
  ${CAREER_NEWS_FRAGMENT}
`;

// 用於 generateStaticParams 的查詢
export const GET_CAREER_NEWS_SLUGS = gql`
  query GetCareerNewsSlugs {
    careerNewsArticles {
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
    return response.data?.careerNewsArticles.map(transformCareerNewsData) || [];
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
    const article = response.data?.careerNewsArticles[0];

    if (!article) {
      return null;
    }

    return transformCareerNewsData(article);
  } catch (error) {
    console.error('Failed to fetch career news article:', error);
    return null;
  }
}