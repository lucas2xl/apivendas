FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE ${APP_API_PORT}

CMD ["yarn", "dev"]
