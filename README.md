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
