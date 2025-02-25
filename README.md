# 🚀 #15 - Docker with Redis

This guide explains how to set up **Redis** with **Node.js** using Docker and `docker-compose`.

---

## 🛠️ 1 - Add Redis to `docker-compose.yml`

Modify `docker-compose.yml` to include Redis:

```yaml
version: '3.8'

services:
  node-app:
    container_name: node-app-container
    build: .
    ports:
      - "4000:4000"
    env_file:
      - ./.env
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo
    restart: always
    volumes:
      - mongo-db:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: example
      ME_CONFIG_MONGODB_URL: mongodb://root:example@mongo:27017/
      ME_CONFIG_BASICAUTH: false
    depends_on:
      - mongo

  redis:
    image: redis

volumes:
  mongo-db:
```

> **Explanation:**  
> - `redis:` → Adds Redis as a service.  
> - `depends_on:` → Ensures `node-app` starts **after** `mongo` and `redis` are ready.

---

## 🛠️ 2 - Install Redis Client in Node.js

Run the following command to install the Redis package:

```sh
npm i redis
```

---

## 🛠️ 3 - Connect to Redis in Node.js

Add the following Redis connection logic in your Node.js application:

```javascript
const redis = require('redis');

const REDIS_HOST = 'redis';
const REDIS_PORT = '6379';

const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});

redisClient.on('connect', () => {
    console.log('Connected to Redis...');
});

redisClient.on('error', (error) => {
    console.log(error);
});

redisClient.connect();
```

> **Explanation:**  
> - `redis.createClient({ url: \`redis://${REDIS_HOST}:${REDIS_PORT}\` })` → Establishes a connection to Redis.  
> - `redisClient.on('connect', ...)` → Logs a message when successfully connected.  
> - `redisClient.on('error', ...)` → Catches and logs any connection errors.

---

## 🔢 Commands

### 1️⃣ Install Redis Client

```sh
npm i redis
```

### 2️⃣ Start Containers with Redis

```sh
docker-compose up -d
```

### 3️⃣ Stop and Remove Containers

```sh
docker-compose down
```

---

By integrating **Redis** into your Dockerized application, you can efficiently store and retrieve data with high performance! 🚀
