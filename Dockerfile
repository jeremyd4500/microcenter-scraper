FROM node:lts

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn --ignore-scripts

COPY . .

CMD [ "yarn", "start" ]