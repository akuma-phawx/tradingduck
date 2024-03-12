dev:
    yarn dev

dev-docker:
    docker compose -f docker-compose.yaml up -d

log-server:
    docker logs -f tradingduck-server-1

log-nginx:
    docker logs -f nginx-service

staging:
    docker compose -f docker-compose-staging.yaml up -d

staging-build-server:
    docker compose -f docker-compose-staging.yaml up -d --build server

staging-build-nginx:
    docker compose -f docker-compose-staging.yaml up -d --build nginx

staging-down:
    docker compose -f docker-compose-staging.yaml down

prod:
    docker compose -f docker-compose-prod.yaml up -d

prod-build-server:
    docker compose -f docker-compose-prod.yaml up -d --build server

prod-build-nginx:
    docker compose -f docker-compose-prod.yaml up -d --build nginx

prod-down:
    docker compose -f docker-compose-prod.yaml down

le:
    docker compose -f docker-compose-le.yaml up -d

le-down:
    docker compose -f docker-compose-le.yaml down

le-full:
    docker compose --profile full -f docker-compose-le.yaml up -d

le-full-down:
    docker compose --profile full -f docker-compose-le.yaml down

migration:
    docker exec -it server-service yarn prisma:migrate

seed:
    docker exec -it server-service yarn prisma:seed
