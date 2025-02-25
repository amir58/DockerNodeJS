# 🚀 #13 - Docker with MongoDB & NodeJS

This guide explains how to set up **MongoDB** with **Node.js** using Docker and Mongoose.

---

## 🛠️ 1 - Add MongoDB Docker Image

Modify `docker-compose.yml` to include MongoDB:

```yaml
version: '3.8'

services:
  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
```

> **Explanation:**  
> - `image: mongo` → Uses the official MongoDB image.  
> - `restart: always` → Ensures MongoDB restarts if stopped.  
> - Environment variables set the **username** and **password**.

---

## 🛠️ 2 - Add Mongoose to Dependencies

Install Mongoose in your Node.js project:

```sh
npm i mongoose
```

---

## 🛠️ 3 - Add Mongoose Code

Modify your Node.js application to connect to MongoDB:

```javascript
const mongoose = require('mongoose');

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'localhost';

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose.connect(URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(error);
    });
```

---

## 🛠️ 4 - Inspect the Container to Get Host Value

Run the following command to inspect the **MongoDB container**:

```sh
docker inspect node-app-container
```

Locate the **IP-Address** in the output.

---

## 🛠️ 5 - Update `DB_HOST` with the IP Address

Replace the `DB_HOST` value with the **MongoDB container IP address**:

```javascript
const DB_HOST = '172.19.0.2';
```

> **Note:** The IP address may change when the container restarts.

---

## 🛠️ 6 - Better Way: Use the Container Name

A better way to connect is to use the **MongoDB container name** instead of the IP address:

```javascript
const DB_HOST = 'mongo';
```

This ensures that the Node.js application always finds MongoDB, even if the IP changes.

---

## 🔢 Commands

### 1️⃣ List Available Docker Networks

```sh
docker network ls
```

### 2️⃣ Inspect the Docker Network

```sh
docker network inspect network_name
```

### 3️⃣ Access the MongoDB Container

```sh
docker exec -it tresmerg-docker-mongo-1 bash
```

### 4️⃣ Connect to MongoDB with `mongosh`

```sh
mongosh -u root -p example
```

or directly:

```sh
docker exec -it tresmerg-docker-mongo-1 mongosh -u root -p example
```

### 5️⃣ MongoDB Commands

```sh
show dbs  # List all databases
use testDB  # Switch to test database
db.books.insertOne({"title":"Book 1"})  # Insert a document
db.books.find()  # Retrieve all documents
```

---

By using **Docker & MongoDB**, you can create a scalable and efficient environment for your Node.js applications! 🚀
