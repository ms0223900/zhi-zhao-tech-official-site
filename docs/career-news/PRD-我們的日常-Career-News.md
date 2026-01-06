# PRD - 人才專區「我們的日常」功能需求文檔

## 1. 專案概述

### 1.1 專案名稱
人才專區 - 我們的日常 (Career News)

### 1.2 專案背景
智兆科技官方網站人才專區需要新增「我們的日常」功能模組，用於展示公司內部日常活動、員工旅遊、生日慶祝、專案里程碑等內容，讓求職者和現有員工更深入了解公司文化與工作氛圍。

### 1.3 專案目標
- 提升人才專區的內容豐富度與互動性
- 展示公司文化與員工生活，增強品牌形象
- 提供文章列表展示功能
- 支援分頁瀏覽

### 1.4 目標用戶
- 求職者：了解公司文化與工作環境
- 現有員工：查看公司活動與日常分享
- 訪客：了解智兆科技企業文化

---

## 2. 功能需求

### 2.1 頁面結構

#### 2.1.1 Banner 區塊
**位置**：頁面頂部  
**設計規格**：
- 使用全寬橫幅圖片作為背景
- 圖片內容：室內工業/辦公室天花板場景（可見管道、通風設備、照明設施）
- 標題文字：「人才專區」 (中文)
- 副標題文字：「Talent Area」 (英文)
- 文字樣式：白色、大號字體、置中顯示
- 背景遮罩：深色半透明遮罩層（提升文字可讀性）

**技術實現**：
- 重用現有 `Banner` 組件
- 圖片路徑：`/images/careers/careers-banner.webp` 或新增專用圖片
- 高度：400px（與現有 Banner 保持一致）

---

#### 2.1.2 「我們的日常」文章列表區塊

**位置**：Banner 下方，主要內容區域左側

**區塊標題**：
- 中文標題：「我們的日常」
- 英文副標題：「Career News」
- 樣式：淺藍色背景標題欄，與現有設計風格一致

**文章列表項目**：

每篇文章包含以下元素：

1. **文章標題**
   - 顯示完整標題文字
   - 字體大小：標題樣式（h3/h4）
   - 顏色：深色文字
   - 可點擊連結至文章詳情頁

2. **發布日期**
   - 格式：YYYY-MM-DD（例如：2026-01-01）
   - 位置：標題下方或左側
   - 字體大小：小號文字
   - 顏色：灰色

3. **箭頭圖示**
   - 每篇文章前顯示藍色箭頭圖示（指向右側）
   - 表示可點擊進入詳情

**列表樣式**：
- 垂直排列，每篇文章間有適當間距
- 每頁顯示 3 篇文章
- 支援響應式設計（手機/平板/桌面）

---

#### 2.1.3 分頁控制區塊

**位置**：文章列表下方

**功能元素**：

1. **頁碼顯示**
   - 顯示格式：`第 {current}/{total} 頁`
   - 例如：第 1/2 頁
   - 位置：分頁控制區域

2. **上下頁按鈕**
   - **上一頁按鈕**：淺藍色背景，用於切換到上一頁
   - **下一頁按鈕**：較深藍色背景，用於切換到下一頁
   - 位置：頁碼顯示右側
   - 樣式：圓角按鈕樣式
   - 行為：
     - 在第一頁時，「上一頁」按鈕應為禁用狀態
     - 在最後一頁時，「下一頁」按鈕應為禁用狀態

**分頁邏輯**：
- 預設每頁 3 筆
- 總頁數 = Math.ceil(總文章數 / 每頁顯示數)
- 當前頁碼從 1 開始

---

### 2.2 資料結構需求

#### 2.2.1 文章資料模型

```typescript
interface CareerNewsArticle {
  id: string;                    // 唯一識別碼
  title: string;                  // 文章標題
  subtitle?: string;              // 副標題（可選）
  content: string;                // 文章內容（Markdown 格式）
  publishedAt: string;            // 發布日期 (ISO 8601)
  updatedAt: string;              // 更新日期 (ISO 8601)
  coverImage?: string;            // 封面圖片 URL
  slug: string;                  // URL 友好標識符
  author?: string;                // 作者名稱（可選）
  viewCount?: number;             // 瀏覽次數（可選）
}
```

---

### 2.3 文章 API

文章 API Schema 格式沿用 `src/lib/graphql.ts` 中的 News 格式，確保與現有架構一致。

#### 2.3.1 TypeScript 類型定義

```typescript
// 應用層使用的文章類型
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
}

// GraphQL 響應包裝類型
export interface CareerNewsListResponse {
  careerNewsArticles: CareerNewsGqlItem[];
}

export interface CareerNewsSlugsResponse {
  careerNewsArticles: {
    documentId: string;
  }[];
}
```

#### 2.3.2 數據轉換函數

```typescript
// 將 GraphQL 響應轉換為應用使用的格式
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
  };
}
```

#### 2.3.3 GraphQL 查詢

```typescript
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
```

#### 2.3.4 數據獲取函數

```typescript
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
```

**注意事項**：
- API Schema 格式與 News 保持一致，便於維護與擴展
- 使用相同的數據轉換模式（`transformCareerNewsData`）
- 使用相同的錯誤處理策略
- 圖片 URL 使用 `replaceS3UrlWithCloudFront` 進行轉換
- 在 Strapi CMS 中需建立對應的 `CareerNewsArticle` 內容類型

---

### 2.4 頁面路由需求

#### 2.4.1 文章詳情頁
- **路由**：`/careers/career-news/[slug]`
- **組件**：`CareerNewsArticlePage`
- **功能**：
  - 顯示完整文章內容
  - 返回列表按鈕

---

## 3. 設計規範

### 3.1 色彩規範

**主色調**：
- 主題藍色：`#088DDE`、`#044E7B`（與現有設計一致）
- 自定義藍色：`#55BBF9`

**文字顏色**：
- 主要文字：`#282423`（深色）
- 次要文字：`#706F6F`（灰色）
- 日期文字：`#6E6E6E`（中灰色）

### 3.2 字體規範

**標題**：
- H1：25px, 600（Banner 標題）
- H2：25px, 500（區塊標題）
- H3：20px, 500（文章標題）

**內文**：
- 正文：16px, 400
- 小字：14px, 400（日期）

**字體家族**：Inter（與現有設計一致）

### 3.3 間距規範

- 區塊間距：`py-16`（64px）
- 文章項目間距：`gap-4` 或 `gap-6`（16-24px）
- 內邊距：`px-4`（手機）、`px-8`（桌面）

### 3.4 響應式斷點

- 手機：< 768px
- 平板：768px - 1024px
- 桌面：> 1024px

**響應式行為**：
- 手機版：文章列表垂直排列
- 平板/桌面：文章列表保持原有佈局

---

## 4. 技術實現方案

### 4.1 技術棧

- **框架**：Next.js 15 (App Router)
- **語言**：TypeScript
- **樣式**：Tailwind CSS
- **UI 組件**：Shadcn UI、Radix UI
- **狀態管理**：React 19 內建狀態（Server Components 優先）
- **資料獲取**：Server Components + GraphQL（與現有架構一致）

### 4.2 組件結構

```
src/
├── app/
│   └── careers/
│       └── career-news/
│           └── [slug]/
│               └── page.tsx                # 文章詳情頁
├── components/
│   └── careers/
│       └── career-news/
│           ├── CareerNewsList.tsx           # 文章列表組件
│           ├── CareerNewsArticleCard.tsx     # 文章卡片組件
│           └── CareerNewsPagination.tsx     # 分頁組件
└── lib/
    └── graphql.ts                           # GraphQL 查詢（擴展現有檔案）
```

### 4.3 資料獲取策略

**方案一：使用現有 GraphQL 架構**
- 在 Strapi/CMS 中新增「Career News Article」內容類型
- 擴展 `src/lib/graphql.ts` 新增查詢
- 使用 Server Components 獲取資料

**方案二：使用靜態資料（初期）**
- 建立 JSON 檔案存放文章資料
- 後續可遷移至 CMS

**推薦**：方案一（與現有架構一致）

---

## 5. 功能優先級

### P0（必須實現）
1. ✅ Banner 區塊
2. ✅ 文章列表顯示（標題、日期）
3. ✅ 分頁功能（上下頁按鈕與頁碼顯示）
4. ✅ 文章詳情頁

### P2（未來擴展）
1. 🔮 文章搜尋功能
2. 🔮 文章瀏覽次數統計
3. 🔮 文章分享功能

---

## 6. 驗收標準

### 6.1 功能驗收
- [ ] Banner 區塊正確顯示，文字清晰可讀
- [ ] 文章列表正確顯示，每頁顯示 3 篇文章
- [ ] 分頁功能正常運作，頁碼正確顯示
- [ ] 點擊文章可進入詳情頁
- [ ] 響應式設計在各裝置上正常顯示

### 6.2 效能驗收
- [ ] 分頁切換流暢無卡頓

### 6.3 無障礙驗收
- [ ] 符合 WCAG 2.1 AA 標準
- [ ] 鍵盤導航功能正常
- [ ] 螢幕閱讀器可正確讀取內容
- [ ] 圖片有適當的 alt 文字

### 6.4 瀏覽器相容性
- [ ] Chrome（最新版）
- [ ] Safari（最新版）
- [ ] Firefox（最新版）
- [ ] Edge（最新版）

---

## 7. 時程規劃

### Phase 1：基礎功能（2 週）
- 設計稿確認與技術方案制定
- Banner 與文章列表 UI 實現
- 分頁功能實現
- 文章詳情頁實現

### Phase 2：優化與測試（1 週）
- 響應式設計優化
- 效能優化
- 無障礙測試
- 跨瀏覽器測試

**總時程**：約 3 週

---

## 8. 風險與考量

### 8.1 技術風險
- **CMS 整合**：需確認 Strapi 是否支援新增內容類型
- **效能**：大量文章時的分頁與載入策略

### 8.2 內容管理
- 需建立內容管理流程（誰負責發布文章）
- 需定義文章審核機制

### 8.3 安全性
- 文章內容需加入驗證機制（防止 XSS）
- 敏感資訊需過濾

---

## 9. 後續優化建議

1. **SEO 優化**
   - 文章詳情頁加入 Meta 標籤
   - 結構化資料（Schema.org）
   - Sitemap 更新

2. **互動功能**
   - 文章點讚功能
   - 文章收藏功能
   - 分享至社群媒體

3. **內容推薦**
   - 相關文章推薦
   - 熱門文章展示

4. **管理後台**
   - 文章管理介面
   - 數據統計儀表板

---

## 10. 附錄

### 10.1 設計稿參考
- Adobe XD 設計稿：https://xd.adobe.com/view/7ad789ab-1164-45ed-7024-3122d9a5552f-0ce6/

### 10.2 相關文檔
- 現有新聞列表實現：`src/components/news/NewsClient.tsx`
- 現有分頁實現：`src/components/projects/ProjectList.tsx`
- Banner 組件：`src/components/common/Banner.tsx`

### 10.3 聯絡資訊
- 產品負責人：[待填寫]
- 設計負責人：[待填寫]
- 開發負責人：[待填寫]

---

**文檔版本**：v1.1  
**建立日期**：2025-12-24  
**最後更新**：2025-12-24

