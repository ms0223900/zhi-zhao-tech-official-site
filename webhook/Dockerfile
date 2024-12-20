FROM node:18-alpine

# 安裝 Docker CLI
RUN apk add --no-cache docker-cli

WORKDIR /webhook

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 9000

CMD ["npm", "start"] 