FROM node:20 AS build

WORKDIR /app

COPY package*.json ./


RUN npm install

COPY . .

COPY .env.sample .env

FROM node:20-alpine

COPY --from=build /app .

EXPOSE 5000

CMD ["node", "index.js"]