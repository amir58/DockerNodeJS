# 🚀 #14 - Docker with Mongo-Express

This guide explains how to set up **MongoDB** with **Mongo-Express** in Docker, ensuring data persistence using **volumes**.

---

## 🛠️ Persist MongoDB Data with Volumes

Modify `docker-compose.yml` to ensure MongoDB data persists even after stopping the container:

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

  mongo:
    image: mongo
    restart: always
    volumes:
      - mongo-db:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example

volumes:
  mongo-db:
```

> **Explanation:**  
> - `volumes:` → Creates a named volume `mongo-db` to store MongoDB data persistently.  
> - `- mongo-db:/data/db` → Maps the volume to MongoDB’s database storage directory.

---

## 🛠️ Add Mongo-Express to View Database on Browser

Modify `docker-compose.yml` to include **Mongo-Express** for easy database management:

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

volumes:
  mongo-db:
```

> **Explanation:**  
> - `mongo-express:` → Adds a UI-based database management tool.  
> - `ports: 8081:8081` → Exposes Mongo-Express on **http://localhost:8081**.  
> - `ME_CONFIG_MONGODB_URL: mongodb://root:example@mongo:27017/` → Connects Mongo-Express to MongoDB.  

---

## 🔢 Commands

### 1️⃣ List Docker Volumes

```sh
docker volume ls
```

### 2️⃣ Remove Unused Volumes

```sh
docker volume prune
```

### 3️⃣ Remove Containers & Volumes

```sh
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down -v
```

> **Explanation:**  
> - `-v` → Removes associated volumes when stopping containers.

---

By using **Mongo-Express**, you can easily manage your MongoDB data via a web interface while ensuring **data persistence** with Docker volumes! 🚀
