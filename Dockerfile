FROM node:17.8.0-slim

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]