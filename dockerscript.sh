echo "Stopping old container if exists..."
docker stop docker_frontend
echo "Removing old container if exists..."
docker rm docker_frontend

echo "Running Dockerfile..."
docker build -t docker_frontent .
docker run -p 3000:3000 --name docker_frontend docker_frontent