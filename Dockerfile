FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g typescript

RUN npm install

COPY . .

RUN tsc

EXPOSE 5000

CMD ["node", "dist/app.js"]
