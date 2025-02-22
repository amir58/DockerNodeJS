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
