
# 🚀 #16 - Docker with Nginx

This guide explains how to set up **Nginx** as a reverse proxy for a **Node.js** application using Docker.

---

## 🛠️ 1 - Create `nginx` Folder in Project Root

Create a folder named **`nginx`** in your project root.

---

## 🛠️ 2 - Create `default.conf`

Inside the `nginx` folder, create a file named **`default.conf`**.

---

## 🛠️ 3 - Write Nginx Configuration

Paste the following configuration inside `default.conf`:

```nginx
server {
    listen        80;

    location / {
        proxy_set_header  Host             $host;
        proxy_set_header  X-Real-IP        $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header  X-NginX-Proxy    true;

        proxy_pass         http://node-app:4000;
        proxy_redirect     off;
    }
}
```

> **Explanation:**  
> - `listen 80;` → Listens on port 80 inside the container.  
> - `proxy_pass http://node-app:4000;` → Routes requests to the Node.js app.  
> - `proxy_set_header` → Sets HTTP headers for proxy forwarding.  

🔗 **Reference:** [Nginx Docs](https://nginx.org/en/docs/example.html)

---

## 🛠️ 4 - Update `docker-compose.yml`

Modify `docker-compose.yml` to include the **Nginx** service along with MongoDB, Redis, and Mongo-Express:

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

  nginx:
    image: nginx
    ports:
      - "8080:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - node-app
    # environment:
      # - NGINX_HOST=foobar.com
      # - NGINX_PORT=80

volumes:
  mongo-db:
```

> **Explanation:**  
> - `image: nginx` → Uses the official Nginx image.  
> - `ports: "8080:80"` → Exposes Nginx on **port 8080** and forwards requests to **port 80** inside the container.  
> - `volumes: ./nginx/default.conf:/etc/nginx/conf.d/default.conf` → Mounts the custom **Nginx configuration**.  
> - `depends_on: node-app` → Ensures **Node.js** starts before Nginx.

---

## 🔢 5 - Test Nginx Proxy

### 1️⃣ Start Containers

```sh
tresmerg-docker % docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build
```

### 2️⃣ Test Node.js App via Nginx

Open your browser and visit:

```
http://localhost:8080
```

If everything is set up correctly, it should display your **Node.js app content** via **Nginx**!

---

By integrating **Nginx** with **Docker**, you can efficiently manage traffic and create a **scalable reverse proxy** for your applications! 🚀
