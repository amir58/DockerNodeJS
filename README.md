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
