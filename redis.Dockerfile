FROM redis:alpine
WORKDIR /redis
COPY /config/prod/redis.conf /usr/local/etc/redis/redis.conf
COPY /config/scripts/redis/init.sh ./
RUN chmod +x init.sh
