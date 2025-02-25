# 📦 Setup Node.js Application with Docker

This branch focuses on setting up a **Node.js application** inside a **Docker container**. The guide below explains the steps to build, run, and manage the application using Docker.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

---

## 🛠️ Project Setup

### 1️⃣ Clone the Repository

```sh
git clone -b #04-Dockerfile https://github.com/amir58/DockerNodeJS.git
cd DockerNodeJS
```

### 2️⃣ Build the Docker Image

```sh
docker build -t tresmerg-docker-node-app .
```
> **Explanation**:  
> - `docker build` → Creates a Docker image from the `Dockerfile`.  
> - `-t tresmerg-docker-node-app` → Assigns the name **tresmerg-docker-node-app** to the image.  
> - `.` → Specifies that the `Dockerfile` is in the current directory.

### 3️⃣ List Available Docker Images

```sh
docker image ls
```
> **Explanation**:  
> - `docker image ls` → Lists all locally available Docker images.  
> - It shows the **repository name, image ID, creation date, and size**.

### 4️⃣ Run the Docker Image as a Container

```sh
docker run tresmerg-docker-node-app
```
> **Explanation**:  
> - `docker run` → Creates and runs a new container from the image.  
> - `tresmerg-docker-node-app` → Uses the image named **tresmerg-docker-node-app**.  
> - If the image doesn’t exist locally, Docker will try to **pull it from Docker Hub**.

### 5️⃣ Run a Container with a Custom Name

```sh
docker run --name tresmerg-docker-node-app-container tresmerg-docker-node-app
```
> **Explanation**:  
> - `--name tresmerg-docker-node-app-container` → Assigns a custom name to the running container.  
> - `tresmerg-docker-node-app` → Runs the container from the specified image.

### 6️⃣ Run the Container in Detached Mode

```sh
docker run --name tresmerg-docker-node-app-container -d tresmerg-docker-node-app
```
> **Explanation**:  
> - `-d` → Runs the container in **detached mode** (background).  
> - This allows the container to run without locking the terminal.  
> - You can still access it later using `docker logs` or `docker exec`.

### 7️⃣ Check Running Containers

```sh
docker ps
```
> **Explanation**:  
> - Lists all **active/running** containers along with their **ID, name, port bindings, and status**.  
> - To see **all** containers (including stopped ones), use:  
>   ```sh
>   docker ps -a
>   ```

### 8️⃣ Stop a Running Container

```sh
docker stop tresmerg-docker-node-app-container
```
> **Explanation**:  
> - `docker stop` → Gracefully **stops** the running container.  
> - `tresmerg-docker-node-app-container` → Specifies which container to stop.

### 9️⃣ Remove a Container (Force Delete)

```sh
docker rm tresmerg-docker-node-app-container -f
```
> **Explanation**:  
> - `docker rm` → Removes a container.  
> - `-f` (force) → Ensures the container is removed even if it’s running.  
> - If the container is **stopped**, you can remove it without `-f`.  

### 🔢 Run a Container with Port Mapping

```sh
docker run --name tresmerg-docker-node-app-container -d -p 4000:4000 tresmerg-docker-node-app
```
> **Explanation**:  
> - `--name tresmerg-docker-node-app-container` → Assigns a custom name to the container.  
> - `-d` → Runs the container in **detached mode**.  
> - `-p 4000:4000` → Maps **port 4000 of the host** to **port 4000 inside the container**.  
> - This allows the application inside the container to be accessed at:  
>   ```
>   http://localhost:4000
>   ```

# 🛠️ Useful Docker Exec Commands

This file contains important **Docker exec commands** to interact with a running container.

---

## 🔢 Adding `.dockerignore` to the Project

Before running the following commands, it is recommended to create a `.dockerignore` file in your project to exclude unnecessary files from the Docker image. This improves build performance and reduces image size.

### Example `.dockerignore` file:
```plaintext
/node_modules
Dockerfile
.env
README.md
.DS_Store
.git
```

---

## 🔢 Docker Exec Commands

### 1️⃣ Access the Container's Bash Shell

```sh
docker exec -it tresmerg-docker-node-app-container bash
```
> **Explanation**:  
> - `docker exec` → Runs a command inside an existing running container.  
> - `-it` → Runs in interactive mode with a terminal session.  
> - `tresmerg-docker-node-app-container` → The name of the running container.  
> - `bash` → Opens a Bash shell inside the container.

### 2️⃣ Exit the Container's Bash Shell

```sh
exit
```
> **Explanation**:  
> - `exit` → Exits the container's terminal and returns to the host system.

---

These commands help in debugging, inspecting, and interacting with the running container seamlessly. 🚀

# 🚀 #07 - Docker Hot Reload

This guide explains how to enable **hot reloading** for a Dockerized Node.js application, allowing real-time updates without rebuilding the container.

---

## 🛠️ Setting Up Hot Reload

### 1️⃣ Edit the Dockerfile

Modify the `CMD` instruction in the `Dockerfile` to enable hot reload:

```dockerfile
CMD [ "npm", "run", "start-dev" ]
```

This ensures that the application runs in development mode with hot reload enabled.

### 2️⃣ Build the Docker Image

Before enabling hot reload, ensure the Docker image is built:

```sh
docker build -t tresmerg-docker-node-app .
```

### 3️⃣ Run the Container with Volume Mounting

To enable hot reload, map the local project directory to the container:

```sh
docker run --name tresmerg-docker-node-app-container -v /Users/username/backend/tresmerg-docker:/app -d -p 4000:4000 tresmerg-docker-node-app
```

> **Explanation:**  
> - `--name tresmerg-docker-node-app-container` → Assigns a custom name to the container.  
> - `-v /Users/username/backend/tresmerg-docker:/app` → Maps the local **absolute project path** to `/app` inside the container. This ensures real-time updates.  
> - `-d` → Runs the container in **detached mode**.  
> - `-p 4000:4000` → Maps **port 4000 of the host** to **port 4000 inside the container**.  
> - `tresmerg-docker-node-app` → Runs the container using this image.

### 4️⃣ View Container Logs

To monitor logs and verify that hot reload is working:

```sh
docker logs tresmerg-docker-node-app
```

> **Explanation:**  
> - `docker logs` → Fetches the logs of a running container.  
> - `tresmerg-docker-node-app` → The container name to check logs for.

### 5️⃣ Open Container Terminal and View File Contents

To access the container's terminal and inspect files inside:

```sh
docker exec -it tresmerg-docker-node-app-container bash
```

Once inside the container, use:

```sh
cat index.js
```

> **Explanation:**  
> - `docker exec -it tresmerg-docker-node-app-container bash` → Opens an interactive terminal session inside the container.  
> - `cat index.js` → Displays the contents of `index.js` inside the container.

---

With these steps, any changes made to your local project files will reflect inside the running Docker container in real-time! 🚀

# 🚀 #08 - Docker Volumes

This guide explains how to use **Docker volumes** to manage file system bindings inside a Docker container, ensuring efficiency and security in development.

---

## 🛠️ One-Way Binding (Read-Only)

One-way binding allows you to mount a local directory inside the container in **read-only** mode (`:ro`).

### 1️⃣ Run a Container with Read-Only Volume (Absolute Path)

```sh
docker run --name tresmerg-docker-node-app-container -v /Users/username/backend/tresmerg-docker:/app:ro -d -p 4000:4000 tresmerg-docker-node-app
```

> **Explanation:**  
> - `-v /Users/username/backend/tresmerg-docker:/app:ro` → Mounts the local folder **read-only** inside the container.  
> - `:ro` → Ensures the container **cannot modify** files in the host directory.  

### 2️⃣ Run a Container with Read-Only Volume (Dynamic Path)

For macOS & Linux:

```sh
docker run --name tresmerg-docker-node-app-container -v $(pwd):/app:ro -d -p 4000:4000 tresmerg-docker-node-app
```

For Windows (Command Prompt):

```sh
docker run --name tresmerg-docker-node-app-container -v %cd%:/app:ro -d -p 4000:4000 tresmerg-docker-node-app
```

> **Explanation:**  
> - `$(pwd)` (Mac/Linux) or `%cd%` (Windows) → Dynamically binds the **current directory** to `/app` inside the container.  
> - `:ro` → Ensures **read-only** access for the container.

---

## 🔑 Anonymous Volume (Securing `node_modules`)

To prevent overwriting `node_modules` inside the container while still mounting the project folder:

```sh
docker run --name tresmerg-docker-node-app-container -v $(pwd):/app:ro -v /app/node_modules -d -p 4000:4000 tresmerg-docker-node-app
```

> **Explanation:**  
> - `-v /app/node_modules` → Creates an **anonymous volume** inside the container, preventing conflicts with the host `node_modules` folder.  

---

## 🛠️ Simple Solution: Bind Only `src` Folder

### 1️⃣ Create a `src` Folder

Before running the command, ensure you:
- Create a new folder named **`src`** in your project directory.
- Move `index.js` into the `src` folder.
- Edit `package.json` scripts to reference `src/index.js` instead of `index.js`.

### 2️⃣ Run the Container Binding Only `src` Folder

```sh
docker run --name tresmerg-docker-node-app-container -v $(pwd)/src:/app/src:ro -d -p 4000:4000 tresmerg-docker-node-app
```

> **Explanation:**  
> - `-v $(pwd)/src:/app/src:ro` → Mounts **only** the `src` folder in **read-only** mode.  
> - This reduces unnecessary file sharing and improves performance.  

---

By using Docker volumes efficiently, you can maintain **security, performance, and flexibility** in your development workflow! 🚀

# 🚀 #09 - Docker Compose

This guide explains how to use **Docker Compose** to manage multi-container applications efficiently.

---

## 🛠️ Docker Compose Configuration

Create a `docker-compose.yml` file with the following configuration:

```yaml
services:
  node-app:
    container_name: node-app-container
    build: .
    volumes:
      - ./src:/app/src:ro
    ports:
      - "4000:4000"
```

> **Explanation:**  
> - `services:` → Defines the services that will run in the container.  
> - `node-app:` → The name of the service.  
> - `container_name: node-app-container` → Assigns a custom name to the container.  
> - `build: .` → Builds the Docker image using the `Dockerfile` in the current directory.  
> - `volumes:` → Mounts the local `src` directory to `/app/src` inside the container in **read-only mode (`:ro`)**.  
> - `ports:` → Maps **port 4000 of the host** to **port 4000 inside the container**.

---

## 🔢 Docker Compose Commands

### 1️⃣ Start Services

```sh
docker-compose up
```

> **Explanation:**  
> - Builds the image (if not already built) and starts the services defined in `docker-compose.yml`.

### 2️⃣ Stop and Remove Services

```sh
docker-compose down
```

> **Explanation:**  
> - Stops and removes all containers created by `docker-compose up`.

---

With **Docker Compose**, you can easily manage your containerized application and streamline development workflows! 🚀


# 🚀 #10 - Environment Variables

This guide explains how to use **environment variables** in Docker to configure and manage applications efficiently.

---

## 🛠️ Adding an `.env` File

Create a `.env` file in the project directory and add the following environment variables:

```env
PORT=4000
NODE_ENV=production
DB_HOST=12345
```

> **Explanation:**  
> - `PORT=4000` → Defines the port the application will run on.  
> - `NODE_ENV=production` → Sets the application environment to **production**.  
> - `DB_HOST=12345` → Example database host value.

---

## 🛠️ Updating `docker-compose.yml`

Modify the `docker-compose.yml` file to include environment variables from the `.env` file.

```yaml
version: '3.8'

services:
  node-app:
    container_name: node-app-container
    build: .
    volumes:
      - ./src:/app/src:ro
    ports:
      - "4000:4000"
    env_file:
      - ./.env
    # environment:
    #   - PORT=4000
    #   - NODE_ENV=production
```

> **Explanation:**  
> - `env_file:` → Loads environment variables from the `.env` file into the container.  
> - The commented-out `environment:` section shows how variables can also be defined directly within `docker-compose.yml`.

---

## 🔢 Commands

### 1️⃣ Start Services in Detached Mode

```sh
docker-compose up -d
```

> **Explanation:**  
> - Starts the services in **detached mode** (background execution).

### 2️⃣ Access the Running Container

```sh
docker exec -it node-app-container bash
```

> **Explanation:**  
> - Opens an **interactive terminal** inside the running container.

### 3️⃣ Print Environment Variables

```sh
printenv
```

> **Explanation:**  
> - Displays the **environment variables** available inside the container.

---

By using environment variables, you can **easily configure** your application without modifying the Docker image! 🚀

# 🚀 #11 - Docker Environments

This guide explains how to manage **multiple environments** (Development & Production) using Docker Compose.

---

## 🛠️ Base `docker-compose.yml`

Create a base `docker-compose.yml` file with shared configurations:

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
```

---

## 🛠️ Development `docker-compose.dev.yaml`

Create `docker-compose.dev.yaml` for development-specific configurations:

```yaml
version: '3.8'

services:
  node-app:
    build: .
    volumes:
      - ./src:/app/src:ro
    environment:
      - NODE_ENV=dev
```

---

## 🛠️ Production `docker-compose.production.yaml`

Create `docker-compose.production.yaml` for production-specific configurations:

```yaml
version: '3.8'

services:
  node-app:
    build: .
    environment:
      - NODE_ENV=production
```

---

## 🔗 Update `.dockerignore`

To prevent unnecessary files from being copied into the image, update your `.dockerignore` file to include:

```plaintext
docker-compose*
```

This ensures that any **docker-compose override files** (like `.dev.yaml`, `.production.yaml`) are ignored during the build process.

---

## 🔢 Commands

### 1️⃣ Run Development Environment

```sh
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
```

To stop the development environment:

```sh
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down
```

### 2️⃣ Run Production Environment

```sh
docker-compose -f docker-compose.yaml -f docker-compose.production.yaml up -d
```

To stop the production environment:

```sh
docker-compose -f docker-compose.yaml -f docker-compose.production.yaml down
```

---

By using separate Docker Compose files for different environments, you can efficiently manage **development and production setups** with minimal effort! 🚀

# 🚀 #12 - Multi-Stage Dockerfile

This guide explains how to optimize Docker builds using a **multi-stage Dockerfile** to create separate configurations for **development** and **production** environments.

---

## 🛠️ 1 - Update `Dockerfile`

Replace the existing `Dockerfile` with the following **multi-stage build**:

```dockerfile
# Base stage
FROM node:20.18.1 as base

# Development stage
FROM base as dev

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start-dev" ]

# Production stage
FROM base as production

WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]
```

> **Explanation:**  
> - The **base stage** uses `node:20.18.1`.  
> - The **dev stage** installs all dependencies and runs `start-dev`.  
> - The **production stage** installs only production dependencies for efficiency.

---

## 🛠️ 2 - Update `docker-compose.dev.yaml`

Modify `docker-compose.dev.yaml` to specify the `dev` stage in the multi-stage build:

```yaml
version: '3.8'

services:
  node-app:
    build:
      context: .
      target: dev
    volumes:
      - ./src:/app/src:ro
    environment:
      - NODE_ENV=dev
```

> **Explanation:**  
> - The `target: dev` ensures the container is built using the **dev** stage.  
> - The volume mounts `./src` into `/app/src` for live-reloading.

---

## 🛠️ 3 - Update `docker-compose.prod.yaml`

Modify `docker-compose.prod.yaml` to use the **production** build stage:

```yaml
version: '3.8'

services:
  node-app:
    build:
      context: .
      target: production
    environment:
      - NODE_ENV=production
```

> **Explanation:**  
> - The `target: production` ensures the container is optimized for **production**.

---

## 🔢 Commands

### 1️⃣ Run Development Environment

```sh
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
```

To stop the development environment:

```sh
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down
```

### 2️⃣ Run Production Environment

```sh
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d
```

To stop the production environment:

```sh
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml down
```

---

By using **multi-stage builds**, we improve efficiency by separating **development and production** dependencies while keeping the final image **lightweight and optimized**! 🚀


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
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build
```

### 3️⃣ Stop and Remove Containers

```sh
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down
```

---

By integrating **Redis** into your Dockerized application, you can efficiently store and retrieve data with high performance! 🚀

