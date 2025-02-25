# 🚀 #17 - Docker with PostgreSQL

This guide explains how to set up **PostgreSQL** and **Adminer** with **Node.js** using Docker and `docker-compose`.

---

## 🛠️ 1 - Add PostgreSQL & Adminer to `docker-compose.yml`

Modify `docker-compose.yml` to include PostgreSQL and Adminer:

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
      - postgres

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

  nginx:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - node-app

  postgres:
    image: postgres
    restart: always
    shm_size: 128mb
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: example
    volumes:
      - postgres-db:/var/lib/postgresql/data

  adminer:
    image: adminer
    restart: always
    ports:
      - "8080:8080"

volumes:
  mongo-db:
  postgres-db:
```

> **Explanation:**  
> - `postgres:` → Adds **PostgreSQL** as a service.  
> - `adminer:` → Adds **Adminer**, a UI tool to manage PostgreSQL databases.  
> - `shm_size: 128mb` → Increases shared memory for PostgreSQL.  
> - `depends_on:` → Ensures services start in the correct order.

---

## 🛠️ 2 - Install PostgreSQL Client for Node.js

Run the following command to install the PostgreSQL package:

```sh
npm i pg
```

🔗 **Reference:** [node-postgres](https://node-postgres.com/)

---

## 🛠️ 3 - Connect to PostgreSQL in Node.js

Add the following PostgreSQL connection logic in your Node.js application:

```javascript
const pg = require('pg');

const PG_USER = 'root';
const PG_PASSWORD = 'example';
const PG_PORT = 5432;
const PG_HOST = 'postgres';

const PG_URI = `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}`;

const client = new pg.Client(PG_URI);

client.connect(() => {
    console.log('Connected to PostgreSQL');
});

client.on('error', (error) => {
    console.log(`PostgreSQL error: ${error}`);
});
```

> **Explanation:**  
> - `pg.Client(PG_URI)` → Creates a connection to PostgreSQL.  
> - `client.connect()` → Establishes the connection.  
> - `client.on('error', ...)` → Handles database errors.

---

## 🔢 Commands

### 1️⃣ Start Containers with Build Option

```sh
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build
```

### 2️⃣ Check Logs for Connection Status

```sh
docker logs node-app-container
```

You should see an output similar to:

```plaintext
Server running on port 4000
Conntect to Redis...
Connected to PostgreSQL
Connected to MongoDB
```

---

By integrating **PostgreSQL** into your Dockerized application, you can efficiently manage relational databases with **Adminer for UI-based management**! 🚀
