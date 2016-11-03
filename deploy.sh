DOCKER_HUB=ec2-52-17-9-213.eu-west-1.compute.amazonaws.com:5000

docker-compose rm
docker-compose build --no-cache

docker tag -f optionariumfrontend_frontend $DOCKER_HUB/optionarium_traderoom-ui
docker push $DOCKER_HUB/optionarium_traderoom-ui
