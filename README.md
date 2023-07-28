Tutorial on installing docker on vm os: https://docs.docker.com/engine/install/

Tutorial for setting up typescript project with docker: https://www.youtube.com/watch?v=4q3br8jRSz4
Tutorial for deploying docker image: https://www.youtube.com/watch?v=x4MQZ5cYIYQ

TSL example: https://www.youtube.com/watch?v=WEPigv8W3dY

How to compose docker dev:

```
docker compose -f docker-compose.dev.yml up --build

```

How pull latest docker image:

```
sudo docker pull developxllc/devx-trader
```

How to run docker image on vm

```
sudo docker run -p 8080:8080 -d developxllc/devx-trader
```
