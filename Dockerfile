FROM node:alpine

RUN mkdir /app
WORKDIR /app

RUN npm install --global http-server

COPY . .
EXPOSE 80

CMD http-server /app/ -p 80 -c-1