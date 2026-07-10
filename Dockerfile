FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

COPY .env.sample .env

RUN npm install

COPY . .

FROM node:20-alpine

COPY --from=build /app .

EXPOSE 5000

CMD ["node", "index.js"]