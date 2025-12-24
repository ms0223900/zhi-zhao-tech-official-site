/**
 * 格式化日期為 YYYY-MM-DD 格式
 * @param dateString - ISO 8601 日期字串
 * @returns 格式化後的日期字串 (YYYY-MM-DD)
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
