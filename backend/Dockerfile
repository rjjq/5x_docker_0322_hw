FROM node:22-alpine

WORKDIR /app/src

COPY src/package*.json ./

RUN npm install

COPY . /app

EXPOSE 3002

CMD ["node", "server.js"]
