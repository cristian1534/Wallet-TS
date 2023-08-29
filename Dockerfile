# Etapa 1: Construcción
FROM node:16 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build ./build
COPY package*.json ./

RUN npm install --only=production

EXPOSE 5000

CMD ["npm", "start"]

