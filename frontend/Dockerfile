FROM node:22-alpine

WORKDIR /app

# 複製 package.json 和 package-lock.json（如果存在）
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製其餘源代碼
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]