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
