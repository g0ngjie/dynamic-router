#!/bin/sh

echo '-- 清理docker镜像&容器'
docker stop dynamic_router_view dynamic_router dynamic_router_mysql
docker rm dynamic_router_view dynamic_router dynamic_router_mysql
docker rmi dynamic_router_view_image dynamic_router_image mysql57_image

echo '-- 进入page'
cd page

echo '-- npm install --registry=https://registry.npm.taobao.org'
npm install --registry=https://registry.npm.taobao.org

echo '-- 编译page'
npm run build
cd ..

echo '-- 部署mysql'
docker build -t mysql57_image -f Dockerfile.mysql .

echo '-- 启动mysql'
docker run --name dynamic_router_mysql -p 3366:3306 -d --restart=always mysql57_image

echo '-- 部署nginx服务'
docker build -t dynamic_router_view_image -f Dockerfile.nginx .

echo '-- 生成go服务配置文件'
export ROUTER_MODE=release
export ROUTER_PORT=8082
export ROUTER_DB_USER=root
export ROUTER_DB_PWD=123456
export ROUTER_HOST=mysql:3306
export ROUTER_DB_NAME=dynamic_router

/bin/sh service/script/generateConfig.sh
# RUN cat conf/app.ini

echo '-- 部署go服务'
docker build -t dynamic_router_image .

# 等待表数据同步完
# sleep 10

echo '-- 启动go服务'
docker run --name dynamic_router --link=dynamic_router_mysql:mysql -d --restart=always dynamic_router_image

echo '-- 启动nginx服务'
docker run --name dynamic_router_view --link=dynamic_router:router_service -p 9000:80 -d --restart=always dynamic_router_view_image
