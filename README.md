# 🔗 API Gateway - KrakenD

This is a test repository utilizing KrakenD, a high-performance, open-source API Gateway designed to simplify the integration, orchestration, and delivery of APIs in microservices architectures.

Below, you will find an illustrative image demonstrating how KrakenD works.

![KrakenD Docker compose](assets/krakend.png)

Learn more: https://www.krakend.io/

## Running the application

To start the application, simply bring up the container using Docker Compose. Follow the steps below:

1. **Make sure you have Docker and Docker Compose installed on your machine..**
2. **Run the command below to start the container in the background:**
-   ```bash
    cd ./server
    docker compose up -d
    ```
3. **Run the command below to enter the container:**
-   ```bash 
    docker compose exec <container> bash
    ```
4. **Run the command below to stop all containers:**
-   ```bash 
    docker compose down
    ```