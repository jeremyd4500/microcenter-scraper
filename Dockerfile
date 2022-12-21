FROM --platform=amd64 node:lts

RUN mkdir -p /opt/startup
COPY startup.sh /opt/startup
RUN chmod -R +x /opt/startup

WORKDIR /usr/app
COPY . .

ENTRYPOINT ["/opt/startup/startup.sh"]