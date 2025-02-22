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
