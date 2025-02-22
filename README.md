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

