# 🚀 #09 - Docker Compose

This guide explains how to use **Docker Compose** to manage multi-container applications efficiently.

---

## 🛠️ Docker Compose Configuration

Create a `docker-compose.yml` file with the following configuration:

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
