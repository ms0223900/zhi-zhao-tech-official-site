import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import replaceS3UrlWithCloudFront from '@/utils/replaceS3UrlWithCloudFront';
import { API_URL } from '@/gql/client';

export const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
  },
});

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
    const response = await graphQLClient.request<NewsListResponse>(GET_NEWS_LIST);
    return response.newses.map(transformNewsData);
  } catch (error) {
    console.error('Failed to fetch news list:', error);
    return [];
  }
}

export async function fetchLatestNews(): Promise<NewsItem[]> {
  try {
    const response = await graphQLClient.request<NewsListResponse>(HOME_GET_LATEST_NEWS);
    return response.newses.map(transformNewsData);
  } catch (error) {
    console.error('Failed to fetch latest news:', error);
    return [];
  }
}

export async function fetchNewsArticle(slug: string): Promise<NewsItem | null> {
  try {
    const response = await graphQLClient.request<NewsListResponse>(GET_NEWS_ARTICLE, { slug });
    const article = response.newses[0];

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
    newses {
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