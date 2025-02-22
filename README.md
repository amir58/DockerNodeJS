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
