📦 Setup Node.js Application with Docker
This branch focuses on setting up a Node.js application inside a Docker container. The guide below explains the steps to build, run, and manage the application using Docker.

🚀 Getting Started
Prerequisites
Ensure you have the following installed on your system:

Docker
Node.js
Git
🛠️ Project Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone -b #03-Setup-NodeJS-Application https://github.com/amir58/Docker.git
cd Docker
2️⃣ Build the Docker Image
sh
Copy
Edit
docker build -t express-node-app .
Explanation:

docker build → Creates a Docker image from the Dockerfile.
-t express-node-app → Assigns the name express-node-app to the image.
. → Specifies that the Dockerfile is in the current directory.
3️⃣ List Available Docker Images
sh
Copy
Edit
docker image ls
Explanation:

docker image ls → Lists all locally available Docker images.
It shows the repository name, image ID, creation date, and size.
4️⃣ Run the Docker Image as a Container
sh
Copy
Edit
docker run tresmerg-docker-node-app
Explanation:

docker run → Creates and runs a new container from the image.
tresmerg-docker-node-app → Uses the image named tresmerg-docker-node-app.
If the image doesn’t exist locally, Docker will try to pull it from Docker Hub.
5️⃣ Run a Container with a Custom Name
sh
Copy
Edit
docker run --name tresmerg-docker-node-app-container tresmerg-docker-node-app
Explanation:

--name tresmerg-docker-node-app-container → Assigns a custom name to the running container.
tresmerg-docker-node-app → Runs the container from the specified image.
6️⃣ Run the Container in Detached Mode
sh
Copy
Edit
docker run --name tresmerg-docker-node-app-container -d tresmerg-docker-node-app
Explanation:

-d → Runs the container in detached mode (background).
This allows the container to run without locking the terminal.
You can still access it later using docker logs or docker exec.
7️⃣ Check Running Containers
sh
Copy
Edit
docker ps
Explanation:

Lists all active/running containers along with their ID, name, port bindings, and status.
To see all containers (including stopped ones), use:
sh
Copy
Edit
docker ps -a
8️⃣ Stop a Running Container
sh
Copy
Edit
docker stop tresmerg-docker-node-app-container
Explanation:

docker stop → Gracefully stops the running container.
tresmerg-docker-node-app-container → Specifies which container to stop.
9️⃣ Remove a Container (Force Delete)
sh
Copy
Edit
docker rm tresmerg-docker-node-app-container -f
Explanation:

docker rm → Removes a container.
-f (force) → Ensures the container is removed even if it’s running.
If the container is stopped, you can remove it without -f.
🔟 Run a Container with Port Mapping
sh
Copy
Edit
docker run --name tresmerg-docker-node-app-container -d -p 4000:4000 tresmerg-docker-node-app
Explanation:

--name tresmerg-docker-node-app-container → Assigns a custom name to the container.
-d → Runs the container in detached mode.
-p 4000:4000 → Maps port 4000 of the host to port 4000 inside the container.
This allows the application inside the container to be accessed at:
arduino
Copy
Edit
http://localhost:4000
📂 Project Structure
bash
Copy
Edit
Docker/
│── src/
│   ├── index.js          # Main Node.js application file
│   ├── package.json      # Dependencies and scripts
│── Dockerfile            # Docker configuration
│── .dockerignore         # Files to ignore in the image
📜 Dockerfile Explanation
dockerfile
Copy
Edit
# Use an official Node.js runtime as base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["node", "src/index.js"]
🛠️ Useful Docker Commands Summary
Command	Description
docker build -t express-node-app .	Build Docker image from Dockerfile
docker image ls	List available Docker images
docker run tresmerg-docker-node-app	Run container from the image
docker run --name tresmerg-docker-node-app-container tresmerg-docker-node-app	Run container with a specific name
docker run --name tresmerg-docker-node-app-container -d tresmerg-docker-node-app	Run container in background mode
docker ps	List active containers
docker stop tresmerg-docker-node-app-container	Stop a running container
docker rm tresmerg-docker-node-app-container -f	Remove a container forcefully
docker run --name tresmerg-docker-node-app-container -d -p 4000:4000 tresmerg-docker-node-app	Run container with port mapping
🏗️ Future Enhancements
Implement docker-compose for multi-container setup
Optimize Dockerfile for production readiness
Add CI/CD pipeline for automated deployments
📝 Contributing
Feel free to fork the repository, create a new branch, and submit a pull request. Contributions are welcome!

📄 License
This project is licensed under the MIT License.

🤝 Connect
For any questions or discussions, feel free to open an issue or reach out! 🚀

Would you like any modifications or additional explanations? 😊







