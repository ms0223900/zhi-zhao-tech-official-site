# 專業證照資料模型重構報告
# Certificate Media Module Refactoring Report

## 1. 分析範圍

- **目標檔案**：`types/certificate-media.ts`
- **相關文件**：`docs/certification-part/01-專業證照資料模型與型別定義.md`、PRD
- **分析日期**：2025-03-16

## 2. 程式碼氣味分析

### 2.1 已遵循的良好實踐 ✓

| 項目 | 說明 |
|------|------|
| 型別安全 | 使用 `CertificateMediaType`、`CertificateMediaItem` 明確定義 |
| 常數提取 | `IMAGE_EXTENSIONS`、`PDF_EXTENSION`、`VIDEO_PATTERNS` 已模組化 |
| 防禦性編程 | `convertCertificateMedia` 對 `null`、`undefined`、非預期結構有防禦 |
| JSDoc | 導出函式有完整 JSDoc 說明 |
| 單一職責 | `extractUrl`、`detectMediaType` 職責清晰 |

### 2.2 可改進項目

| 問題 | 影響範圍 | 優先級 | 預期效益 |
|------|----------|--------|----------|
| 型別斷言過多 | `convertCertificateMedia` 內多處 `as` 轉型 | 中 | 提升型別安全，減少潛在錯誤 |
| `extractUrl` 未加 JSDoc | 內部函式可讀性 | 低 | 輔助未來維護 |
| ID 生成使用 `Date.now()` | 同毫秒內大量轉換可能產生重複 ID | 低 | 降低碰撞機率（實務上少見） |
| 文件命名不一致 | 04 文件使用 `normalizeCertificateMedia`，程式為 `convertCertificateMedia` | 高 | 避免後續整合錯誤 |

## 3. 重構建議清單

### 3.1 高優先級

#### [H1] 統一文件與程式命名

- **問題**：`04-前後台串接與專業證照區塊整合.md` 使用 `normalizeCertificateMedia`，實際函式名為 `convertCertificateMedia`。
- **建議**：將文件內 `normalizeCertificateMedia` 全數改為 `convertCertificateMedia`，與程式一致。
- **影響**：僅文件，無程式變更。
- **驗證**：搜尋文件確認無殘留 `normalizeCertificateMedia`。

### 3.2 中優先級

#### [M1] 導入型別守衛改善型別斷言

- **目標**：以型別守衛取代部分 `as` 轉型，提升型別安全。
- **步驟**：
  1. 定義 `hasDataProperty(obj: unknown): obj is { data: unknown[] }` 等守衛
  2. 在 `convertCertificateMedia` 中以 `if (hasDataProperty(raw))` 替代型別斷言
  3. 執行 `npm run lint && npm run build` 驗證
- **風險**：低。若守衛撰寫錯誤可能導致型別推斷錯誤。

### 3.3 低優先級

#### [L1] 為 `extractUrl` 補充 JSDoc

- 說明參數 `value` 與回傳值用途。

#### [L2] ID 碰撞防範（可選）

- 若需更強唯一性，可改為 `crypto.randomUUID()` 或 `cert-media-${i}-${Math.random().toString(36).slice(2)}`。
- 目前 `Date.now()` 在一般使用情境下已足夠。

## 4. 測試策略

### 4.1 測試覆蓋重點

| 函式 | 測試類型 | 驗證重點 |
|------|----------|----------|
| `detectMediaType` | 正常流程 | 圖片、PDF、影片 URL 正確判斷 |
| `detectMediaType` | 邊界案例 | 空字串、`null`、特殊字元、無法判斷格式 |
| `convertCertificateMedia` | 正常流程 | 陣列、`{ data: [] }`、`{ attributes: { items: [] } }` 格式 |
| `convertCertificateMedia` | 邊界案例 | `null`、`undefined`、空陣列、不完整項目 |
| `convertCertificateMedia` | 防禦邏輯 | 缺 previewImage、source、name 的項目被略過 |

### 4.2 測試檔案位置

- `types/certificate-media.test.ts`

### 4.3 執行指令

```bash
npm run test        # 單次執行
npm run test:watch  # 監聽模式
```

## 5. 執行紀錄

| 項目 | 狀態 |
|------|------|
| 基準檢查（lint） | ⚠️ Node.js 版本需 18.18.0+ |
| 基準檢查（build） | ⚠️ 同上 |
| 測試框架 | ✅ Vitest 已加入 |
| 測試案例 | ✅ 已撰寫於 `types/certificate-media.test.ts` |
| 文件命名修正 [H1] | ✅ 已完成（04 文件已改為 `convertCertificateMedia`） |
| 型別守衛 [M1] | ✅ 已完成（hasDataArray、hasAttributes） |
| extractUrl JSDoc [L1] | ✅ 已完成 |
| 測試執行 | ⚠️ 需 Node 18+，執行 `npm run test` 驗證 |

**注意**：若使用 Node.js 16，請升級至 Node 18 或 20 後再執行 `npm run test`。
