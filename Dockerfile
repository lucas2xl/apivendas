FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE ${PORT_API}

CMD ["yarn", "dev"]
