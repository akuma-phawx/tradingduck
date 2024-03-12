FROM node:18-alpine as builder
WORKDIR /src/server
COPY . .
RUN yarn
RUN yarn build

FROM nginx:1.21.1-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY /config/staging/.htpasswd /etc/nginx
COPY /config/staging/nginx.conf /etc/nginx/conf.d
COPY --from=builder /src/server/frontend/dist /usr/share/nginx/html
