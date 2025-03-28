import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';

// 建立 GraphQL 客戶端
const endpoint = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/graphql';
export const graphQLClient = new GraphQLClient(endpoint, {
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

// 獲取新聞列表查詢
export const GET_NEWS_LIST = gql`
  query GetNewsList {
    newses {
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
  }
`;

// 獲取單一新聞文章查詢
export const GET_NEWS_ARTICLE = gql`
  query GetNewsArticle($slug: String!) {
    newses(filters: { slug: { eq: $slug } }) {
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
  }
`;

// 用於 generateStaticParams 函數的查詢
export const GET_NEWS_SLUGS = gql`
  query GetNewsSlugs {
    newses {
      documentId
    }
  }
`; 