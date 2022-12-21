FROM node:lts

RUN mkdir -p /opt/startup
COPY startup.sh /opt/startup
RUN chmod -R +x /opt/startup

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn --ignore-scripts

COPY . .

RUN yarn build

ENTRYPOINT ["/opt/startup/startup.sh"]