#!/bin/sh

echo '-- 清理docker镜像&容器'
docker stop mysql57 && docker rm mysql57
docker stop dynamic_router_view && docker rm dynamic_router_view
docker stop dynamic_router && docker rm dynamic_router
docker rmi dynamic_router_image
docker rmi dynamic_router_view_image
docker rmi mysql57_image

echo '-- 进入page'
cd page

echo '-- npm install'
npm install --registry=https://registry.npm.taobao.org

echo '-- 编译page'
npm run build
cd ..

echo '-- 部署mysql'
docker build -t mysql57_image -f Dockerfile_mysql .

echo '-- 启动mysql'
docker run --name mysql57 -p 3306:3306 -d --restart=always mysql57_image

echo '-- 部署nginx服务'
docker build -t dynamic_router_view_image -f Dockerfile_nginx .

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
docker run --name dynamic_router --link=mysql57:mysql -p 8082:8082 -d --restart=always dynamic_router_image

echo '-- 启动nginx服务'
docker run --name dynamic_router_view --link=dynamic_router:router_service -p 8080:80 -d dynamic_router_view_image