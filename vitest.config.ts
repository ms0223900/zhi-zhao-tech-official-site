import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
  },
  resolve: {
    // 使用陣列確保 @/types 先於 @ 匹配，避免 @/types/certificate-media 被解析到 src/types
    alias: [
      { find: "@/types", replacement: path.resolve(__dirname, "./types") },
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
});
