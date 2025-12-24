/**
 * Feature Toggle 配置
 * 
 * 使用環境變數控制功能的顯示與隱藏
 * 環境變數格式: NEXT_PUBLIC_FEATURE_[FEATURE_NAME]=true|false
 * 
 * 預設值為 false (功能關閉)，只有明確設定為 'true' 時才會啟用
 */

// Feature 名稱常數
export const FEATURE_NAMES = {
  CAREER_NEWS: 'CAREER_NEWS',
  // 未來可以在這裡添加更多 feature 名稱
} as const;

// Feature Toggle 配置類型
export type FeatureName = typeof FEATURE_NAMES[keyof typeof FEATURE_NAMES];

/**
 * 檢查指定的 feature 是否啟用
 * 
 * @param featureName - Feature 名稱
 * @returns 如果 feature 啟用則返回 true，否則返回 false
 * 
 * @example
 * ```tsx
 * if (isFeatureEnabled(FEATURE_NAMES.CAREER_NEWS)) {
 *   return <CareerNewsList />;
 * }
 * ```
 */
export function isFeatureEnabled(featureName: FeatureName): boolean {
  // 從環境變數讀取，格式: NEXT_PUBLIC_FEATURE_[FEATURE_NAME]
  const envVarName = `NEXT_PUBLIC_FEATURE_${featureName}`;
  const envValue = process.env[envVarName];

  // 只有明確設定為 'true' 字串時才啟用
  return envValue === 'true';
}

/**
 * 獲取所有 feature toggle 的狀態（用於除錯或管理面板）
 * 
 * @returns 包含所有 feature 狀態的物件
 */
export function getAllFeatureToggles(): Record<FeatureName, boolean> {
  const toggles: Partial<Record<FeatureName, boolean>> = {};

  Object.values(FEATURE_NAMES).forEach((featureName) => {
    toggles[featureName] = isFeatureEnabled(featureName);
  });

  return toggles as Record<FeatureName, boolean>;
}

