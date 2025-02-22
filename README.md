# 🚀 #07 - Docker Hot Reload

This guide explains how to enable **hot reloading** for a Dockerized Node.js application, allowing real-time updates without rebuilding the container.

---

## 🛠️ Setting Up Hot Reload

### 1️⃣ Build the Docker Image

Before enabling hot reload, ensure the Docker image is built:

```sh
docker build -t tresmerg-docker-node-app .
```

### 2️⃣ Run the Container with Volume Mounting

To enable hot reload, map the local project directory to the container:

```sh
docker run --name tresmerg-docker-node-app-container -v project_path:/app -d -p 4000:4000 tresmerg-docker-node-app
```

> **Explanation:**  
> - `--name tresmerg-docker-node-app-container` → Assigns a custom name to the container.  
> - `-v project_path:/app` → Maps the local **project_path** (copy relative path from Explorer) to `/app` inside the container. This ensures real-time updates.  
> - `-d` → Runs the container in **detached mode**.  
> - `-p 4000:4000` → Maps **port 4000 of the host** to **port 4000 inside the container**.  
> - `tresmerg-docker-node-app` → Runs the container using this image.

### 3️⃣ View Container Logs

To monitor logs and verify that hot reload is working:

```sh
docker logs tresmerg-docker-node-app
```

> **Explanation:**  
> - `docker logs` → Fetches the logs of a running container.  
> - `tresmerg-docker-node-app` → The container name to check logs for.

---

With these steps, any changes made to your local project files will reflect inside the running Docker container in real-time! 🚀
