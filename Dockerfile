FROM node:18-alpine
WORKDIR /src/server
COPY . .
RUN yarn
RUN yarn build

CMD yarn run start
