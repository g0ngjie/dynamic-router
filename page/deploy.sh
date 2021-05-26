#!/bin/sh
# auth: Gj
# docker automated scripts
# 2020-07-31

TIME=$(date "+%m-%d %H:%M:%S")

# vue build
vue_build() {
    npm run build
    find . -type f -exec chmod 777 {} + 
    find . -type d -exec chmod 777 {} + 
}

# docker start
docker_start() {
    vue_build && \
    docker-compose build &&\
    docker-compose up -d
}

# docker redeployment
docker_redeployment() {
    docker_kill \
    && docker_start
}

# kill containers and mirrors
docker_kill() {
    docker-compose down \
    && docker rmi -f "dynamic_router_page" \
    && docker rmi -f "dynamic_router_service"
}

case $1 in
    'start')
    docker_start
    echo -e "\n ---> $TIME [start] docker-compose script ran successfully\n"
    ;;
    'restart')
    docker_redeployment
    echo -e "\n ---> $TIME [restart] docker-compose script ran successfully\n"
    ;;
    'kill')
    docker_kill
    echo -e "\n ---> $TIME [kill] containers and mirrors killed successfully\n"
    ;;
    *)
    docker_start
    ;;
esac
