FROM node:22-alpine

WORKDIR /app

COPY tsconfig.json ./
COPY src ./src
COPY ./public ./public
COPY package*.json ./

RUN npm install
RUN npm run build

COPY .env .env

EXPOSE 9000

CMD ["node", "dist/src/index.js"]
