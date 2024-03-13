# TradingDuck 🦆🃏🔥

TradingDuck is a vibrant platform for Pokémon card collectors! 🌟 It's a hub where collectors can easily send trade requests to fellow enthusiasts, keep track of upcoming Pokémon-related events, and even locate nearby retailers selling Pokémon cards. 🎉

### 📦 Installation

#### Requirements
- docker 🐳
- docker-compose 🐋
- node.js 🟢
- yarn 🧶

### 🚀 Setup

1. 📝 Copy the `.env.dist` file to `.env`.
2. 📝 Copy the `frontend/.env.dist` file to `frontend/.env`.
3. 🖋️ Fill in the details in the `.env` files.
4. 🔧 Run `yarn install` to get everything set up.
5. 🔨 Execute `yarn setup` for the magic to unfold.
6. 🏗️ Build it with `yarn build`.
7. 🌐 Start the engine using `yarn start`.

### 🛠️ Development

1. 📝 Same as setup: Copy `.env.dist` to `.env` and `frontend/.env.dist` to `frontend/.env`.
2. 🖋️ Fill in the .env files with your awesomeness.
3. 🔧 Run `yarn install` to prep the development playground.
4. 🔨 Execute `yarn setup` to set up the development environment.
5. 🚀 Launch into development mode with `yarn dev`.

### 🔄 Resetting the Database

- To reset the database, summon the magic words: `yarn prisma:dbReset` 🧙‍♂️

### 🛡️ API

#### 🛂 Authentication

- You can impersonate any user by setting the Authorization token to a user id. This token goes in the Authorization header of your request. Live your Pokémon dreams! 🌈

#### 📘 Swagger

- Find the Swagger documentation at [http://localhost:3000/api-docs](http://localhost:3000/api-docs). Explore the Pokémon world! 🌍

### 🔄 Crontab for Prod

- Here's a nifty snippet for refreshing Let's Encrypt certs on production:

```bash
0 0 * * 0 expr `date +\%W` \% 2 > /dev/null || docker compose -f <absolute path to folder>/docker-compose-le.yaml up && docker exec -it nginx-service nginx -s reload
```

- Crontab for backups:

runs the backup script every day at 4am 

```bash
0 4 * * * /root/tradingduck-main/backup.sh
```

Feel the power of TradingDuck! 🌟 It's not just about cards; it's about embracing the Pokémon spirit. Get ready to trade, collect, and have a quacking good time! 🃏✨
