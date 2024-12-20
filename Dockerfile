# 基礎映像
FROM node:18-alpine AS base

# 依賴階段
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 建構階段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_PUBLIC_API_URL=/graphql
RUN npm run build

# 執行階段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# 建立非 root 用戶
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 安裝 serve 套件 (在切換用戶之前)
RUN npm install -g serve

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/out ./out

# 最後才切換到 nextjs 用戶
USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["serve", "-l", "3000", "out"]
